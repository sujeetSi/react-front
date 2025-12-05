import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError("Email and password are required");
      return;
    }
    login(form);
    const redirect = location.state?.from?.pathname || "/dashboard";
    navigate(redirect);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="card w-full max-w-md p-8">
        <h1 className="text-2xl font-bold mb-2">Welcome back</h1>
        <p className="text-sm text-muted mb-6">
          Sign in to track your expenses and budgets.
        </p>

        {error && (
          <div className="mb-4 text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">
            {error}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Email
            </label>
            <input
              className="input"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="you@example.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Password
            </label>
            <input
              className="input"
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="••••••••"
              required
            />
          </div>
          <button type="submit" className="btn-primary w-full">
            Login
          </button>
        </form>

        <p className="text-sm text-slate-600 mt-6 text-center">
          New here?{" "}
          <Link to="/signup" className="text-primary font-semibold">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

