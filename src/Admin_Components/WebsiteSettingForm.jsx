import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import axios from '../Utility_Component/axiosInstancs';
import { useSelector } from "react-redux";

function WebsiteSettingsForm() {

  const settingData = useSelector(state => state.frontend.settingsData);
  // console.log(settingData)
  const [error, setError] = useState({})

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    defaultValues: {
      websiteName: "",
      footerDescription: "",
      themeColor: ""
    }
  });

  useEffect(() => {
    if (settingData) {
      reset({
        websiteName: settingData?.websiteName,
        footerDescription: settingData?.footerDescription,
        themeColor: settingData?.themeColor
      })
    }
  }, [reset, settingData]);

  const [logoPreview, setLogoPreview] = useState(null);

  const onSubmit = (data) => {
    // console.log("Website Settings:", data);

    const payload = new FormData();
    payload.append("websiteName", data.websiteName);
    payload.append("footerDescription", data.footerDescription);
    payload.append("themeColor", data.themeColor);

    if (data.image && data.image[0]) {
      payload.append("image", data.image[0]);
    }

    axios.post("/admin/settings", payload, {
      withCredentials: true,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((response) => {
        window.location.reload();
        console.log("Server response:", response.data);
      })
      .catch((error) => {
        console.error("Error saving settings:", error);
        setError(error.response);

      });
  };


  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogoPreview(URL.createObjectURL(file));
    }

  };

  if (error.statusText) return <div className='flex flex-col items-center justify-center min-h-screen text-2xl text-[var(--primary)]'>
    {error && <div className='flex items-center gap-2  font-bold'><span className='text-5xl'>{error.status}</span>|<span> {error.statusText}</span></div>}
  </div>
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-md w-full max-w-xl p-6">
        <h2 className="text-2xl font-bold mb-6 text-center text-[var(--primary)] dark:text-[var(--primary)] ">
          Website Settings
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Website Name */}
          <div>
            <input
              type="text"
              placeholder="Website Name"
              {...register("websiteName")}
              className="w-full px-4 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white border-gray-300 dark:border-gray-600 focus:outline-none"
            />
            {errors.websiteName && (
              <p className="text-sm text-red-500">{errors.websiteName.message}</p>
            )}
          </div>

          {/* Footer Description */}
          <div>
            <textarea
              placeholder="Footer Description"
              rows="3"
              {...register("footerDescription")}
              className="w-full px-4 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white border-gray-300 dark:border-gray-600 focus:outline-none resize-none"

            />
            {errors.footerDescription && (
              <p className="text-sm text-red-500">{errors.footerDescription.message}</p>
            )}
          </div>

          {/* Upload Logo */}
          <div>
            <label className="block text-gray-700 dark:text-white mb-1 font-medium">Upload Logo</label>

            {logoPreview && (
              <img
                src={logoPreview}
                alt="Logo Preview"
                className="mt-2 h-20 object-contain"
              />
            )}
            {(!logoPreview && settingData?.image) && (
              <img
                src={`https://newsnowbackend-production.up.railway.app/${settingData?.image.replace("public\\", "").replace("public/", "")}`}
                alt="Logo Preview"
                className="mt-2 h-20 object-contain"
              />
            )}

            <input
              type="file"
              accept="image/*"
              {...register("image")}
              onChange={handleLogoChange}
              className="w-full text-gray-800 dark:text-white"
            />

          </div>

          {/* Website Color Theme */}
          <div>
            <label className="block text-gray-700 dark:text-white mb-1 font-medium">Select Theme Color</label>
            <input
              type="color"
              {...register("themeColor")}
              className="w-16 h-10 p-1 border rounded-md bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 cursor-pointer"
            />
          </div>

          {/* Save Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-2 bg-[var(--primary)] hover:opacity-80 text-white font-semibold rounded-md transition"
            >
              Save Settings
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default WebsiteSettingsForm;
