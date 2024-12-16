import React from "react";

const SlideItem = ({ score, title, image, postTimeAlgo }) => {
  return (
    <div className="flex items-center gap-4 bg-transparent text-white py-8 px-4 rounded-lg">
      <div className="relative">
        <img
          src={image}
          alt={title}
          className="w-24 h-24 rounded-full object-cover"
        />
        {score && (
          <div className="absolute top-0 left-0 bg-green-500 text-white text-sm font-bold px-1 py-1 rounded-md">
            <span className="text-sm font-base">{score}</span>
          </div>
        )}
      </div>
      <div className="flex-1">
        <h3 className="text-[#000] dark:text-white font-semibold text-[13px]">
          {title}
        </h3>
        <p className="text-sm text-gray-400 mt-2">{postTimeAlgo}</p>
      </div>
    </div>
  );
};

export default SlideItem;
