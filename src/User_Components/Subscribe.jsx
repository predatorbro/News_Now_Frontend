import { useForm } from "react-hook-form";

function Subscribe() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = ({ email }) => {
        // TODO: send to backend or API
        alert(`Subscribed with: ${email}`);
        localStorage.setItem("subscribed", true);
        reset();
        window.location.href = "/"
    };

    return (
        <div className="min-h-[90vh] flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4 py-10">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white text-center">
                    Subscribe
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col sm:flex-row gap-4">
                    <div className="w-full">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^\S+@\S+\.\S+$/,
                                    message: "Invalid email format",
                                },
                            })}
                            className={`w-full px-4 py-2 rounded-md border ${errors.email ? "border-red-500" : "border-gray-300 dark:border-gray-700"
                                } bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[var(--primary)]`}
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="bg-[var(--primary)] hover:opacity-80 text-white px-6 py-2 rounded-md transition"
                    >
                        Subscribe
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Subscribe;
