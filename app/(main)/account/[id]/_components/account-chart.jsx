"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { endOfDay, format, startOfDay, startOfToday, subDays } from "date-fns";
import React, { useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const DATE_RANGES = {
  "7D": { label: "Last 7 Days", days: 7 },
  "1M": { label: "Last Month", days: 30 },
  "3M": { label: "Last 3 Months", days: 90 },
  "6M": { label: "Last 6 Months", days: 180 },
  All: { label: "All Time", days: null },
};

const AccountChart = ({ transactions }) => {
  const [dataRange, setDataRange] = useState("1M");

  const filteredData = useMemo(() => {
    const range = DATE_RANGES[dataRange];
    const now = new Date();

    //so we are checking if the days has range like 7d or 3m then start from that start days else
    //All means from 0 means whatever the oldest date
    const startDate = range.days
      ? startOfDay(subDays(now, range.days))
      : startOfDay(new Date(0));

    //filter transactions within date range
    const filtered = transactions.filter(
      (transaction) =>
        new Date(transaction.date) >= startDate &&
        new Date(transaction.date) <= endOfDay(now)
    );

    //group transactions by date
    const grouped = filtered.reduce((acc, transaction) => {
      const date = format(new Date(transaction.date), "MMM dd");

      if (!acc[date]) {
        acc[date] = {
          date,
          income: 0,
          expense: 0,
        };
      }
      if (transaction.type === "INCOME") {
        acc[date].income += transaction.amount;
      } else {
        acc[date].expense += transaction.amount;
      }

      return acc;
    }, {});

    // Convert the grouped object into an array and sort by date
    return Object.values(grouped).sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );
  }, [transactions, dataRange]);

  // so ab finally hamare pass ek array jisme hr index pe date, expense and income hoga..
  // console.log(filteredData);

  //now calculating total balance for that particular period
  const totals = useMemo(() => {
    return filteredData.reduce(
      (acc, day) => ({
        income: acc.income + day.income,
        expense: acc.expense + day.expense,
      }),
      { income: 0, expense: 0 }
    );
  }, [filteredData]);

  return (
    <div>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
          <CardTitle className="text-base font-normal">
            Transaction Overview
          </CardTitle>
          <Select default={dataRange} onValueChange={setDataRange}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Select Range" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(DATE_RANGES).map(([key, { label }]) => (
                <SelectItem key={key} value={key}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent>
          <div className="flex justify-around mb-6 text-sm">
            <div className="text-center">
              <p className="text-muted-foreground">Total Income</p>
              <p className="text-lg font-bold text-green-500">
                ${totals.income.toFixed(2)}
              </p>
            </div>
            <div className="text-center">
              <p className="text-muted-foreground">Total Expenses</p>
              <p className="text-lg font-bold text-red-500">
                ${totals.expense.toFixed(2)}
              </p>
            </div>
            <div className="text-center">
              <p className="text-muted-foreground">Net</p>
              <p
                className={`text-lg font-bold ${
                  totals.income - totals.expense > 0
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                ${(totals.income - totals.expense).toFixed(2)}
              </p>
            </div>
          </div>

          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={filteredData}
                margin={{
                  top: 10,
                  right: 10,
                  left: 10,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="date" />
                <YAxis
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip formatter={(value) => [`$${value}`, undefined]} />
                <Legend />
                <Bar
                  dataKey="income"
                  name="Income"
                  fill="#22c55e"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="expense"
                  name="Expense"
                  fill="#ef4444"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountChart;
