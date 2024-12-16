import React, { useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db, storage } from "../../db/database";
import { toast } from "react-toastify";
import useAuthStore from "../../store/useAuthStore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const categoryOptions = [
  "Web Development",
  "Mobile App Development",
  "Software Engineering",
  "Cloud Computing",
  "Open Source Technologies",
  "Programming Languages",
  "DevOps",
  "API Development",
  "Backend Development",
  "Frontend Development",
  "Natural Language Processing",
  "Computer Vision",
  "Reinforcement Learning",
  "Robotics and Automation",
  "Neural Networks",
  "Predictive Analytics",
  "Deep Learning",
  "AI Ethics",
  "Conversational AI",
  "Machine Learning Frameworks",
  "Big Data",
  "Data Visualization",
  "Business Intelligence",
  "Statistical Modeling",
  "Data Engineering",
  "Data Cleaning",
  "Database Management",
  "Data Warehousing",
  "Real-Time Analytics",
  "Data Privacy",
  "Cybersecurity",
  "Network Administration",
  "Cryptography",
  "Ethical Hacking",
  "Penetration Testing",
  "Internet of Things (IoT) Security",
  "Cloud Security",
  "Firewalls and VPNs",
  "Incident Response",
  "Secure Software Development",
  "Blockchain",
  "Cryptocurrency",
  "Web3",
  "Quantum Computing",
  "Augmented Reality (AR)",
  "Virtual Reality (VR)",
  "Mixed Reality",
  "Edge Computing",
  "5G Technology",
  "Digital Twins",
  "Embedded Systems",
  "Internet of Things (IoT)",
  "Microcontrollers",
  "Wearable Technology",
  "Semiconductor Technology",
  "Chip Design",
  "Computer Architecture",
  "Hardware Prototyping",
  "Autonomous Systems",
  "Drones",
  "Game Development",
  "Game Engines",
  "Esports Technology",
  "Gaming Graphics",
  "Virtual Worlds",
  "3D Modeling",
  "Streaming Platforms",
  "Motion Capture",
  "Sound Engineering in Games",
  "AI in Gaming",
  "SaaS (Software as a Service)",
  "E-commerce Platforms",
  "Fintech",
  "Martech",
  "CRM Systems",
  "Enterprise Software",
  "ERP Systems",
  "Technology Consulting",
  "EdTech",
  "HealthTech",
  "Renewable Energy Technology",
  "Energy Management Systems",
  "Smart Grids",
  "Sustainable Computing",
  "Environmental Monitoring",
  "Clean Technology",
  "Green Software Development",
  "Waste Management Technology",
  "Electric Vehicles",
  "Carbon Capture Technology",
  "Technology Startups",
  "Scientific Computing",
  "High-Performance Computing",
  "Research Tools and Platforms",
  "Human-Computer Interaction",
  "Bioinformatics",
  "Computational Chemistry",
  "Space Technology",
  "Technology Ethics",
  "Technology Policy and Governance",
];

function CreateBlog() {
  const { user } = useAuthStore();
  const [title, setTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [slug, setSlug] = useState("");
  const [isScheduled, setIsScheduled] = useState(false); // Trạng thái checkbox
  const [scheduledTime, setScheduledTime] = useState(""); // Thời gian lên lịch
  const [imageBase64, setImageBase64] = useState(""); // State để lưu ảnh base64
  const [videoURL, setVideoURL] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
  };

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
    setLoading(true);
    let videoLink = videoURL;

    // Nếu người dùng tải video lên từ local
    if (file) {
      const storageRef = ref(storage, `videos/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          console.error("Error uploading file:", error);
          setLoading(false);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          videoLink = downloadURL; // Lấy URL video đã tải lên
        }
      );
    }

    try {
      await addDoc(collection(db, "blogs"), {
        title,
        shortDescription,
        content,
        slug,
        author: user.uid,
        category,
        tags,
        image:
          imageBase64 ||
          "https://cdn.dribbble.com/userupload/7730730/file/original-4e6602e8d4b3b2b49133e316fd9c4d5f.png?resize=1504x1128&vertical=center",
        videoURL: videoLink,
        scheduledTime: scheduledTime
          ? Timestamp.fromDate(new Date(scheduledTime))
          : null,
        createdAt: Timestamp.fromDate(new Date()),
        isDeleted: false,
        status: "pending",
      });

      toast.success("Blog created successfully!");
      setTitle("");
      setShortDescription("");
      setContent("");
      setCategory("");
      setTags([]);
      setInputValue("");
      setSlug("");
      setImageBase64(""); // Reset image
      setFile("");
      setLoading(false);
    } catch (error) {
      console.error("Error adding document: ", error);
      toast.error("Failed to create blog. Try again later.");
      setLoading(false);
    }
  };

  return (
    <div className="w-full mx-auto p-4 bg-white rounded-md">
      <h1 className="text-2xl font-bold mb-4">Create Blog</h1>
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
            onEditorChange={handleContentChange}
          />
        </div>
        {/* Category */}
        <div>
          <label htmlFor="category" className="block mb-2 font-bold">
            Select Category
          </label>
          <input
            list="categories"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Search or select a category"
            className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
          />
          <datalist id="categories">
            {categoryOptions.map((cat, index) => (
              <option key={index} value={cat} />
            ))}
          </datalist>
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
                alt="uploaded preview"
                className="max-w-xs h-auto"
              />
            </div>
          )}
        </div>

        {/* Checkbox Lên lịch */}
        <div>
          <label className="block text-lg font-semibold">
            <input
              type="checkbox"
              className="mr-2"
              checked={isScheduled}
              onChange={(e) => setIsScheduled(e.target.checked)}
            />
            Schedule this post
          </label>
        </div>

        {/* Input thời gian lên lịch (chỉ hiển thị khi chọn checkbox) */}
        {isScheduled && (
          <div>
            <label className="block text-lg font-semibold">
              Schedule Publish
            </label>
            <input
              type="datetime-local"
              className="w-full p-2 border rounded"
              value={scheduledTime}
              onChange={(e) => setScheduledTime(e.target.value)}
            />
          </div>
        )}

        <div>
          <label htmlFor="videoURL">Video URL</label>
          <input
            type="url"
            id="videoURL"
            placeholder="Paste video URL (YouTube, Vimeo, etc.)"
            value={videoURL}
            onChange={(e) => setVideoURL(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="videoUpload">Or Upload Video</label>
          <input type="file" id="videoUpload" onChange={handleFileChange} />
        </div>
        {/* Submit */}
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? (
            <div className="flex justify-center items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
            </div>
          ) : (
            <span>Submit</span>
          )}
        </button>
      </form>
    </div>
  );
}

export default CreateBlog;
