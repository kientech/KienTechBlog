import React from "react";

const SlideItem = ({ score, title, image, postTimeAlgo }) => {
  return (
    <div className="flex items-center gap-4 bg-transparent text-white md:py-8 md:px-4 py-4 px-2 rounded-lg">
      <div className="relative">
        <img
          src={image}
          alt={title}
          className="md:w-24 md:h-24 h-12 w-12 rounded-full object-cover"
        />
        {score && (
          <div className="absolute top-0 left-0 bg-green-500 text-white text-sm font-bold md:px-1 md:py-1 py-[0.5] px-[0.5] rounded-md">
            <span className="md:text-sm text-[10px] font-base">{score}</span>
          </div>
        )}
      </div>
      <div className="flex-1">
        <h3 className="text-[#000] dark:text-white font-semibold md:text-[13px] text-[10px]">
          {title}
        </h3>
        <p className="md:text-sm text-[10px] text-gray-400 mt-2">{postTimeAlgo}</p>
      </div>
    </div>
  );
};

export default SlideItem;
