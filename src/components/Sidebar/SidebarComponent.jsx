import React from "react";
import "remixicon/fonts/remixicon.css";

function SidebarComponent() {
  return (
    <div className="w-full h-full">
      <div className="p-6 rounded-lg bg-white dark:bg-[#161617]">
        <div className="flex items-center justify-between">
          <h1 className="font-semibold text-black text-md dark:text-white">
            Picked
          </h1>
          <span className="text-sm text-gray-500">View all</span>
        </div>
        <div className="flex flex-col gap-y-4 mt-4">
          {[1, 2, 3].map((item) => (
            <div key={item} className="flex items-center gap-x-5 h-[70px] ">
              <img
                src="https://demo.tmrwstudio.net/atlas/default/wp-content/uploads/sites/2/2023/09/a12.jpeg"
                alt=""
                className="h-[70px] w-[90px] object-cover rounded-lg"
              />
              <div className="w-full ">
                <h1 className="font-semibold text-black text-sm dark:text-white">
                  Winter Dressing Tips When It’s Really Cold Out
                </h1>
                <span className="capitalize text-gray-600 mt-2 text-[13px] dark:text-gray-100">
                  1 year ago
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* categories */}
      <div className="my-8 p">
        <h1 className="font-semibold text-black text-md dark:text-white">
          Categories
        </h1>

        <div className="flex flex-col gap-y-4 my-4">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="relative group w-full h-[70px] rounded-lg overflow-hidden"
            >
              <img
                src="https://demo.tmrwstudio.net/atlas/default/wp-content/uploads/sites/2/2023/09/a14-480x320.jpeg"
                className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-all "
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-0 transition-all duration-300 rounded-lg"></div>
              <div className="w-full absolute flex items-center justify-between top-2/4 -translate-y-2/4 px-6">
                <h1 className="font-semibold text-[#dbded9]">Style</h1>
                <span
                  className="px-2 text-white py-1 rounded-md"
                  style={{ backgroundColor: "rgba(255, 255, 255, 0.3)" }}
                >
                  9
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-6 rounded-lg bg-white dark:bg-[#161617]">
        <div className="flex items-center justify-between">
          <h1 className="font-semibold text-black text-md dark:text-white">
            Gadget
          </h1>
          <span className="text-sm text-gray-500">View all</span>
        </div>
        <div className="flex flex-col gap-y-4 mt-4">
          {[1, 2, 3].map((item) => (
            <>
              <div key={item} className="flex  gap-x-5 h-[70px] ">
                <h1 className="font-bold text-lg text-gray-400">01</h1>
                <div className="w-full ">
                  <h1 className="font-semibold text-black text-sm dark:text-white">
                    Winter Dressing Tips When It’s Really Cold Out
                  </h1>
                  <span className="capitalize text-gray-600 mt-2 text-[13px]">
                    1 year ago
                  </span>
                </div>
              </div>
              <div className="w-full h-[1px] bg-gray-300"></div>
            </>
          ))}
        </div>
      </div>

      {/* join us */}
      <div className="p-6 rounded-lg bg-white my-8 dark:bg-[#161617]">
        <h1 className="font-semibold text-black text-md dark:text-white">
          Join Us
        </h1>
        <div>
          <div className="flex items-center gap-x-6 justify-between w-full">
            <div className="my-4 flex gap-x-2 items-center w-2/4">
              <div className="py-2 px-4 bg-gradient-to-r from-blue-800 to-blue-400 w-[50px] rounded-lg">
                <i className="ri-facebook-line font-bold text-white"></i>
              </div>
              <div>
                <h1 className="font-[500] text-black text-sm dark:text-white">
                  Facebook
                </h1>
                <span className="font-base text-[13px]">26K</span>
              </div>
            </div>
            <div className="my-4 flex gap-x-2 items-center w-2/4 ">
              <div className="py-2 px-4 bg-gradient-to-r from-[#38bdf8] to-[#bae6fd] w-[50px] rounded-lg">
                <i className="ri-twitter-x-line font-bold text-white"></i>
              </div>
              <div>
                <h1 className="font-[500] text-black text-sm dark:text-white">
                  Twitter
                </h1>
                <span className="font-base text-[13px]">28K</span>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="flex items-center gap-x-6 justify-between w-full">
            <div className="my-4 flex gap-x-2 items-center w-2/4">
              <div className="py-2 px-4 bg-gradient-to-b from-[#ef4444] to-[#facc15] w-[50px] rounded-lg">
                <i className="ri-instagram-line font-bold text-white"></i>
              </div>
              <div>
                <h1 className="font-[500] text-black text-sm dark:text-white">
                  Instagram
                </h1>
                <span className="font-base text-[13px]">26K</span>
              </div>
            </div>
            <div className="my-4 flex gap-x-2 items-center w-2/4">
              <div className="py-2 px-4 bg-gradient-to-r from-[#ef4444] to-[#f87171] w-[50px] rounded-lg">
                <i className="ri-youtube-line font-bold text-white"></i>
              </div>
              <div>
                <h1 className="font-[500] text-black text-sm dark:text-white">
                  Youtube
                </h1>
                <span className="font-base text-[13px]">28K</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SidebarComponent;
