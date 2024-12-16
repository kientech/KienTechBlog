import React from "react";
import SlideComponent from "../components/Slides/SlideComponent";
import NewPostComponent from "../components/NewPost/NewPostComponent";
import SidebarComponent from "../components/Sidebar/SidebarComponent";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import useAuthStore from "../store/useAuthStore";

function HomePage() {
  const { user } = useAuthStore();
  console.log("🚀 ~ HomePage ~ user:", user);
  return (
    <div>
      <div className="slider">
        <SlideComponent />
      </div>
      <div>
        <NewPostComponent />
      </div>
      <div className="flex gap-x-8 mt-12">
        <div className="w-[70%]">
          <div>
            <div className="flex items-center justify-between">
              <h1 className="font-semibold text-black text-lg dark:text-white">
                Picked
              </h1>
              <div className="flex gap-x-2">
                <span className="px-2 py-1 rounded-lg bg-blue-100 text-sm">
                  Recent
                </span>
                <span className="px-2 py-1 rounded-lg bg-blue-500 text-sm text-white">
                  Popular
                </span>
              </div>
            </div>
            <div className="w-full h-[500px] my-4 flex gap-x-5">
              <div className="w-2/4 h-full relative">
                <div className="group w-full h-full rounded-xl overflow-hidden">
                  <img
                    src="https://cdn.dribbble.com/userupload/17576664/file/original-55a0466c68a41a29f48707fedd1a0fce.png?resize=2048x1536&vertical=center"
                    alt=""
                    className="block w-full h-full rounded-xl object-cover group-hover:scale-105 transition-all"
                  />
                </div>
                <div className="p-4 my-2 absolute bottom-0">
                  <h1 className="font-base uppercase text-lg text-white">
                    Style
                  </h1>
                  <h1 className="text-lg text-white py-2 font-semibold">
                    Winter Dressing Tips When It’s Really Cold Ou
                  </h1>
                  <div className="w-full mt-2 flex items-center gap-x-2">
                    <span className="font-base text-sm text-white">
                      Kien Trung
                    </span>
                    <span className="w-1 h-1 rounded-full bg-white"></span>
                    <span className="font-base text-sm text-white">
                      45 Minutes Ago
                    </span>
                  </div>
                </div>
              </div>
              <div className="w-2/4 flex flex-col justify-between px-4 py-2 bg-white dark:bg-[#161617] rounded-lg overflow-hidden">
                {[1, 2, 3, 4, 5].map((item) => (
                  <div key={item} className="flex w-full items-center gap-2">
                    <div className="group w-[120px] h-[90px] rounded-lg overflow-hidden">
                      <img
                        src="https://cdn.dribbble.com/userupload/17576664/file/original-55a0466c68a41a29f48707fedd1a0fce.png?resize=2048x1536&vertical=center"
                        alt=""
                        className="h-full w-full flex-1 object-cover rounded-lg group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="w-full h-full">
                      <h1 className="text-blue-700 uppercase text-[13px] mt-2">
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
          </div>
          <div className="w-full bg-white dark:bg-[#161617] p-4 rounded-lg my-8">
            <div className="flex items-center justify-between">
              <h1 className="font-semibold text-black text-lg dark:text-white">
                Latest
              </h1>
              <span className="capitalize text-sm text-gray-500">View all</span>
            </div>
            <div className="my-4 flex flex-col justify-between gap-y-5">
              {[1, 2, 3, 4, 5].map((item) => (
                <div
                  key={item}
                  className="flex items-center w-full h-[240px] gap-x-5"
                >
                  <div className="group w-full h-full rounded-xl overflow-hidden">
                    <img
                      src="https://cdn.dribbble.com/userupload/17576664/file/original-55a0466c68a41a29f48707fedd1a0fce.png?resize=2048x1536&vertical=center"
                      alt=""
                      className="block w-full h-full rounded-xl object-cover group-hover:scale-105 transition-all"
                    />
                  </div>
                  <div>
                    <span className="uppercase text-blue-500">Style</span>
                    <h1 className="my-2 text-black font-semibold text-lg dark:text-white">
                      Winter Dressing Tips When It’s Really Cold Out
                    </h1>
                    <p className="font-base text-sm my-2">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Necessitatibus accusamus aliquam, laboriosam, maiores
                      dignissimos provident{" "}
                    </p>
                    <div className="flex justify-between mt-4">
                      <div className="flex items-center gap-x-2">
                        <img
                          src="https://cdn.dribbble.com/userupload/14343695/file/original-81fbf310d7ed4ef94685ea05ee30117e.png?resize=1504x1128&vertical=center"
                          alt=""
                          className="w-12 h-12 object-cover rounded-full"
                        />
                        <div>
                          <h1 className="font-base text-md text-black dark:text-white">
                            Kien Trung
                          </h1>
                          <span className="font-base text-sm text-gray-500">
                            1 Year Ago
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-x-2">
                        <h1 className="font-base text-sm">1 Year Ago</h1>
                        <div className="h-[4px] w-[4px] rounded-full bg-black dark:bg-[#ccc]"></div>
                        <span className="text-blue-600 text-sm">
                          Keep Reading
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full bg-white dark:bg-[#161617] p-4 rounded-lg my-8">
            <div className="flex items-center justify-between">
              <h1 className="font-semibold text-black text-lg dark:text-white">
                Living
              </h1>
              <span className="capitalize text-sm text-gray-500">View all</span>
            </div>
            <div className="my-4">
              <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={20}
                slidesPerView={3}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
                loop={true}
                breakpoints={{
                  640: { slidesPerView: 1 },
                  768: { slidesPerView: 2 },
                  1024: { slidesPerView: 4 },
                }}
              >
                {[1, 2, 3, 4, 5, 6].map((item, index) => (
                  <SwiperSlide key={index}>
                    <div>
                      <div className="group w-full h-full rounded-xl overflow-hidden">
                        <img
                          src="https://cdn.dribbble.com/userupload/17576664/file/original-55a0466c68a41a29f48707fedd1a0fce.png?resize=2048x1536&vertical=center"
                          alt=""
                          className="block w-full h-full rounded-xl object-cover group-hover:scale-105 transition-all"
                        />
                      </div>
                      <div className="mt-2 mx-1">
                        <h3 className="uppercase text-blue-600 text-[11px]">
                          Living
                        </h3>
                        <h1 className="my-2 text-sm font-semibold dark:text-white">
                          Winter Dressing Tips When It’s Really Cold Out
                        </h1>
                        <div className="flex items-center gap-x-1">
                          <h1 className="text-[13px] dark:text-white">
                            Kien Trung
                          </h1>
                          <div className="w-[2px] h-[2px] rounded-full bg-black dark:bg-[#ccc]"></div>
                          <span className="text-[13px] capitalize">
                            1 Year ago
                          </span>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
          <div className="w-full  bg-white dark:bg-[#161617] p-4 rounded-lg my-8">
            <div className="flex items-center justify-between">
              <h1 className="font-semibold text-black text-lg dark:text-white">
                Latest
              </h1>
              <span className="capitalize text-sm text-gray-500">View all</span>
            </div>
            <div className="grid grid-cols-2 gap-3 bg-white dark:bg-[#161617] w-full h-full mt-4">
              {[1, 2].map((item) => (
                <div className="bg-white w-full h-full dark:bg-[#161617]">
                  <div className="group w-full h-[300px] rounded-xl overflow-hidden">
                    <img
                      src="https://cdn.dribbble.com/userupload/17576664/file/original-55a0466c68a41a29f48707fedd1a0fce.png?resize=2048x1536&vertical=center"
                      alt=""
                      className="block w-full h-full rounded-xl object-cover group-hover:scale-105 transition-all"
                    />
                  </div>
                  <div className="p-2">
                    <span className="uppercase">Style</span>
                    <h1 className="my-2 text-black font-semibold text-lg dark:text-white">
                      Winter Dressing Tips When It's Really Cold Out
                    </h1>
                    <div className="flex items-center gap-x-1">
                      <h1 className="text-md">Kien Trung</h1>
                      <div className="w-[2px] h-[2px] rounded-full bg-black"></div>
                      <span className="text-md capitalize">1 Year ago</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-y-2">
              {[1, 2, 3, 4].map((item) => (
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
                    <h1 className="text-md text-black py-2 font-semibold dark:text-white">
                      Winter Dressing Tips When It’s Really Cold Ou
                    </h1>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="w-[30%]">
          <SidebarComponent />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
