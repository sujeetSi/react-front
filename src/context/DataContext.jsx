import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useAuth } from "./AuthContext";

const STORAGE_KEY = "expense-app-data";
const categories = ["food", "travel", "shopping", "bills", "other"];

const DataContext = createContext(null);

const getMonthKey = (date) => {
    const d = new Date(date);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
};

export const DataProvider = ({ children }) => {
    const { user } = useAuth();
    const [expenses, setExpenses] = useState([]);
    const [budgets, setBudgets] = useState([]);

    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            const parsed = JSON.parse(saved);
            setExpenses(parsed.expenses || []);
            setBudgets(parsed.budgets || []);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ expenses, budgets }));
    }, [expenses, budgets]);

    const addExpense = (payload) => {
        if (!user) return;
        const newExpense = {
            id: crypto.randomUUID(),
            userId: user.id,
            ...payload,
        };
        setExpenses((prev) => [...prev, newExpense]);
        return newExpense;
    };

    const updateExpense = (id, payload) => {
        setExpenses((prev) =>
            prev.map((exp) => (exp.id === id ? { ...exp, ...payload } : exp))
        );
    };

    const deleteExpense = (id) => {
        setExpenses((prev) => prev.filter((exp) => exp.id !== id));
    };

    const getUserExpenses = () =>
        expenses.filter((exp) => exp.userId === user?.id);

    const setBudget = (amount, month = getMonthKey(new Date())) => {
        if (!user) return;
        setBudgets((prev) => {
            const exists = prev.find(
                (b) => b.userId === user.id && b.month === month
            );
            if (exists) {
                return prev.map((b) =>
                    b.userId === user.id && b.month === month ? { ...b, amount } : b
                );
            }
            return [...prev, { id: crypto.randomUUID(), userId: user.id, month, amount }];
        });
    };

    const currentMonth = getMonthKey(new Date());

    const currentBudget = useMemo(() => {
        if (!user) return null;
        return (
            budgets.find(
                (b) => b.userId === user.id && b.month === currentMonth
            ) || null
        );
    }, [budgets, user, currentMonth]);

    const monthlySummary = useMemo(() => {
        const userExpenses = getUserExpenses();
        const monthExpenses = userExpenses.filter(
            (e) => getMonthKey(e.date) === currentMonth
        );
        const total = monthExpenses.reduce((sum, e) => sum + Number(e.amount || 0), 0);
        const breakdown = categories.reduce((acc, cat) => {
            acc[cat] = monthExpenses
                .filter((e) => e.category === cat)
                .reduce((sum, e) => sum + Number(e.amount || 0), 0);
            return acc;
        }, {});
        return {
            total,
            count: monthExpenses.length,
            breakdown,
        };
    }, [expenses, user, currentMonth]);

    return (
        <DataContext.Provider
            value={{
                categories,
                expenses,
                addExpense,
                updateExpense,
                deleteExpense,
                getUserExpenses,
                currentBudget,
                setBudget,
                monthlySummary,
                currentMonth,
            }}
        >
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => {
    const ctx = useContext(DataContext);
    if (!ctx) throw new Error("useData must be used inside DataProvider");
    return ctx;
};

