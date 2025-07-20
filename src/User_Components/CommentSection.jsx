import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const CommentSection = ({ articleId }) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm();

    const onSubmit = async (data) => {
        try {
            await axios.post("https://newsnowbackend-production.up.railway.app/api/add-comment", {
                ...data,
                articleId,
            }).then(() => {
                alert("Comment Submitted successfully, Waiting for approval !!");
            })
            reset();
        } catch (error) {
            console.error("Error adding comment:", error);
        }
    };

    const [comments, setComments] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                if (articleId) {
                    await axios.get(`https://newsnowbackend-production.up.railway.app/api/comments/${articleId}`)
                        .then((response) => {
                            setComments(response.data.data);
                        }).catch((error) => {
                            console.error("Error fetching comments:", error);
                        })
                }
            } catch (error) {
                console.error("Error fetching comments:", error);
            }
        })();
    }, [articleId]);

    return (
        <div className="w-full mt-5">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
                Add a Comment
            </h2>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white dark:bg-gray-800 shadow rounded p-6 space-y-4"
            >
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                        Name
                    </label>
                    <input
                        id="name"
                        type="text"
                        {...register("name", { required: "Name is required" })}
                        className={`mt-1 w-full px-3 py-2 border rounded-md bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.name ? "border-red-500" : "border-gray-300 dark:border-gray-700"
                            }`}
                    />
                    {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>}
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "Enter a valid email",
                            },
                        })}
                        className={`mt-1 w-full px-3 py-2 border rounded-md bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.email ? "border-red-500" : "border-gray-300 dark:border-gray-700"
                            }`}
                    />
                    {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
                </div>

                <div>
                    <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                        Comment
                    </label>
                    <textarea
                        id="content"
                        rows="4"
                        {...register("content", { required: "Comment cannot be empty" })}
                        className={`mt-1 w-full px-3 py-2 border rounded-md bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.content ? "border-red-500" : "border-gray-300 dark:border-gray-700"
                            }`}
                    ></textarea>
                    {errors.content && <p className="text-sm text-red-500 mt-1">{errors.content.message}</p>}
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                >
                    {isSubmitting ? "Posting..." : "Post Comment"}
                </button>
            </form>

            <div className="mt-8">
                {
                    comments?.length > 0 &&
                    <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Comments</h3>
                }

                {
                    comments?.map((comment) => (
                        <div key={comment._id} className="bg-white dark:bg-gray-800 shadow rounded p-4 mb-4">
                            <p className="text-gray-800 dark:text-gray-100 font-semibold">{comment.name}</p>
                            <p className="text-gray-600 dark:text-gray-400">{comment.content}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default CommentSection;
