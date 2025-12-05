import React, { useMemo, useState } from "react";
import { useData } from "../context/DataContext";

const Budget = () => {
  const { currentBudget, monthlySummary, setBudget, currentMonth } = useData();
  const [amount, setAmount] = useState(currentBudget?.amount || "");

  
  const remaining = useMemo(() => {
    const budgetVal = Number(amount || currentBudget?.amount || 0);
    return (budgetVal - monthlySummary.total).toFixed(2);
  }, [amount, monthlySummary.total, currentBudget]);

 
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount) return;
    setBudget(Number(amount), currentMonth);
  };

  return (
    <div className="max-w-xl mx-auto space-y-6 p-4">

     
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Monthly Budget</h1>
        <p className="text-sm text-gray-500">
          Manage your spending for: <span className="font-medium">{currentMonth}</span>
        </p>
      </div>

 
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
       
        <div className="bg-white p-4 border rounded-lg shadow-sm">
          <p className="text-sm text-gray-500">Budget</p>
          <p className="text-xl font-semibold text-gray-900">
            ₹{Number(currentBudget?.amount || 0).toFixed(2)}
          </p>
        </div>

     
        <div className="bg-white p-4 border rounded-lg shadow-sm">
          <p className="text-sm text-gray-500">Spent</p>
          <p className="text-xl font-semibold text-gray-900">
            ₹{monthlySummary.total.toFixed(2)}
          </p>
        </div>

     
        <div className="bg-white p-4 border rounded-lg shadow-sm">
          <p className="text-sm text-gray-500">Remaining</p>
          <p className="text-xl font-semibold text-green-600">
            ₹{remaining}
          </p>
        </div>
      </div>

 
      <form onSubmit={handleSubmit} className="bg-white p-5 border rounded-lg shadow-sm space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Set Monthly Budget
          </label>
          <input
            type="number"
            min="0"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter budget amount"
            className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition"
        >
          Save Budget
        </button>
      </form>
    </div>
  );
};

export default Budget;
