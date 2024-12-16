import React, { useState, useEffect } from "react";
import { collection, onSnapshot, doc, updateDoc } from "firebase/firestore";
import { db } from "../../db/database";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function ManagementBlog() {
  const [blogs, setBlogs] = useState([]);
  const [users, setUsers] = useState({});
  const [loading, setLoading] = useState(true); // Trạng thái loading
  const navigate = useNavigate();

  useEffect(() => {
    const blogUnsubscribe = onSnapshot(collection(db, "blogs"), (snapshot) => {
      const blogData = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        if (!data.isDeleted) {
          blogData.push({ id: doc.id, ...data });
        }
      });
      setBlogs(blogData); // Cập nhật blogs
      setLoading(false); // Dữ liệu đã sẵn sàng
    });

    const userUnsubscribe = onSnapshot(collection(db, "users"), (snapshot) => {
      const userMap = {};
      snapshot.forEach((doc) => {
        userMap[doc.id] = doc.data().fullname;
      });
      setUsers(userMap); // Cập nhật users
    });

    return () => {
      blogUnsubscribe();
      userUnsubscribe();
    };
  }, []);

  // Soft delete blog
  const handleDelete = async (id) => {
    try {
      const blogRef = doc(db, "blogs", id);
      await updateDoc(blogRef, { isDeleted: true });
      toast.success("Blog Deleted Successfully!", {
        position: "bottom-center",
        autoClose: 2000,
      });
    } catch (error) {
      console.error("Error deleting blog: ", error);
      toast.error("Failed to delete blog.", {
        position: "bottom-center",
        autoClose: 2000,
      });
    }
  };

  // Handle status change
  const handleStatusChange = async (id, newStatus) => {
    try {
      const blogRef = doc(db, "blogs", id);
      await updateDoc(blogRef, { status: newStatus });
      toast.success("Status Updated Successfully!", {
        position: "bottom-center",
        autoClose: 2000,
      });
    } catch (error) {
      console.error("Error updating status: ", error);
      toast.error("Failed to update status.");
    }
  };

  return (
    <div className="w-full mx-auto p-4 bg-white rounded-md">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold mb-4">Blog Management</h1>
        <h1 className="text-md">Quality: {blogs.length}</h1>
      </div>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-200 rounded-lg">
          <thead>
            <tr>
              <th className="border border-gray-200 p-2">#</th>
              <th className="border border-gray-200 p-2">Image</th>
              <th className="border border-gray-200 p-2">Title</th>
              <th className="border border-gray-200 p-2">Author</th>
              <th className="border border-gray-200 p-2">Category</th>
              <th className="border border-gray-200 p-2">Status</th>
              <th className="border border-gray-200 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading
              ? Array.from({ length: 5 }).map((_, index) => (
                  <tr
                    key={index}
                    className={`text-center ${
                      index % 2 === 0 ? "bg-gray-100" : "bg-white"
                    }`}
                  >
                    <td className="border border-gray-200 p-2">
                      <Skeleton width={30} />
                    </td>
                    <td className="border border-gray-200 p-2">
                      <Skeleton width={80} height={40} />
                    </td>
                    <td className="border border-gray-200 p-2">
                      <Skeleton width={100} />
                    </td>
                    <td className="border border-gray-200 p-2">
                      <Skeleton width={120} />
                    </td>
                    <td className="border border-gray-200 p-2">
                      <Skeleton width={80} />
                    </td>
                    <td className="border border-gray-200 p-2">
                      <Skeleton width={100} />
                    </td>
                    <td className="border border-gray-200 p-2">
                      <Skeleton width={150} />
                    </td>
                  </tr>
                ))
              : blogs.map((blog, index) => (
                  <tr
                    key={blog.id}
                    className={`text-center ${
                      index % 2 === 0 ? "bg-[#f8fafc]" : "bg-white"
                    }`}
                  >
                    <td className="border border-gray-200 p-2 truncate">
                      {index + 1}
                    </td>
                    <td className="border border-gray-200 p-2 truncate">
                      <img
                        src={blog.image}
                        alt=""
                        className="w-24 h-12 rounded-lg object-cover"
                      />
                    </td>
                    <td
                      className="border border-gray-200 p-2 truncate"
                      title={blog.title}
                    >
                      {blog.title.slice(0, 30)}...
                    </td>

                    <td className="border border-gray-200 p-2 truncate">
                      <div className="flex items-center gap-x-2">
                        <img
                          src="https://cdn.dribbble.com/userupload/17576664/file/original-55a0466c68a41a29f48707fedd1a0fce.png?resize=2048x1536&vertical=center"
                          alt=""
                          className="block w-8 h-8 rounded-full"
                        />
                        <h1 className="flex-grow">
                          {users[blog.author] || "Unknown"}
                        </h1>
                      </div>
                    </td>
                    <td className="border border-gray-200 p-2 truncate">
                      {blog.category}
                    </td>

                    <td className="border border-gray-200 p-2 truncate ">
                      <select
                        value={blog.status}
                        onChange={(e) =>
                          handleStatusChange(blog.id, e.target.value)
                        }
                        className={`px-2 py-1 rounded outline-none text-sm focus:border-none focus:outline-none text-white ${
                          blog.status === "pending"
                            ? "bg-orange-400"
                            : "bg-green-500"
                        }`}
                      >
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                      </select>
                    </td>

                    <td className="border border-gray-200 p-2 truncate">
                      <div className="flex items-center gap-x-2">
                        <button
                          onClick={() => navigate(`/blogs/${blog.slug}`)}
                          className="bg-blue-500 text-white px-3 py-1 rounded"
                        >
                          <i class="ri-eye-line"></i>
                        </button>
                        <button
                          onClick={() =>
                            navigate(`/admin/edit-blog/${blog.id}`)
                          }
                          className="bg-yellow-500 text-white px-3 py-1 rounded"
                        >
                          <i class="ri-pencil-line"></i>
                        </button>
                        <button
                          onClick={() => handleDelete(blog.id)}
                          className="bg-red-500 text-white px-3 py-1 rounded"
                        >
                          <i class="ri-delete-bin-line"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ManagementBlog;
