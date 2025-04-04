"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import { endOfDay, format, startOfDay, startOfToday, subDays } from "date-fns";
import React, { useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
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
        <CardHeader>
          <CardTitle>Transaction Overview</CardTitle>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent>
          {/* <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="pv"
            fill="#8884d8"
            activeBar={<Rectangle fill="pink" stroke="blue" />}
          />
          <Bar
            dataKey="uv"
            fill="#82ca9d"
            activeBar={<Rectangle fill="gold" stroke="purple" />}
          />
        </BarChart>
      </ResponsiveContainer> */}
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountChart;
