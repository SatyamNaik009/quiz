import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ApiService from "../../service/ApiService";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/login";

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill in all fields.");
      setTimeout(() => setError(""), 5000);
      return;
    }

    try {
      const response = await ApiService.loginUser({ email, password });

      localStorage.setItem("token", response.token);
      localStorage.setItem("role", response.role);
      localStorage.setItem("userId", response.userId);

      if (response.role === "ADMIN") {
        navigate("/admin", { replace: true });
      } else if (response.role === "NORMAL") {
        navigate("/user", { replace: true });
      } else {
        navigate(from, { replace: true });
      }
    } catch (error) {
      setError("Enter valid credentials");
      setTimeout(() => setError(""), 5000);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-600">
      <div className="w-full max-w-md p-8 space-y-8 bg-slate-100 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-slate-800">Login</h2>
        {error && (
          <p className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded">
            {error}
          </p>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="form-group">
            <label className="block mb-2 text-sm font-medium text-slate-700">
              Email
            </label>
            <input
              type="email"
              className="block w-full px-4 py-2 text-slate-700 bg-white border border-slate-300 rounded-lg focus:ring-slate-500 focus:border-slate-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="block mb-2 text-sm font-medium text-slate-700">
              Password
            </label>
            <input
              type="password"
              className="block w-full px-4 py-2 text-slate-700 bg-white border border-slate-300 rounded-lg focus:ring-slate-500 focus:border-slate-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-slate-800 rounded-lg hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500"
          >
            Login
          </button>
        </form>
        <p className="text-sm text-center text-slate-600">
          Don't have an account?{" "}
          <a href="/register" className="text-slate-800 hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
