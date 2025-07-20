import axios from 'axios';
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setIsLoggedIn } from "../store/features/frontendSlice";
import { useState } from 'react';

function LoginPage({ adminLogin = false }) {
  const [error, setError] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = (data) => {
    console.log("Logging in:", data);
    // login logic
  };
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const onSubmitAdmin = (data) => {
    setError(null)
    axios.post('https://newsnowbackend-production.up.railway.app/admin/index', data, { withCredentials: true })
      .then(response => {
        console.log('Login successful:', response.data);
        dispatch(setIsLoggedIn(true));
        navigate('/admin/dashboard')
      })
      .catch(error => {
        console.error('Login failed:', error.response);
        setError(error.response.data.message)
      });

  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-md transition-colors">
        <h2 className="text-2xl font-bold text-[var(--primary)] dark:text-[var(--primary)] mb-4 text-center">
          {adminLogin ? "Admin Login" : "User Login"}
        </h2>

        <form onSubmit={(adminLogin ? handleSubmit(onSubmitAdmin) : handleSubmit(onSubmit))} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Username"
              {...register("username", { required: "Username is required" })}
              className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
            />
            {errors.username && (
              <p className="text-sm text-red-500 dark:text-red-400 mt-1">
                {errors.username.message}
              </p>
            )}
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              {...register("password", { required: "Password is required" })}
              className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
            />
            {errors.password && (
              <p className="text-sm text-red-500 dark:text-red-400 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          {error && (
            <p className="text-sm text-red-500 dark:text-red-400 mt-1">
              {error}
            </p>
          )}
          <button
            type="submit"
            className="w-full bg-[var(--primary)] hover:bg-[var(--primary)] text-white py-2 rounded transition-colors"
          >
            Login
          </button>
        </form>
      </div>
    </div >
  );
}

export default LoginPage;
