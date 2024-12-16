import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../db/database";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";

function DashboardPage() {
  const [blogs, setBlogs] = useState([]);
  const [dailyStats, setDailyStats] = useState([]);
  const [categoryStats, setCategoryStats] = useState([]);
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  // Lấy dữ liệu từ Firestore
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "blogs"));
        const blogList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBlogs(blogList);

        // Tính toán số lượng bài viết theo ngày
        const daily = blogList.reduce((acc, blog) => {
          const date = blog.date; // Giả định mỗi bài viết có thuộc tính 'date' (YYYY-MM-DD)
          acc[date] = (acc[date] || 0) + 1;
          return acc;
        }, {});
        setDailyStats(
          Object.entries(daily).map(([date, count]) => ({ date, count }))
        );

        // Tính toán số lượng bài viết theo danh mục
        const categories = blogList.reduce((acc, blog) => {
          const category = blog.category; // Giả định mỗi bài viết có thuộc tính 'category'
          acc[category] = (acc[category] || 0) + 1;
          return acc;
        }, {});
        setCategoryStats(
          Object.entries(categories).map(([category, count]) => ({
            category,
            count,
          }))
        );
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Biểu đồ cột: Thống kê bài viết theo ngày */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-2">Posts Number</h2>
          <BarChart
            width={500}
            height={300}
            data={dailyStats}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </div>

        {/* Biểu đồ tròn: Thống kê bài viết theo danh mục */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-2">Post by Category</h2>
          <PieChart width={400} height={300}>
            <Pie
              data={categoryStats}
              dataKey="count"
              nameKey="category"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {categoryStats.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
