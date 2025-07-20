import { useForm } from "react-hook-form";
import axios from '../Utility_Component/axiosInstancs';
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
function AddUserForm() {
  const location = useLocation();
  const { user, update } = location.state || {};

  console.log("Single User:", user);
  const [error, setError] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // If update is true, we are updating an existing user
  const onSubmitAdd = (data) => {
    setError(null)
    // Save to backend or Appwrite logic here 

    axios.post("/admin/add-user", data, { withCredentials: true })
      .then(response => {
        console.log("Post created:", response.data);
        navigate("/admin/users");
      })
      .catch(error => {
        console.error("Error creating post:", error);
        setError(error.response.data.message)
      });
  };
  const navigate = useNavigate();
  const onSubmitUpdate = (data) => {
    setError(null)
    // Save to backend or Appwrite logic here 

    axios.post(`/admin/update-user/${user._id}`, data, { withCredentials: true })
      .then(response => {
        navigate("/admin/users");
        console.log("Post created:", response.data);
      })
      .catch(error => {
        console.error("Error creating post:", error);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-md w-full max-w-xl p-6">
        <h2 className="text-2xl font-bold mb-6 text-center text-[var(--primary)] dark:text-[var(--primary)]">
          {update ? "Update User" : "Add New User"}
        </h2>

        <form onSubmit={update ? handleSubmit(onSubmitUpdate) : handleSubmit(onSubmitAdd)} className="space-y-4">
          {/* Full Name */}
          <div>
            <input
              type="text"
              defaultValue={user?.fullName}
              placeholder="Full Name"
              {...register("fullName", { required: "Full Name is required" })}
              className="w-full px-4 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white border-gray-300 dark:border-gray-600 focus:outline-none"
            />
            {errors.fullName && (
              <p className="text-sm text-red-500">{errors.fullName.message}</p>
            )}
          </div>

          {/* Username */}
          <div>
            <input
              type="text"
              disabled={update}
              defaultValue={user?.username}
              placeholder="Username"
              {...register("username", {
                required: "Username is required",
                pattern: {
                  value: /^\S+$/, // No spaces allowed
                  message: "Username cannot contain spaces",
                },
              })}
              className={
                "w-full px-4 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white border-gray-300 dark:border-gray-600 focus:outline-none " +
                (update ? "cursor-not-allowed opacity-50" : "")
              }
            />

            {errors.username && (
              <p className="text-sm text-red-500">{errors.username.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              placeholder="Password"
              {...register("password", {
                ...(!update ? { required: "Password is required" } : {}),
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters"
                }
              })}
              className="w-full px-4 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white border-gray-300 dark:border-gray-600 focus:outline-none"
            />

            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          {/* Role */}
          <div>
            <select
              {...register("role", { required: true })}
              defaultValue={user?.role || "author"}
              className="w-full px-4 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white border-gray-300 dark:border-gray-600 focus:outline-none"
            >
              <option value="author">Author</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          {error && (
            <p className="text-sm text-red-500 dark:text-red-400 mt-1">
              {error}
            </p>
          )}
          {/* Submit */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-2 bg-[var(--primary)] hover:bg-[var(--primary)] text-white font-semibold rounded-md transition"
            >
              {update ? "Update User" : "Add User"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddUserForm;
