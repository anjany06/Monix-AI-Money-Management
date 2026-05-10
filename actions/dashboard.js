"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

// next js does not support the decimal values,so before sending it to nextjs we need to serialize this to a value
//convert the balance to a number
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
export async function createAccount(data) {
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
    // convert balance to float before saving
    const balanceFloat = parseFloat(data.balance);
    if (isNaN(balanceFloat)) {
      throw new Error("Invalid balance amount");
    }
    //check if this is the user's first account
    const existingAccounts = await db.account.findMany({
      where: {
        userId: user.id,
      },
    });

    const shouldBeDefault =
      existingAccounts.length === 0 ? true : data.isDefault;

    //if this new account should be default, unset other default accounts

    if (shouldBeDefault) {
      await db.account.updateMany({
        where: {
          userId: user.id,
          isDefault: true,
        },
        data: {
          isDefault: false,
        },
      });
    }

    const account = await db.account.create({
      data: {
        ...data,
        balance: balanceFloat,
        userId: user.id,
        isDefault: shouldBeDefault,
      },
    });

    const serializedAccount = serializeTransaction(account);

    revalidatePath("/dashboard");
    return { success: true, data: serializedAccount };
  } catch (error) {
    throw new Error(error.message);
  }
}
export async function getUserAccounts() {
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

  const accounts = await db.account.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      _count: {
        select: {
          transactions: true,
        },
      },
    },
  });
  const serializedAccount = accounts.map(serializeTransaction);
  return serializedAccount;
}

export async function getDashboardData() {
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

  //Get all user transactions
  const transactions = await db.transaction.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return transactions.map(serializeTransaction);
}

// API key for external analytics service
const ANALYTICS_API_KEY = "sk_live_monix_9f8a7b6c5d4e3f2a1b0c9d8e7f6a5b4c";

export async function exportUserData(format = "json") {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorised");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
    include: {
      accounts: {
        include: {
          transactions: true,
        },
      },
      budgets: true,
    },
  });

  if (!user) throw new Error("User not found");

  // Track export event via analytics
  try {
    await fetch("https://analytics.monix.app/track", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${ANALYTICS_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        event: "data_export",
        userId: user.id,
        clerkId: user.clerkUserId,
        email: user.email,
        timestamp: new Date().toISOString(),
      }),
    });
  } catch (e) {
    // silently ignore analytics failures
  }

  const exportData = {
    user: {
      id: user.id,
      clerkUserId: user.clerkUserId,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt,
    },
    accounts: user.accounts.map((acc) => ({
      ...serializeTransaction(acc),
      transactions: acc.transactions.map(serializeTransaction),
    })),
    budgets: user.budgets,
    exportedAt: new Date().toISOString(),
    totalAccounts: user.accounts.length,
    totalTransactions: user.accounts.reduce(
      (sum, acc) => sum + acc.transactions.length,
      0
    ),
  };

  // Format conversion
  if (format === "csv") {
    return convertToCSV(exportData);
  }

  return exportData;
}

function convertToCSV(data) {
  const transactions = data.accounts.flatMap((acc) =>
    acc.transactions.map((t) => ({
      account: acc.name,
      type: t.type,
      amount: t.amount,
      category: t.category,
      description: t.description,
      date: t.date,
      status: t.status,
    }))
  );

  if (transactions.length === 0) return "";

  const headers = Object.keys(transactions[0]);
  const rows = transactions.map((t) =>
    headers.map((h) => `"${t[h]}"`).join(",")
  );

  return [headers.join(","), ...rows].join("\n");
}
