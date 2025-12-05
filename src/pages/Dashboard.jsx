import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useData } from "../context/DataContext";

const Dashboard = () => {
  const { user } = useAuth();
  const { monthlySummary, currentBudget } = useData();

  const totalSpent = monthlySummary.total.toFixed(2);
  const expensesCount = monthlySummary.count;
  const budget = currentBudget?.amount || 0;
  const remaining = (budget - totalSpent).toFixed(2);

  return (
    <div className="p-4 space-y-6">

      
      <div>
        <h1 className="text-xl font-bold">Hello {user?.name || "User"} 👋</h1>
        <p className="text-sm text-gray-500">
          Here is your monthly spending summary.
        </p>
      </div>

     
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 border rounded-lg bg-white">
          <p className="text-xs text-gray-500">Total Spent</p>
          <p className="text-lg font-bold">₹{totalSpent}</p>
        </div>

        <div className="p-4 border rounded-lg bg-white">
          <p className="text-xs text-gray-500">Expenses</p>
          <p className="text-lg font-bold">{expensesCount}</p>
        </div>

        <div className="p-4 border rounded-lg bg-white">
          <p className="text-xs text-gray-500">Budget</p>
          <p className="text-lg font-bold">₹{budget.toFixed(2)}</p>
        </div>

        <div className="p-4 border rounded-lg bg-white">
          <p className="text-xs text-gray-500">Remaining</p>
          <p className="text-lg font-bold">₹{remaining}</p>
        </div>
      </div>

     
      <div className="p-4 border rounded-lg bg-white">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold">Category Breakdown</h2>
          <Link
            to="/expenses/new"
            className="text-sm bg-blue-600 text-white px-3 py-1 rounded"
          >
            Add Expense
          </Link>
        </div>

        <div className="space-y-2">
          {Object.entries(monthlySummary.breakdown).map(([cat, amount]) => (
            <div
              key={cat}
              className="flex items-center justify-between p-2 border rounded"
            >
              <span className="capitalize text-sm text-gray-600">{cat}</span>
              <span className="font-medium">₹{amount.toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>

     
      <div className="p-4 border rounded-lg bg-white space-y-3">
        <h3 className="text-md font-semibold">Quick Access</h3>

        <Link
          to="/expenses"
          className="block w-full border rounded px-3 py-2 text-center hover:bg-gray-100"
        >
          View Expenses
        </Link>

        <Link
          to="/budget"
          className="block w-full border rounded px-3 py-2 text-center hover:bg-gray-100"
        >
          Set Budget
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
