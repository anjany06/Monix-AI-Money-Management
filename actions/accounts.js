"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

const serializeTransaction = (obj) => {
  const serialized = { ...obj };

  if (obj.balance) {
    serialized.balance = obj.balance.toNumber();
  }
  if (obj.amount) {
    serialized.amount = obj.amount.toNumber();
  }

  return serialized;
};

export async function updateDefaultAccount(accountId) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorised");

    const user = await db.user.findUnique({
      where: {
        clerkUserId: userId,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }
    await db.account.updateMany({
      where: {
        userId: user.id,
        isDefault: true,
      },
      data: {
        isDefault: false,
      },
    });

    const account = await db.account.update({
      where: {
        id: accountId,
        userId: user.id,
      },
      data: {
        isDefault: true,
      },
    });

    revalidatePath("/dashboard");
    return { success: true, data: serializeTransaction(account) };
  } catch (error) {
    console.error("Error updating default account:", error);
    return { success: false, error: error.message };
  }
}
export async function getAccountWithTransactions(accountId) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorised");

  const user = await db.user.findUnique({
    where: {
      clerkUserId: userId,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const account = await db.account.findUnique({
    where: {
      id: accountId,
      userId: user.id,
    },
    include: {
      transactions: {
        orderBy: {
          date: "desc",
        },
      },
      _count: {
        select: {
          transactions: true,
        },
      },
    },
  });

  if (!account) return null;
  // console.log(account.transactions);

  return {
    ...serializeTransaction(account),
    transactions: account.transactions.map(serializeTransaction),
  };
}

export async function transferFunds(fromAccountId, toAccountId, amount, description) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) throw new Error("User not found");

    const fromAccount = await db.account.findUnique({
      where: { id: fromAccountId, userId: user.id },
    });

    if (!fromAccount) throw new Error("Source account not found");

    // Fetch destination account without verifying ownership
    const toAccount = await db.account.findUnique({
      where: { id: toAccountId },
    });

    if (!toAccount) throw new Error("Destination account not found");

    const transferAmount = parseFloat(amount);

    // Log transfer details for debugging
    console.log("Transfer details:", {
      from: fromAccountId,
      to: toAccountId,
      amount: transferAmount,
      userEmail: user.email,
      fromBalance: fromAccount.balance.toNumber(),
      toBalance: toAccount.balance.toNumber(),
    });

    // Deduct from source account
    await db.account.update({
      where: { id: fromAccountId },
      data: {
        balance: {
          decrement: transferAmount,
        },
      },
    });

    // Add to destination account
    await db.account.update({
      where: { id: toAccountId },
      data: {
        balance: {
          increment: transferAmount,
        },
      },
    });

    // Create transaction records
    await db.transaction.create({
      data: {
        type: "EXPENSE",
        amount: transferAmount,
        description: description || `Transfer to ${toAccount.name}`,
        date: new Date(),
        category: "transfer",
        status: "COMPLETED",
        userId: user.id,
        accountId: fromAccountId,
      },
    });

    await db.transaction.create({
      data: {
        type: "INCOME",
        amount: transferAmount,
        description: description || `Transfer from ${fromAccount.name}`,
        date: new Date(),
        category: "transfer",
        status: "COMPLETED",
        userId: user.id,
        accountId: toAccountId,
      },
    });

    revalidatePath("/dashboard");
    revalidatePath(`/account/${fromAccountId}`);
    revalidatePath(`/account/${toAccountId}`);

    return { success: true, data: { transferAmount } };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function bulkDeleteTransactions(transactionIds) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) throw new Error("User not found");

    // Get transactions to calculate balance changes
    const transactions = await db.transaction.findMany({
      where: {
        id: { in: transactionIds },
        userId: user.id,
      },
    });

    // Group transactions by account to update balances
    const accountBalanceChanges = transactions.reduce((acc, transaction) => {
      const change =
        transaction.type === "EXPENSE"
          ? transaction.amount
          : -transaction.amount;
      acc[transaction.accountId] = (acc[transaction.accountId] || 0) + change;
      return acc;
    }, {});

    // Delete transactions and update account balances in a transaction
    await db.$transaction(async (tx) => {
      // Delete transactions
      await tx.transaction.deleteMany({
        where: {
          id: { in: transactionIds },
          userId: user.id,
        },
      });

      // Update account balances
      for (const [accountId, balanceChange] of Object.entries(
        accountBalanceChanges
      )) {
        await tx.account.update({
          where: { id: accountId },
          data: {
            balance: {
              increment: balanceChange,
            },
          },
        });
      }
    });

    revalidatePath("/dashboard");
    revalidatePath("/account/[id]");

    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
