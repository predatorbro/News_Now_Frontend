import { Link, useNavigate } from "react-router-dom";
import Pagination from "../User_Components/Pagination";
import { useState } from "react";
import { useEffect } from "react";
import axios from '../Utility_Component/axiosInstancs';

const UserTable = () => {
    const [users, setusers] = useState(localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : []);
    const [error, setError] = useState({})

    const navigate = useNavigate();
    useEffect(() => {
        const fetchUsers = async function () {
            try {
                const response = await axios.get("/admin/users", {
                    withCredentials: true
                });
                setusers(response.data.data);
                localStorage.setItem('users', JSON.stringify(response.data.data));
            } catch (error) {
                setError(error.response);
                console.error("Failed to fetch dashboard stats:", error.message);
            }

        }
        fetchUsers();
        // setusers(temp);
    }, [])


    const updateUser = function (user) {
        navigate(`/admin/users/update/${user._id}`, {
            state: {
                user: user,
                update: true
            }
        });
    }
    const deleteUser = function (_id) {
        axios.delete(`/admin/delete-user/${_id}`)
            .then(response => {
                console.log(response);
                alert(response.data.message)
                setusers(users.filter(user => user._id !== _id));
                localStorage.setItem('users', JSON.stringify(users.filter(user => user._id !== _id)));
            })
            .catch(error => {
                alert(error.response.data.message)
                console.error(error);
            });
    };
    if (error.statusText) return <div className='flex flex-col items-center justify-center min-h-screen text-2xl text-[var(--primary)]'>
        {error && <div className='flex items-center gap-2  font-bold'><span className='text-5xl'>{error.status}</span>|<span> {error.statusText}</span></div>}
    </div>
    return (
        <div className="p-10 mx-auto dark:bg-gray-900 min-h-screen">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold flex items-center gap-2 text-gray-800 dark:text-gray-100">
                    <i className="fa-regular fa-users"></i>
                    All Users
                </h1>
                <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded shadow text-sm font-medium">
                    <Link to="/admin/users/add">Add User</Link>
                </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto shadow-md rounded-lg">
                <table className="min-w-full table-auto border-collapse text-left">
                    <thead className="bg-blue-900 dark:bg-gray-800 text-white">
                        <tr>
                            <th className="px-4 py-3">S.NO.</th>
                            <th className="px-4 py-3">FULL NAME</th>
                            <th className="px-4 py-3">USER NAME</th>
                            <th className="px-4 py-3">ROLE</th>
                            <th className="px-4 py-3">EDIT</th>
                            <th className="px-4 py-3">DELETE</th>
                        </tr>
                    </thead>
                    <tbody className=" dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                        {users?.map((user, index) => (
                            <tr key={user._id} className="hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-gray-100">
                                <td className="px-4 py-3">{index + 1}</td>
                                <td className="px-4 py-3">{user.fullName}</td>
                                <td className="px-4 py-3">{user.username}</td>
                                <td className="px-4 py-3">
                                    <span className="capitalize px-2 py-1 rounded bg-gray-200 dark:bg-gray-700">
                                        {user.role}
                                    </span>
                                </td>
                                <td className="px-4 py-3">
                                    <button className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300" onClick={() => updateUser(user)}>
                                        <i className="fa-regular fa-pen"></i>
                                    </button>
                                </td>
                                <td className="px-4 py-3">
                                    <button className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300" onClick={() => deleteUser(user._id)}>
                                        <i className="fa-regular fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
 
        </div>
    );
};

export default UserTable;
