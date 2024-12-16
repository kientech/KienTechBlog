import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import SidebarComponent from "../components/Sidebar/SidebarComponent";
import { db } from "../db/database";

function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addDoc(collection(db, "contact"), {
        ...formData,
        status: "pending",
        createdAt: new Date(),
      });

      setSuccessMessage("Your message has been sent successfully!");
      setFormData({
        fullName: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Error adding document: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-x-5 my-8">
      {/* Form Section */}
      <div className="w-[70%] h-full bg-white dark:bg-[#161617] p-4 rounded-lg ">
        <h1 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
          Contact Us
        </h1>
        <p className="bg-white dark:bg-[#161617] text-sm mb-8">
          Asteroids have us in our sight. The dinosaurs didn’t have a space
          program, so they’re not here to talk about this problem. We are, and
          we have the power to do something about it. I don’t want to be the
          embarrassment of the galaxy, to have had the power to deflect an
          asteroid, and then not, and end up going extinct.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="block font-base text-sm text-gray-700 dark:text-gray-300 mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-lg bg-white dark:bg-[#262626] text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600"
              placeholder="Enter your full name"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block font-base text-sm text-gray-700 dark:text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-lg bg-white dark:bg-[#262626] text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Subject */}
          <div>
            <label className="block font-base text-sm text-gray-700 dark:text-gray-300 mb-1">
              Subject
            </label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-lg bg-white dark:bg-[#262626] text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600"
              placeholder="Enter subject"
              required
            />
          </div>

          {/* Message */}
          <div>
            <label className="block font-base text-sm text-gray-700 dark:text-gray-300 mb-1">
              Your Message
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-lg bg-white dark:bg-[#262626] text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600"
              rows="5"
              placeholder="Enter your message"
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>

        {/* Success Message */}
        {successMessage && (
          <p className="mt-4 text-green-600 font-medium dark:text-green-400">
            {successMessage}
          </p>
        )}
      </div>

      {/* Sidebar Section */}
      <div className="w-[30%]">
        <SidebarComponent />
      </div>
    </div>
  );
}

export default ContactPage;
