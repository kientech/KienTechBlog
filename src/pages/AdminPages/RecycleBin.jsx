import React, { useEffect, useState } from "react";
import {
  collection,
  doc,
  onSnapshot,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../db/database";
import { toast } from "react-toastify";

function RecycleBin() {
  const [deletedBlogs, setDeletedBlogs] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "blogs"), (snapshot) => {
      const blogs = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        if (data.isDeleted) {
          blogs.push({ id: doc.id, ...data });
        }
      });
      setDeletedBlogs(blogs);
    });

    // Cleanup listener khi component unmount
    return () => unsubscribe();
  }, []);

  // Khôi phục bài viết
  const handleRestore = async (id) => {
    try {
      const blogRef = doc(db, "blogs", id);
      await updateDoc(blogRef, { isDeleted: false });
      toast.success("Blog Restored Successfully!", {
        position: "bottom-center",
        autoClose: 2000,
      });
    } catch (error) {
      console.error("Error restoring blog:", error);
      toast.error("Failed to Restore Blog.", {
        position: "bottom-center",
        autoClose: 2000,
      });
    }
  };

  // Xóa vĩnh viễn bài viết
  const handleDeletePermanently = async (id) => {
    try {
      const blogRef = doc(db, "blogs", id);
      await deleteDoc(blogRef);
      toast.success("Blog Deleted Permanently!", {
        position: "bottom-center",
        autoClose: 2000,
      });
    } catch (error) {
      console.error("Error deleting blog:", error);
      toast.error("Failed to delete blog.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 bg-white rounded-md">
      <h1 className="text-2xl font-bold mb-4">Recycle Bin</h1>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="border px-4 py-2">#</th>
            <th className="border px-4 py-2">Title</th>
            <th className="border px-4 py-2">Author</th>
            <th className="border px-4 py-2">Category</th>
            <th className="border px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {deletedBlogs.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center py-4">
                No deleted blogs found.
              </td>
            </tr>
          ) : (
            deletedBlogs.map((blog, index) => (
              <tr key={blog.id}>
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">{blog.title}</td>
                <td className="border px-4 py-2">{blog.author}</td>
                <td className="border px-4 py-2">{blog.category}</td>
                <td className="border px-4 py-2 flex gap-2 justify-center">
                  {/* Restore */}
                  <button
                    onClick={() => handleRestore(blog.id)}
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                  >
                    Restore
                  </button>
                  {/* Delete Permanently */}
                  <button
                    onClick={() => handleDeletePermanently(blog.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default RecycleBin;
