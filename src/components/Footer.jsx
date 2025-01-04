import React, { useState } from "react";
import { db } from "../db/database";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { toast } from "react-toastify";
function Footer() {
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubscribe = async () => {
    if (email.trim() === "") {
      toast.error("Please enter a valid email address.");
      return;
    }

    try {
      const docRef = await addDoc(collection(db, "subcribe"), {
        email,
        createdAt: Timestamp.fromDate(new Date()),
        status: "pending",
      });
      setSuccessMessage("Subscription successful!");
      setEmail(""); // Reset email field
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  return (
    <div className="w-full bg-white dark:bg-[#161617] rounded-lg p-4">
      <div className="grid md:grid-cols-3 grid-cols-1 gap-5 ">
        <div className="w-full bg-blue-100 dark:bg-[#1a1c2d] p-4 rounded-lg">
          <img
            src="https://demo.tmrwstudio.net/atlas/default/wp-content/uploads/sites/2/2023/10/atlas.png"
            alt=""
            className="w-20"
          />
          <p className="py-4 text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus
            totam deleniti voluptatem sunt nulla!
          </p>

          <div className="my-4">
            <div className="flex items-center gap-x-2">
              <i class="ri-phone-line"></i>
              <span>0968 384 643</span>
            </div>
            <div className="flex items-center gap-x-2">
              <i class="ri-mail-open-line"></i>
              <span>duongtrungkien.dev@gmail.com</span>
            </div>
          </div>
        </div>
        <div className="py-8 bg-white dark:bg-[#161617]">
          <h1 className="font-bold text-xl text-black dark:text-white">
            Popular
          </h1>
          <div className="mt-4 space-y-4">
            {[1, 2].map((item) => (
              <div key={item} className="flex w-full items-center gap-2">
                <div className="group w-40 h-20 rounded-lg overflow-hidden">
                  <img
                    src="https://cdn.dribbble.com/userupload/17576664/file/original-55a0466c68a41a29f48707fedd1a0fce.png?resize=2048x1536&vertical=center"
                    alt=""
                    className="h-full w-full flex-1 object-cover rounded-lg group-hover:scale-105 transition-transform"
                  />
                </div>
                <div className="w-full h-full">
                  <h1 className="text-blue-700 uppercase text-sm mt-2">
                    Style
                  </h1>
                  <h1 className="text-sm text-black py-2 font-semibold dark:text-white">
                    Winter Dressing Tips When It’s Really Cold Ou
                  </h1>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="py-8 bg-white rounded-lg dark:bg-[#161617]">
          <h1 className="font-bold text-xl text-black dark:text-white">
            Subcribe Us
          </h1>
          <p className="my-6 font-base text-sm">
            Get the latest creative news from Atlas magazine
          </p>
          <div className="flex flex-col gap-y-2 m-4 rounded-lg">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="py-2 px-2 border border-gray-100 rounded-lg"
            />
            <button
              onClick={handleSubscribe}
              className="py-2 px-4 rounded-lg bg-blue-600 text-white"
            >
              Sign up
            </button>
            {successMessage && (
              <p className="text-green-500 mt-2">{successMessage}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
