import { useEffect, useState } from "react";
import Pagination from "../User_Components/Pagination";
import axios from '../Utility_Component/axiosInstancs';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCategories } from "../store/features/frontendSlice";

const CategoryTable = () => {
    const dispatch = useDispatch();
    const [category, setCategory] = useState(localStorage.getItem('categories') ? JSON.parse(localStorage.getItem('categories')) : [])
    const [error, setError] = useState({})
    const currUser = useSelector((state) => state.frontend.currentUser);
    useEffect(() => {
        axios.get("/admin/category", { withCredentials: true })
            .then(response => {
                setCategory(response.data.data);
                dispatch(setCategories(response.data.data));
                console.log(response.data.data)
            }).catch(error => {
                console.log(error)
                setError(error.response);
            })
    }, [dispatch])
    const DELETE = (_id) => {
        axios.delete(`/admin/delete-category/${_id}`, { withCredentials: true })
            .then(response => {
                console.log(response)
                setCategory(category.filter(cat => cat._id !== _id));
                localStorage.setItem('categories', JSON.stringify(category.filter(cat => cat._id !== _id)));
            }).catch(error => {
                alert(error.response.data.message)
            })
    }

    const updateCategory = (singleCategoryObject) => {
        // Navigate to the update category page with the category ID
        navigate(`/admin/categories/update/${singleCategoryObject._id}`, {
            state: { category: singleCategoryObject, update: true }
        });
    }
    const navigate = useNavigate()

    if (error.statusText) return <div className='flex flex-col items-center justify-center min-h-screen text-2xl text-[var(--primary)]'>
        {error && <div className='flex items-center gap-2  font-bold'><span className='text-5xl'>{error.status}</span>|<span> {error.statusText}</span></div>}
    </div>
    return (
        <div className="p-10 mx-auto dark:bg-gray-900 min-h-screen">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold flex items-center gap-2 text-gray-800 dark:text-gray-100">
                    <i className="fa-regular fa-layer-group"></i>
                    All Categories
                </h1>
                <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded shadow text-sm font-medium" onClick={() => navigate('/admin/categories/add')}>
                    ADD CATEGORY
                </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto shadow-md rounded-lg">
                <table className="min-w-full table-auto border-collapse text-left">
                    <thead className="bg-blue-900 dark:bg-gray-800 text-white">
                        <tr>
                            <th className="px-4 py-3">S.NO.</th>
                            <th className="px-4 py-3">Category Name</th>
                            <th className="px-4 py-3">No. of Article</th>
                            <th className="px-4 py-3">Created By</th>
                            <th className="px-4 py-3">EDIT</th>
                            <th className="px-4 py-3">DELETE</th>
                        </tr>
                    </thead>
                    <tbody className=" dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                        {category?.map((cat, index) => (
                            <tr key={cat._id} className="hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-gray-100">
                                <td className="px-4 py-3">{index + 1}</td>
                                <td className="px-4 py-3">{cat.name}</td>
                                <td className="px-4 py-3">{cat.articleCount}</td>
                                <td className="px-4 py-3">{cat.author.fullName}</td>
                                {currUser._id == cat.author._id || currUser.role == "admin" ? <><td className="px-4 py-3">
                                    <button className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300" onClick={() => updateCategory(cat)}>
                                        <i className="fa-regular fa-pen"></i>
                                    </button>
                                </td>
                                    <td className="px-4 py-3">
                                        <button className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300" onClick={() => DELETE(cat._id)}>
                                            <i className="fa-regular fa-trash"></i>
                                        </button>
                                    </td></> : <><td className="px-4 py-3">
                                        <button className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300" disabled>
                                            <i className="fa-regular fa-ban"></i>
                                        </button>
                                    </td>
                                    <td className="px-4 py-3">
                                        <button className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300" disabled>
                                            <i className="fa-regular fa-ban"></i>
                                        </button>
                                    </td></>}
                            </tr>
                        ))}
                        {category?.length < 1 && <tr><td colSpan="7" className="px-4 py-3 text-center text-white">No posts found</td></tr>}
                    </tbody>
                </table>
            </div>
 
        </div>
    );
};

export default CategoryTable;
