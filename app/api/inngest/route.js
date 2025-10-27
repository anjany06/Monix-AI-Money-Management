import { inngest } from "@/lib/inngest/client";
import { serve } from "inngest/next";
import {
  checkBudgetAlerts,
  generateMonthlyReports,
  processRecurringTransaction,
  triggerRecurringTransactions,
} from "@/lib/inngest/functions";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    checkBudgetAlerts,
    generateMonthlyReports,
    processRecurringTransaction,
    triggerRecurringTransactions,
  ],
});