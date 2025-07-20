import { useEffect, useState } from "react";
import axios from '../Utility_Component/axiosInstancs';

const CommentsTable = () => {
  const [comments, setComments] = useState([]);
  const [error, setError] = useState({});
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    axios.get("/admin/comments", { withCredentials: true })
      .then(response => {
        console.log(response.data.data);
        setComments(response.data.data);
      }).catch(error => {
        console.log(error);
        setError(error.response);
      });
  }, []);

  const updateStatus = (commentId, newStatus) => {
    axios.patch(`/admin/update-comment/${commentId}`, { status: newStatus }, { withCredentials: true })
      .then(() => {
        setComments(prev =>
          prev.map(comment =>
            comment._id === commentId ? { ...comment, status: newStatus } : comment
          )
        )
      }).catch(error => {
        alert("Failed to update status");
        console.error(error);
      });
  };

  const filteredComments = comments.filter(comment => {
    if (filterStatus === "all") return true;
    return comment.status === filterStatus;
  });

  if (error.statusText) {
    return (
      <div className='flex flex-col items-center justify-center min-h-screen text-2xl text-[var(--primary)]'>
        {error && <div className='flex items-center gap-2 font-bold'>
          <span className='text-5xl'>{error.status}</span> | <span>{error.statusText}</span>
        </div>}
      </div>
    );
  }

  return (
    <div className="p-10 mx-auto dark:bg-gray-900 min-h-screen">
      {/* Header with Filter */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
          All Comments
        </h1>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-3 py-1 border rounded-md bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 border-gray-300 dark:border-gray-700"
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full table-auto border-collapse text-left">
          <thead className="bg-blue-900 dark:bg-gray-800 text-white">
            <tr>
              <th className="px-4 py-3">S.NO.</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Content</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Change Status</th>
            </tr>
          </thead>
          <tbody className="dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
            {filteredComments.map((comment, index) => (
              <tr key={comment._id} className="hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-gray-100">
                <td className="px-4 py-3">{index + 1}</td>
                <td className="px-4 py-3">{comment.name}</td>
                <td className="px-4 py-3">{comment.email}</td>
                <td className="px-4 py-3">{comment.content}</td>
                <td className="px-4 py-3 capitalize">{comment.status}</td>
                <td className="px-4 py-3">
                  <select
                    value={comment.status}
                    onChange={(e) => updateStatus(comment._id, e.target.value)}
                    className="px-2 py-1 border rounded dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700"
                  >
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </td>
              </tr>
            ))}

            {filteredComments.length < 1 && (
              <tr>
                <td colSpan="6" className="px-4 py-3 text-center text-white">
                  No comments found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CommentsTable;
