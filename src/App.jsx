import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  useNavigate,
} from "react-router-dom";
import useAuthStore from "./store/useAuthStore";

// Components & Pages
import Header from "./components/Header";
import Footer from "./components/Footer"; // Footer cho UserLayout
import HomePage from "./pages/HomePage";
import DetailPage from "./pages/DetailPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import RecoverPassword from "./pages/RecoverPage";
import AdminComponent from "./pages/AdminPages/AdminComponent";
import DashboardPage from "./pages/AdminPages/DashboardPage";
import CreateBlog from "./pages/AdminPages/CreateBlog";
import ManagementBlog from "./pages/AdminPages/ManagementBlog";
import RecycleBin from "./pages/AdminPages/RecycleBin";
import EditBlog from "./pages/AdminPages/EditBlog";
import SearchResults from "./pages/SearchResults";
import CategoryPage from "./pages/CategoryPage";
import AdminSidebar from "./pages/AdminPages/AdminSidebar";
import UserManagement from "./pages/AdminPages/UserManagement";
import ContactPage from "./pages/ContactPage";
import AboutUsPage from "./pages/AboutUsPage";
import ArduinoProjects from "./pages/ArduinoProjects";

// User Layout
function UserLayout({ toggleTheme, theme }) {
  const location = useNavigate();

  // Các trang không cần Header và Footer
  const hideHeaderFooter = [
    "/login",
    "/register",
    "/recover-password",
  ].includes(location.pathname);

  return (
    <div className="dark:bg-[#1c1c1c] py-4">
      <div className="max-w-[1070px] mx-auto">
        {/* Hiển thị Header nếu không thuộc danh sách hideHeaderFooter */}
        {!hideHeaderFooter && (
          <Header toggleTheme={toggleTheme} theme={theme} />
        )}
        <main>
          <Outlet />
        </main>
        {/* Hiển thị Footer nếu không thuộc danh sách hideHeaderFooter */}
        {!hideHeaderFooter && (
          <Footer toggleTheme={toggleTheme} theme={theme} />
        )}
      </div>
    </div>
  );
}

// Admin Layout
function AdminLayout() {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      // Nếu chưa có thông tin user, chuyển hướng về trang đăng nhập
      navigate("/login");
    } else if (user.email !== "admin@gmail.com") {
      navigate("/");
    } else {
      setLoading(false);
    }
  }, [user, navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-24 w-24 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="admin-layout w-full h-full p-2">
      <div className="bg-white flex gap-x-5 w-full rounded-lg">
        <div className="w-[20%] h-full sticky top-4 right-4">
          <AdminSidebar />
        </div>
        <main className="w-[80%] h-full ">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

// App Component
function App() {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <Routes>
      {/* User Routes */}
      <Route element={<UserLayout toggleTheme={toggleTheme} theme={theme} />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/blogs/search-results" element={<SearchResults />} />
        <Route path="/blogs/category/:slug" element={<CategoryPage />} />
        <Route path="/blogs/:slug" element={<DetailPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about-us" element={<AboutUsPage />} />
        <Route path="/arduino-projects" element={<ArduinoProjects />} />
      </Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/recover-password" element={<RecoverPassword />} />

      {/* Admin Routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminComponent />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="create-blog" element={<CreateBlog />} />
        <Route path="edit-blog/:id" element={<EditBlog />} />
        <Route path="management-blog" element={<ManagementBlog />} />
        <Route path="users" element={<UserManagement />} />
        <Route path="recycle-bin" element={<RecycleBin />} />
      </Route>
    </Routes>
  );
}

export default App;
