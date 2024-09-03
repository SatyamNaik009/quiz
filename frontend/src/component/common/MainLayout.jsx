import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";

const MainLayout = ({ children }) => {
  const location = useLocation();
  const hideNavbarRoutes = ["/quiz/:quizId/start"];

  // Determine if the current path matches any of the routes where the navbar should be hidden
  const shouldHideNavbar = hideNavbarRoutes.some((route) =>
    location.pathname.includes(route.replace(":quizId", ""))
  );

  return (
    <div>
      {!shouldHideNavbar && <Navbar />}
      {children}
    </div>
  );
};

export default MainLayout;
