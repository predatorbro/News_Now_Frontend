
import axios from '../Utility_Component/axiosInstancs';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// error handling is only apply in this component only
const PostTable = () => {
    const [posts, setPosts] = useState(localStorage.getItem('articles') ? JSON.parse(localStorage.getItem('articles')) : [])
    const [error, setError] = useState({})
    useEffect(() => {
        //  Fetch posts from the server
        try {
            axios.get('/admin/articles', { withCredentials: true })
                .then(response => {
                    console.log('Posts fetched successfully:', response.data.data);
                    setPosts(response.data.data);
                    localStorage.setItem('articles', JSON.stringify(response.data.data));
                })
                .catch(error => {
                    console.error('Error fetching posts:', error.response);
                    setError(error.response);
                });
        } catch (error) {
            setError(error);
            console.error('Error fetching posts:', error);
        }

    }, []);
    const DELETE = (_id) => {
        axios.delete(`/admin/delete-article/${_id}`, { withCredentials: true })
            .then(response => {
                console.log(response)
                setPosts(posts.filter(post => post._id !== _id));
                localStorage.setItem('articles', JSON.stringify(posts.filter(post => post._id !== _id)));
            })
    }
    function formatDate(dateString) {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString(undefined, options);
    }
    const navigate = useNavigate();

    if (error.statusText) return <div className='flex flex-col items-center justify-center min-h-screen text-2xl text-[var(--primary)]'>
        {error && <div className='flex items-center gap-2  font-bold'><span className='text-5xl'>{error.status}</span>|<span> {error.statusText}</span></div>}
    </div>
    return (
        <div className=" mx-auto p-10 dark:bg-gray-900 min-h-screen">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold flex items-center gap-2 text-gray-800 dark:text-gray-100">
                    <i className="fa-regular fa-newspaper"></i>
                    All Posts
                </h2>
                <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded shadow text-sm font-medium">
                    <Link to="/admin/articles/add">Add Post</Link>
                </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto shadow-md rounded-lg">
                <table className="min-w-full table-auto border-collapse text-left">
                    <thead className="bg-purple-900 dark:bg-gray-800 text-white">
                        <tr>
                            <th className="px-4 py-3">S.N.</th>
                            <th className="px-4 py-3">Title</th>
                            <th className="px-4 py-3">Image</th>
                            <th className="px-4 py-3">Category</th>
                            <th className="px-4 py-3">Date</th>
                            <th className="px-4 py-3">Author</th>
                            <th className="px-4 py-3">Edit</th>
                            <th className="px-4 py-3">Delete</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700 dark:text-gray-100">
                        {posts?.slice().reverse().map((post, index) => (
                            <tr key={post._id} className="hover:bg-gray-100 dark:hover:bg-gray-800">
                                <td className="px-4 py-3">{index + 1}</td>
                                <td className="px-4 py-3 min-w-sm max-w-md">{post.title}</td>
                                <td className="px-4 py-3">
                                    <img
                                        src={`https://newsnowbackend-production.up.railway.app/${post.image.replace("public\\", "").replace("public/", "")}`}
                                        alt={post.title} className="w-20 h-auto aspect-square object-cover rounded" />
                                </td>
                                <td className="px-4 py-3">
                                    <span className="px-2 py-1 rounded bg-gray-200 dark:bg-gray-700 capitalize">
                                        {post.category.slug}
                                    </span>
                                </td>
                                <td className="px-4 py-3">{formatDate(post.createdAt)}</td>
                                <td className="px-4 py-3">
                                    <span className="px-2 py-1 rounded bg-gray-200 dark:bg-gray-700 capitalize">
                                        {post.author.username}
                                    </span>
                                </td>

                                <td className="px-4 py-3">
                                    <div className="flex justify-center items-center h-full">
                                        <button
                                            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                                            onClick={() => navigate(`/admin/articles/update/${post._id}`)}
                                        >
                                            <i className="fa-regular fa-pen"></i>
                                        </button>
                                    </div>
                                </td>

                                <td className="px-4 py-3">
                                    <div className="flex justify-center items-center h-full">
                                        <button
                                            className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                                            onClick={() => DELETE(post._id)}
                                        >
                                            <i className="fa-regular fa-trash"></i>
                                        </button>
                                    </div>
                                </td>

                            </tr>
                        ))}
                        {posts?.length < 1 && <tr><td colSpan="7" className="px-4 py-3 text-center">No posts found</td></tr>}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PostTable;
