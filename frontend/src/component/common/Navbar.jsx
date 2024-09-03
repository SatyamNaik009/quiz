import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import ApiService from "../../service/ApiService";

function Navbar() {
  const isAuthenticated = ApiService.isAuthenticated();
  const isAdmin = ApiService.isAdmin();
  const isUser = ApiService.isUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    const isLogout = window.confirm(
      "Are you sure you want to logout this user?"
    );
    if (isLogout) {
      ApiService.logout();
      navigate("/login");
    }
  };

  return (
    <nav className="bg-slate-800 h-16 shadow-md fixed w-full z-10">
      <div className="container mx-auto h-full flex justify-end items-end text-xl font-serif px-6 pb-2">
        <ul className="flex space-x-8 text-white">
          {isAdmin && (
            <li>
              <NavLink
                to="/admin"
                className={({ isActive }) =>
                  isActive ? "text-white" : "hover:text-gray-400"
                }
              >
                Admin
              </NavLink>
            </li>
          )}
          {!isAuthenticated && (
            <>
              <li>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive ? "text-white" : "hover:text-gray-400"
                  }
                >
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/register"
                  className={({ isActive }) =>
                    isActive ? "text-white" : "hover:text-gray-400"
                  }
                >
                  Register
                </NavLink>
              </li>
            </>
          )}
          {isAuthenticated && (
            <li>
              <button
                onClick={handleLogout}
                className="hover:text-gray-400 focus:outline-none"
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
