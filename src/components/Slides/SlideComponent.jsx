import SlideItem from "./SlideItem";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

function SlideComponent() {
  return (
    <div className="bg-white w-full dark:bg-[#161617] rounded-lg my-6">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={3}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 4 },
        }}
      >
        {[1, 2, 3, 4, 5].map((item, index) => (
          <SwiperSlide key={index}>
            <SlideItem
              score={4.5}
              image={
                "https://cdn.dribbble.com/users/1355613/screenshots/15594500/media/aea41a7cf22d09be0bb41afa85be2f5e.jpg?resize=1600x1200&vertical=center"
              }
              title={"Winter Dressing Tips When It’s Really Cold Out"}
              postTimeAlgo={"1 Year Ago"}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default SlideComponent;
