import React, { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useData } from "../context/DataContext";

const Expenses = () => {
  const { getUserExpenses, deleteExpense, categories } = useData();
  const navigate = useNavigate();

  const [category, setCategory] = useState("all");

  const expenses = useMemo(() => {
    let list = getUserExpenses();
    if (category !== "all") {
      list = list.filter((e) => e.category === category);
    }
    return list;
  }, [category, getUserExpenses]);

  return (
    <div style={{ padding: 20 }}>
      <h2>Expenses</h2>

 
      <Link
        to="/expenses/new"
        style={{ padding: "6px 10px", background: "#4F46E5", color: "#fff", 
        borderRadius: 5, textDecoration: "none", marginTop: 10, display: "inline-block" }}
      >
        Add Expense
      </Link>

   
      <div style={{ marginTop: 15 }}>
        <label>Filter Category: </label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{ padding: 5, marginLeft: 5 }}
        >
          <option value="all">All</option>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

    
      <div style={{ marginTop: 20 }}>
        {expenses.length === 0 && <p>No expenses found.</p>}

        {expenses.map((exp) => (
          <div
            key={exp.id}
            style={{
              border: "1px solid #ddd",
              padding: 12,
              borderRadius: 6,
              marginBottom: 10,
            }}
          >
            <h4 style={{ margin: 0 }}>{exp.title}</h4>
            <p style={{ margin: "5px 0" }}>
              {exp.category} • {new Date(exp.date).toLocaleDateString()}
            </p>
            <strong>₹{exp.amount}</strong>

            <div style={{ marginTop: 8 }}>
              <button
                onClick={() => navigate(`/expenses/${exp.id}`)}
                style={{
                  marginRight: 10,
                  background: "none",
                  border: "none",
                  color: "#2563EB",
                  cursor: "pointer",
                }}
              >
                Edit
              </button>

              <button
                onClick={() => deleteExpense(exp.id)}
                style={{
                  background: "none",
                  border: "none",
                  color: "red",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Expenses;
