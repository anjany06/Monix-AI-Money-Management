import { getUserAccounts } from "@/actions/dashboard";
import { defaultCategories } from "@/data/categories";
import React from "react";
import AddTransactionForm from "../_components/transaction-form";
import { getTransaction } from "@/actions/transactions";

const AddTransaction = async ({ searchParams }) => {
  const accounts = await getUserAccounts();
  const editId = searchParams?.edit;
  // console.log(editId);

  let initialData = null;
  if (editId) {
    const transaction = await getTransaction(editId);
    initialData = transaction;
  }
  return (
    <div className="max-w-3xl mx-3 md:mx-auto px-5 glass-card py-8 rounded-lg">
      <div className="flex justify-center md:justify-normal mb-8">
        <h1 className="text-4xl md:text-5xl neon-text font-bold text-center">
          {editId ? "Edit" : "Add"} Transaction
        </h1>
      </div>
      <AddTransactionForm
        accounts={accounts}
        categories={defaultCategories}
        editMode={!!editId}
        initialData={initialData}
      />
    </div>
  );
};

export default AddTransaction;
