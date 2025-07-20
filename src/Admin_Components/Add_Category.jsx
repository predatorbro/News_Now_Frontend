import { useForm } from "react-hook-form";
import axios from '../Utility_Component/axiosInstancs'; 
import { useLocation, useNavigate } from "react-router-dom";

function AddCategoryForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const { category, update } = location.state || {}; // Renamed from `user` to `category` for clarity

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // ✅ Add Category
  const onSubmitAdd = (data) => {
    axios
      .post("/admin/add-category", data, {
        withCredentials: true,
      })
      .then((response) => {
        console.log("Category added:", response.data);
        navigate("/admin/categories");
      })
      .catch((error) => {
        console.error("Error adding category:", error);
      });
  };

  // ✅ Update Category
  const onSubmitUpdate = (data) => {
    axios
      .post(`/admin/update-category/${category._id}`, data, {
        withCredentials: true,
      })
      .then((response) => {
        console.log("Category updated:", response.data);
        navigate("/admin/categories");
      })
      .catch((error) => {
        console.error("Error updating category:", error);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-md w-full max-w-xl p-6">
        <h2 className="text-2xl font-bold mb-6 text-center text-[var(--primary)] dark:text-[var(--primary)]">
          {update ? "Update Category" : "Add New Category"}
        </h2>

        <form
          onSubmit={update ? handleSubmit(onSubmitUpdate) : handleSubmit(onSubmitAdd)}
          className="space-y-4"
        >
          {/* Category Name */}
          <div>
            <input
              type="text"
              defaultValue={category?.name}
              placeholder="Category Name"
              {...register("name", {
                required: "Category Name is required",
              })}
              className="w-full px-4 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white border-gray-300 dark:border-gray-600 focus:outline-none"
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <textarea
              rows={4}
              defaultValue={category?.description}
              placeholder="Description"
              {...register("description", {
                required: "Description is required",
              })}
              className="w-full px-4 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white border-gray-300 dark:border-gray-600 focus:outline-none"
            />
            {errors.description && (
              <p className="text-sm text-red-500">{errors.description.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-2 bg-[var(--primary)] hover:bg-[var(--primary)] text-white font-semibold rounded-md transition"
            >
              {update ? "Update Category" : "Add Category"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddCategoryForm;
