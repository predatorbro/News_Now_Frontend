import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import RTE from "./RTE";
import axios from '../Utility_Component/axiosInstancs';
import { useNavigate } from "react-router-dom";

function Add_Article({ post }) {
  const navigate = useNavigate();
  const [categories, setCategories] = React.useState([1, 2, 3]);
  const { register, handleSubmit, watch, setValue, control, getValues, reset, formState: { errors } } = useForm({
    defaultValues: {
      title: "",
      slug: "",
      content: "",
      category: "",
    },
  });
  useEffect(() => {
    if (post && categories.length > 0) {
      reset({
        title: post.title || "",
        slug: post.slug || "",
        content: post.content || "",
        category: post.category?._id || "",
      });
    }
  }, [post, categories, reset]);
  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");
    return "";
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  const submit = async (data) => {

    try {
      const formData = new FormData();

      // Append regular fields
      formData.append("title", data.title);
      formData.append("slug", data.slug);
      formData.append("content", data.content);
      formData.append("category", data.category);

      // Append file (single file)
      if (data.image && data.image[0]) {
        formData.append("image", data.image[0]); // assuming input name is 'image'
      }
      for (let pair of formData.entries()) {
        console.log(`${pair[0]}:`, pair[1]);
      }

      const url = post
        ? `/admin/update-article/${post._id}`
        : '/admin/add-article';

      const response = await axios.post(url, formData, {
        withCredentials: true,
      });

      console.log(`${post ? 'Updated' : 'Created'} article successfully:`, response.data);

      if (response.status >= 200 && response.status < 300) {
        navigate('/admin/articles');
      }
    } catch (error) {
      console.error('Error submitting article:', error);
      // optional: alert or toast
    }

  };


  useEffect(() => {
    axios.get('/admin/category', { withCredentials: true })
      .then(response => {
        setCategories(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }, [])

  useEffect(() => {
    console.log('Component mounted or updated :', post?.content);
  }, [post])


  const [logoPreview, setLogoPreview] = useState(null);
  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogoPreview(URL.createObjectURL(file));
    }

  };

  return (
    <form onSubmit={handleSubmit(submit)} className="p-4 max-w-7xl mx-auto min-h-[90vh] space-y-6">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
        {post ? "Edit Article" : "Add New Article"}
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Left Side */}
        <div className="md:col-span-2 space-y-4">

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title</label>
            <input
              type="text"
              placeholder="Enter title"
              {...register("title", { required: "Title is required" })}
          className="w-full px-3 py-2 border focus:border-none rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
              defaultValue={post?.title || ""}
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
          </div>

          {/* Slug */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Slug</label>
            <input
              type="text"
              placeholder="auto-generated-slug"
              {...register("slug", { required: "Slug is required" })}
              onInput={(e) =>
                setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true })
              }
              className="w-full px-3 py-2 border focus:border-none rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
            />
            {errors.slug && <p className="text-red-500 text-sm mt-1">{errors.slug.message}</p>}
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Content</label>
            <RTE name="content" control={control} defaultValue={getValues("content")} />
            {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>}
          </div>
        </div>

        {/* Right Side */}
        <div className="space-y-4">

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {post ? "Update Featured Image" : "Add Featured Image"}
            </label>
            {logoPreview && (
              <img
                src={logoPreview}
                alt="Logo Preview"
                className="mt-2 h-20 object-contain"
              />
            )}
            <input
              type="file"
              accept="image/png, image/jpg, image/jpeg, image/gif"
              {...register("image", { required: !post && "Image is required" })}
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
          file:rounded-md file:border-0 file:font-semibold
          file:bg-blue-100 dark:file:bg-gray-700 file:text-[var(--primary)] dark:file:text-white
          hover:file:bg-blue-200 dark:hover:file:bg-gray-600"
              onChange={handleLogoChange}

            />
            {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>}
          </div>

          {/* Category Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
            <select
              {...register("category", { required: "Category is required" })}
              className="w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
            >
              <option value="" disabled>Select Category</option>
              {categories?.map(category => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
            {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>}
          </div>

          {/* Image Preview */}
          {post?.image && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Current Image
              </label>
              <div className="w-full max-w-sm aspect-square rounded-md overflow-hidden border border-gray-300 dark:border-gray-600">
                <img
                  src={`https://newsnowbackend-production.up.railway.app/${post.image.replace("public\\", "").replace("public/", "")}`}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full px-4 py-2 text-white font-semibold rounded-md shadow-md ${post ? "bg-green-600 hover:bg-green-700" : "bg-[var(--primary)] hover:bg-[var(--primary)]"
              }`}
          >
            {post ? "Update" : "Submit"}
          </button>
        </div>
      </div>
    </form>

  );
}

export default Add_Article;
