// src/layouts/AuthLayout.jsx
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

// Optional: Replace with your own Spinner component
const Loader = () => <div className="text-center py-10 text-lg text-gray-600 dark:text-gray-300">Loading...</div>;

export default function AuthLayout({ children, authentication = true, fallback = <Loader /> }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isChecking, setIsChecking] = useState(true);

  const authStatus = useSelector((state) => state.frontend.isLoggedIn); // true / false / null

  useEffect(() => {
    // wait until Redux initializes the auth status
    if (authStatus === null || authStatus === undefined) return;

    const isAuthenticated = !!authStatus;

    if (authentication && !isAuthenticated) {
      // Protected route but user is not logged in
      navigate("/admin/login", { state: { from: location.pathname } });
    } else if (!authentication && isAuthenticated) {
      // Public route but user is logged in
      navigate("/admin");
    }

    setIsChecking(false);
  }, [authStatus, authentication, navigate, location.pathname]);

  // while checking auth state
  if (isChecking) return fallback;

  return children;
}
