import { getDashboardData, getUserAccounts } from "@/actions/dashboard";
import CreateAccountDrawer from "@/components/create-account-drawer";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";
import React, { Suspense } from "react";
import AccountCard from "./_components/account-card";
import { getCurrentBudget } from "@/actions/budget";
import BudgetProgress from "./_components/budget-progress";
import DashboardOverview from "./_components/transaction-overview";

const DashboardPage = async () => {
  const accounts = await getUserAccounts();
  const defaultAccount = accounts?.find((account) => account.isDefault);

  let budgetData = null;
  if (defaultAccount) {
    budgetData = await getCurrentBudget(defaultAccount.id);
  }
  // console.log(budgetData);
  // console.log(accounts);

  const transactions = await getDashboardData();
  return (
    <div className="space-y-8">
      {/* Budget Progress */}
      {defaultAccount && (
        <BudgetProgress
          initialBudget={budgetData?.budget}
          currentExpenses={budgetData?.currentExpenses || 0}
        />
      )}
      {/* Overview */}
      <Suspense fallback={"Loading Overview..."}>
        <DashboardOverview
          accounts={accounts}
          transactions={transactions || []}
        />
      </Suspense>

      {/* Accounts Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <CreateAccountDrawer>
          <div className="glass-card p-6 flex flex-col items-center justify-center opacity-0 animate-fadeInUp animate-delay-100 cursor-pointer hover:bg-white/5 transition-all duration-300 group">
            <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center mb-3 group-hover:bg-gradient-to-r from-cyan-500/30 to-blue-500/30 transition-all duration-300">
              <Plus
                size={24}
                className="text-gray-400 group-hover:text-cyan-400 transition-colors"
              />
            </div>
            <span className="group-hover:text-white transition-colors neon-text-cyan">
              Add new Account
            </span>
          </div>
        </CreateAccountDrawer>
        {accounts.length > 0 &&
          accounts?.map((account) => {
            return <AccountCard key={account.id} account={account} />;
          })}
      </div>
    </div>
  );
};

export default DashboardPage;
