import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Very simple & beginner-friendly Navbar
export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="bg-white border-b border-gray-300">
      <div className="max-w-6xl mx-auto p-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/dashboard" className="flex items-center gap-2">
          <div className="h-8 w-8 flex items-center justify-center bg-blue-500 text-white rounded-md text-sm font-semibold">
            ET
          </div>
          <p className="text-sm font-semibold text-gray-900">Expense Tracker</p>
        </Link>

        {/* Simple Navigation */}
        <nav className="flex items-center gap-4 text-sm">
          <NavLink
            to="/dashboard"
            className={({ isActive }) => (isActive ? "text-blue-600" : "text-gray-700")}
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/expenses"
            className={({ isActive }) => (isActive ? "text-blue-600" : "text-gray-700")}
          >
            Expenses
          </NavLink>

          <NavLink
            to="/budget"
            className={({ isActive }) => (isActive ? "text-blue-600" : "text-gray-700")}
          >
            Budget
          </NavLink>
        </nav>

        {/* User Info & Logout */}
        <div className="flex items-center gap-3 text-sm">
          <div className="text-right">
            <p className="font-medium text-gray-900">{user?.name || "Guest"}</p>
            <p className="text-xs text-gray-500">{user?.email}</p>
          </div>

          <button
            onClick={handleLogout}
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-xs"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
