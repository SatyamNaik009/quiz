import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../service/ApiService";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState(""); // Add name state
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password || !confirmPassword || !name) {
      // Check name field
      setError("Please fill in all fields.");
      setTimeout(() => setError(""), 5000);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setTimeout(() => setError(""), 5000);
      return;
    }

    try {
      await ApiService.registerUser({ email, password, name }); // Include name in API call
      setSuccess("Registration successful! Redirecting to login...");
      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 2000);
    } catch (error) {
      setError("Enter valid credentials or the Email already exists");
      setTimeout(() => setError(""), 5000);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-600">
      <div className="w-full max-w-md p-8 space-y-8 bg-slate-100 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-slate-800">
          Register
        </h2>
        {error && (
          <p className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded">
            {error}
          </p>
        )}
        {success && (
          <p className="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded">
            {success}
          </p>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="form-group">
            <label className="block mb-2 text-sm font-medium text-slate-700">
              Name
            </label>
            <input
              type="text"
              className="block w-full px-4 py-2 text-slate-700 bg-white border border-slate-300 rounded-lg focus:ring-slate-500 focus:border-slate-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
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
          <div className="form-group">
            <label className="block mb-2 text-sm font-medium text-slate-700">
              Confirm Password
            </label>
            <input
              type="password"
              className="block w-full px-4 py-2 text-slate-700 bg-white border border-slate-300 rounded-lg focus:ring-slate-500 focus:border-slate-500"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-slate-800 rounded-lg hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500"
          >
            Register
          </button>
        </form>
        <p className="text-sm text-center text-slate-600">
          Already have an account?{" "}
          <a href="/login" className="text-slate-800 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
