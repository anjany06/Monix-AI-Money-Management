"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Check, Pencil, X } from "lucide-react";
import React, { useState } from "react";

const BudgetProgress = ({ initialBudget, currentExpenses }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newBudget, setNewBudget] = useState(
    initialBudget?.amount?.toString() || ""
  );

  const percentUsed = initialBudget
    ? (currentExpenses / initialBudget.amount) * 100
    : 0;
  const handleUpdateBudget = () => {};
  const handleCancel = () => {};
  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Budget ( Default Account)</CardTitle>
        <div>
          {isEditing ? (
            <div>
              <Input
                type="number"
                value={newBudget}
                onChange={(e) => setNewBudget(e.target.value)}
                className="w-32"
                placeholder="Enter Amount"
                autoFocus
              />
              <Button variant="ghost" size="icon" onClick={handleUpdateBudget}>
                <Check className="h-4 w-4 text-green-500" />
              </Button>
              <Button variant="ghost" size="icon" onClick={handleCancel}>
                <X className="h-4 w-4 text-red-500" />
              </Button>
            </div>
          ) : (
            <>
              <CardDescription>
                {initialBudget
                  ? `$${currentExpenses.toFixed(
                      2
                    )} of $${initialBudget.amount.toFixed(2)} spent`
                  : "No Budget set"}
              </CardDescription>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsEditing(true)}
                className="h-6 w-6"
              >
                <Pencil className="h-3 w-3" />
              </Button>
            </>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
    </Card>
  );
};

export default BudgetProgress;
