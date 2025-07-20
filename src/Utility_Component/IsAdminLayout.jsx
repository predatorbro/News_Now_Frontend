// src/layouts/AdminLayout.jsx
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

const Loader = ({ text }) => (
  <div className="text-center py-10 text-lg text-gray-600 dark:text-gray-300 min-h-screen flex justify-center items-center">
    {text && text || "Loading..."}
  </div>
);

export default function AdminLayout({ children, fallback = <Loader /> }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isChecking, setIsChecking] = useState(true);

  const authStatus = useSelector((state) => state.frontend.isLoggedIn); // true / false / null
  const currentUser = useSelector((state) => state.frontend.currentUser); // { name, email, role, ... }

  useEffect(() => {
    if (authStatus === null || authStatus === undefined || !currentUser) return fallback;

    const isAuthenticated = !!authStatus;
    const isAdmin = currentUser?.role?.toUpperCase() === "ADMIN"
    if (!isAuthenticated || !isAdmin) {
      // Not logged in or not an admin
      navigate("/admin/login", { state: { from: location.pathname } });
    }

    setIsChecking(false);
  }, [authStatus, currentUser, navigate, location.pathname, fallback]);

  if (isChecking) return fallback;

  return children;
}
