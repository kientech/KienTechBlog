import React, { useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../db/database";
import { toast } from "react-toastify";
import useAuthStore from "../../store/useAuthStore";
import { useParams, useNavigate } from "react-router-dom"; // Dùng để lấy ID blog từ URL

function EditBlog() {
  const { user } = useAuthStore();
  const { id } = useParams();
  const navigate = useNavigate(); // Dùng để điều hướng sau khi lưu thành công

  const [title, setTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [slug, setSlug] = useState("");
  const [imageBase64, setImageBase64] = useState(""); // Lưu ảnh base64

  // Hàm tạo slug từ tiêu đề
  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "") // Xóa các ký tự đặc biệt
      .replace(/\s+/g, "-") // Thay thế khoảng trắng bằng dấu gạch ngang
      .trim();
  };

  // Khi tiêu đề thay đổi, tự động tạo slug
  useEffect(() => {
    if (title) {
      const newSlug = generateSlug(title);
      setSlug(newSlug);
    }
  }, [title]);

  // Lấy dữ liệu blog từ Firebase khi trang được tải
  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const docRef = doc(db, "blogs", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const blogData = docSnap.data();
          setTitle(blogData.title);
          setShortDescription(blogData.shortDescription);
          setContent(blogData.content);
          setCategory(blogData.category);
          setTags(blogData.tags);
          setSlug(blogData.slug);
          setImageBase64(blogData.image || ""); // Nếu không có ảnh, để trống
        } else {
          toast.error("Blog not found!");
        }
      } catch (error) {
        console.error("Error fetching blog data:", error);
        toast.error("Failed to load blog data.");
      }
    };

    fetchBlogData();
  }, [id]);

  // Hàm xử lý upload hình ảnh và chuyển thành base64
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageBase64(reader.result); // Lưu hình ảnh dưới dạng base64
      };
      reader.readAsDataURL(file);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "," || e.key === "Enter") {
      e.preventDefault();
      const trimmedValue = inputValue.trim();
      if (trimmedValue && !tags.includes(trimmedValue)) {
        setTags([...tags, trimmedValue]);
        setInputValue("");
      }
    }
  };

  const handleRemoveTag = (tag) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleContentChange = (newContent) => {
    setContent(newContent);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !title ||
      !shortDescription ||
      !content ||
      !category ||
      tags.length === 0
    ) {
      toast.error("Please fill in all fields!");
      return;
    }

    try {
      const docRef = doc(db, "blogs", id);
      await updateDoc(docRef, {
        title,
        shortDescription,
        content,
        slug, // Lưu slug vào Firebase
        author: user.uid, // Sử dụng thông tin từ auth
        category,
        tags,
        image: imageBase64, // Lưu hình ảnh dưới dạng base64
        updatedAt: new Date(),
      });

      toast.success("Blog updated successfully!");
      navigate(`/admin/management-blog`); // Điều hướng về trang blog sau khi lưu
    } catch (error) {
      console.error("Error updating document: ", error);
      toast.error("Failed to update blog. Try again later.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-4">Edit Blog</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-lg font-semibold">Title</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter blog title"
          />
        </div>
        {/* Short Description */}
        <div>
          <label className="block text-lg font-semibold">
            Short Description
          </label>
          <textarea
            className="w-full p-2 border rounded"
            value={shortDescription}
            onChange={(e) => setShortDescription(e.target.value)}
            placeholder="Enter a brief description"
          />
        </div>
        {/* Content */}
        <div>
          <label className="block text-lg font-semibold">Content</label>
          <Editor
            apiKey="kipc10e7w0fa5b7bozt9l0xwwmoukji25fh9wbyfnbzmuls5"
            init={{
              height: 400,
              menubar: true,
              plugins: [
                "advlist autolink lists link image charmap print preview anchor",
                "searchreplace visualblocks code fullscreen",
                "insertdatetime media table paste code help wordcount",
                "codesample", // Thêm plugin codesample
              ],
              toolbar:
                "undo redo | formatselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | code",
              codesample_languages: [
                { text: "HTML/XML", value: "markup" },
                { text: "JavaScript", value: "javascript" },
                { text: "CSS", value: "css" },
                { text: "Python", value: "python" },
                { text: "Java", value: "java" },
                { text: "C", value: "c" },
                { text: "C++", value: "cpp" },
                { text: "C#", value: "csharp" },
                { text: "PHP", value: "php" },
                { text: "Ruby", value: "ruby" },
                { text: "Go", value: "go" },
                { text: "Kotlin", value: "kotlin" },
              ], // Các ngôn ngữ hỗ trợ
              automatic_uploads: true,
              images_upload_handler: (blobInfo, success, failure) => {
                const reader = new FileReader();
                reader.onloadend = () => success(reader.result);
                reader.readAsDataURL(blobInfo.blob());
              },
            }}
            value={content}
            onEditorChange={handleContentChange}
          />
        </div>
        {/* Category */}
        <div>
          <label className="block text-lg font-semibold">Category</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Enter category"
          />
        </div>
        {/* Tags */}
        <div>
          <label className="block text-lg font-semibold">Tags</label>
          <div className="w-full p-2 border rounded">
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-blue-200 text-blue-800 px-2 py-1 rounded-full text-sm cursor-pointer"
                  onClick={() => handleRemoveTag(tag)}
                >
                  {tag}
                </span>
              ))}
            </div>
            <input
              type="text"
              className="w-full mt-2 p-2 border-none outline-none"
              value={inputValue}
              placeholder="Type and press ',' or 'Enter'"
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
        </div>
        {/* Slug */}
        <div>
          <label className="block text-lg font-semibold">Slug</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="Enter custom slug (optional)"
          />
        </div>
        {/* Image Upload */}
        <div>
          <label className="block text-lg font-semibold">Image</label>
          <input
            type="file"
            accept="image/*"
            className="w-full p-2 border rounded"
            onChange={handleImageUpload}
          />
          {imageBase64 && (
            <div className="mt-2">
              <img
                src={imageBase64}
                alt="Selected"
                className="w-32 h-32 object-cover"
              />
            </div>
          )}
        </div>
        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full p-2 bg-blue-500 text-white rounded-lg"
          >
            Update Blog
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditBlog;
