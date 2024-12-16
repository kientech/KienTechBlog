import React from "react";

function NewPostComponent() {
  return (
    <div className="flex gap-5 items-center justify-between w-full h-[540px]">
      <div className="w-1/4 h-full flex flex-col gap-y-4">
        {[1, 2].map((item) => (
          <div className="group w-full h-2/4 rounded-xl overflow-hidden relative">
            <img
              src="https://cdn.dribbble.com/userupload/4005869/file/original-ad5ae66db7ad979d6b2d6cd452084bee.jpg?resize=1504x1074&vertical=center"
              className="w-full h-full rounded-xl object-cover group-hover:scale-105 transition-all"
              alt="TittleName"
            />
            <div className="absolute inset-0 bg-black bg-opacity-10 group-hover:bg-opacity-0 transition-all duration-300"></div>
            <div className="absolute bottom-0 p-4 my-2">
              <span className="uppercase text-white z-100 text-sm font-semibold mb-2 block">
                Style
              </span>
              <h1 className="text-md text-white font-semibold">
                Winter Dressing Tips When It’s Really Cold Ou
              </h1>
              <div className="w-full mt-2 flex items-center gap-x-2">
                <span className="font-base text-sm text-white">Kien Trung</span>
                <span className="w-1 h-1 rounded-full bg-white"></span>
                <span className="font-base text-sm text-white">
                  45 Minutes Ago
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="w-2/4 h-full">
        <div className="group w-full h-full rounded-xl overflow-hidden relative">
          <img
            src="https://cdn.dribbble.com/userupload/12402324/file/original-74d9a28a6dd1c99c8dbd934817920892.png?resize=2048x1536&vertical=center"
            className="w-full h-full rounded-xl object-cover group-hover:scale-105 transition-all"
            alt="TittleName"
          />
          <div className="absolute inset-0 bg-black bg-opacity-10 group-hover:bg-opacity-0 transition-all duration-300"></div>
          <div className="absolute bottom-0 p-8 my-2">
            <span className="inline-block uppercase text-white z-100 text-sm font-semibold mb-4   py-2 px-4 bg-red-500 rounded-lg">
              Style
            </span>
            <h1 className="text-xl text-white font-semibold">
              Winter Dressing Tips When It’s Really Cold Ou
            </h1>
            <div className="w-full mt-4 flex items-center gap-x-2">
              <span className="font-base text-sm text-white">Kien Trung</span>
              <span className="w-1 h-1 rounded-full bg-white"></span>
              <span className="font-base text-sm text-white">
                45 Minutes Ago
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="w-1/4 h-full flex flex-col gap-y-4">
        {[1, 2].map((item) => (
          <div className="group w-full h-2/4 rounded-xl overflow-hidden relative">
            <img
              src="https://cdn.dribbble.com/userupload/12402324/file/original-74d9a28a6dd1c99c8dbd934817920892.png?resize=2048x1536&vertical=center"
              className="w-full h-full rounded-xl object-cover group-hover:scale-105 transition-all"
              alt="TittleName"
            />
            <div className="absolute inset-0 bg-black bg-opacity-10 group-hover:bg-opacity-0 transition-all duration-300"></div>
            <div className="absolute bottom-0 p-4 my-2">
              <span className="uppercase text-white z-100 text-sm font-semibold mb-2 block">
                Style
              </span>
              <h1 className="text-md text-white font-semibold">
                Winter Dressing Tips When It’s Really Cold Ou
              </h1>
              <div className="w-full mt-2 flex items-center gap-x-2">
                <span className="font-base text-sm text-white">Kien Trung</span>
                <span className="w-1 h-1 rounded-full bg-white"></span>
                <span className="font-base text-sm text-white">
                  45 Minutes Ago
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NewPostComponent;
