import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SidebarComponent from "../components/Sidebar/SidebarComponent";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../db/database";
import Prism from "prismjs";
import "prismjs/themes/prism.css";

function DetailPage() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isScheduled, setIsScheduled] = useState(false);
  const [countdown, setCountdown] = useState(null); // Thêm trạng thái đếm ngược

  // Bắt đầu đếm ngược
  const startCountdown = (scheduleTime) => {
    const interval = setInterval(() => {
      const currentTime = new Date();
      const timeLeft = scheduleTime - currentTime;

      if (timeLeft <= 0) {
        clearInterval(interval); // Dừng đếm ngược khi hết thời gian
        setCountdown("Blog is now available!");
        setTimeout(() => {
          window.location.reload();
        }, 1000); // Chờ 1 giây rồi reload trang
      } else {
        const hours = Math.floor(timeLeft / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        setCountdown(`${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);
  };

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const q = query(collection(db, "blogs"), where("slug", "==", slug));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const blogData = querySnapshot.docs[0].data();
          setBlog(blogData);

          // Kiểm tra nếu thời gian lên lịch chưa đến
          const currentTime = new Date();
          const scheduleTime = blogData.scheduledTime?.toDate(); // Lấy thời gian từ Firebase (dạng Timestamp)

          if (scheduleTime && currentTime < scheduleTime) {
            setIsScheduled(true); // Đánh dấu là bài viết chưa có sẵn
            startCountdown(scheduleTime); // Bắt đầu đếm ngược
          }
        } else {
          setBlog(null); // Nếu không tìm thấy blog, set null
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
      } finally {
        setLoading(false); // Hoàn thành việc tải dữ liệu
      }
    };

    fetchBlog();
  }, [slug]);

  // Highlight code khi nội dung được render
  useEffect(() => {
    if (blog && blog.content) {
      Prism.highlightAll();
    }
  }, [blog]);

  // Hàm sao chép code vào clipboard
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text).then(
      () => {
        alert("Code copied to clipboard!");
      },
      (err) => {
        console.error("Error copying text: ", err);
      }
    );
  };

  // Nếu đang tải dữ liệu
  if (loading) return <div>Loading...</div>;

  // Nếu không tìm thấy blog
  if (!blog) return <div>Blog not found</div>;

  // Nếu bài viết chưa đến lịch
  if (isScheduled)
    return (
      <div>
        <div>This blog will be available at the scheduled time.</div>
        <div className="mt-4 text-xl font-semibold text-blue-500">
          {countdown} {/* Hiển thị đếm ngược */}
        </div>
      </div>
    );
  return (
    <div className="flex gap-x-8 mt-4">
      <div className="w-[70%] my-2">
        <div className="w-full relative group">
          <div className="w-full h-[480px]">
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <div className="absolute bottom-0 p-8 w-full group-hover:mb-4 transition-all">
            <div className="flex items-center gap-x-2">
              <h1 className="text-md text-white">Home</h1>
              <div className="text-white">{">"}</div>
              <h1 className="px-4 py-1 bg-blue-500 text-white rounded-lg">
                {blog.category}
              </h1>
            </div>
            <h1 className="my-4 text-xl font-semibold text-white">
              {blog.title}
            </h1>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-x-2">
                <div>
                  <h1 className="font-semibold text-md text-white">
                    {blog.author}
                  </h1>
                  <span className="text-md capitalize text-gray-200">
                    {blog.createdAt.toDate().toLocaleDateString()}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-x-2">
                <h1 className="text-white capitalize">
                  {blog.tags.join(", ")}
                </h1>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white rounded-lg p-4 my-4 dark:bg-[#161617] dark:text-white">
          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{
              __html: blog.content,
            }}
          ></div>
        </div>
      </div>
      <div className="w-[30%]">
        <SidebarComponent />
      </div>
    </div>
  );
}

export default DetailPage;
