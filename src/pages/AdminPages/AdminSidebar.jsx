import React from "react";
import { Link, useLocation } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore";

const navigation = [
  {
    id: 1,
    name: "Dashboard",
    path: "/admin/dashboard",
    icon: "ri-dashboard-line",
  },
  {
    id: 2,
    name: "Create New Post",
    path: "/admin/create-blog",
    icon: "ri-add-line",
  },
  {
    id: 3,
    name: "All Posts",
    path: "/admin/management-blog",
    icon: "ri-table-line",
  },
  {
    id: 4,
    name: "Restore Posts",
    path: "/admin/recycle-bin",
    icon: "ri-restart-line",
  },
  {
    id: 5,
    name: "Users",
    path: "/admin/users",
    icon: "ri-user-line",
  },
];

function AdminSidebar() {
  const { logout } = useAuthStore();
  const location = useLocation(); // Lấy thông tin location hiện tại

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="w-full h-screen bg-blue-100 m-2 rounded-lg p-4 shadow-lg">
      {/* Header */}
      <div className="w-full h-auto flex items-center justify-between mb-8">
        <img
          src="https://cdn.dribbble.com/userupload/17576664/file/original-55a0466c68a41a29f48707fedd1a0fce.png?resize=2048x1536&vertical=center"
          alt="Admin Avatar"
          className="w-16 h-16 object-cover rounded-full border-2 border-white"
        />
        <h1 className="font-bold text-xl text-blue-500">Admin Panel</h1>
      </div>

      {/* Navigation */}
      <div className="flex flex-col gap-y-5">
        {navigation &&
          navigation.map((item) => (
            <Link
              to={item.path}
              key={item.id}
              className={`flex items-center gap-2 px-4 py-4 rounded-md ${
                location.pathname === item.path
                  ? "bg-blue-500 text-white"
                  : "hover:bg-blue-200 text-black"
              }`}
            >
              <i className={item.icon}></i>
              <h1 className="font-medium">{item.name}</h1>
            </Link>
          ))}
      </div>

      <div>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default AdminSidebar;
