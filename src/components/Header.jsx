import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import { Link, NavLink, useNavigate } from "react-router-dom";
import useRealtimeDate from "../hooks/useRealtimeData";
import React, { useState, useEffect } from "react";
import searchPosts from "../utils/searchPosts";
import useAuthStore from "../store/useAuthStore";
import { toast } from "react-toastify";

const navigation = [
  {
    id: 1,
    name: "Home",
    to: "/",
  },
  {
    id: 2,
    name: "About Us",
    to: "/about-us",
  },
  {
    id: 3,
    name: "Machine Learning",
    to: "/blogs/category/machine-learning",
  },
  {
    id: 4,
    name: "Deep Learning",
    to: "/blogs/category/deep-learning",
  },
  {
    id: 5,
    name: "AI",
    to: "/blogs/category/ai",
  },
  {
    id: 6,
    name: "Embedded",
    to: "/blogs/category/embedded",
  },
  {
    id: 7,
    name: "Contact",
    to: "/contact",
  },
];

function Header({ toggleTheme, theme }) {
  const { user, logout } = useAuthStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  console.log("🚀 ~ Header ~ searchResults:", searchResults);
  const navigate = useNavigate();
  const { day, month, year } = useRealtimeDate();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSignOut = () => {
    logout();
    toast.success("Logout Success");
  };

  const handleSearch = async () => {
    if (searchQuery) {
      const results = await searchPosts(searchQuery);
      setSearchResults(results);
      navigate(`/blogs/search-results?query=${searchQuery}`); // Điều hướng đến trang kết quả tìm kiếm
    }
  };

  // search modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="sticky top-0 left-0 right-0 z-10">
      <div className="dark:bg-[#161617] px-4 rounded-md w-full h-[80px] bg-white flex items-center justify-between">
        <Link to={"/"}>
          {theme === "light" ? (
            <img
              src="https://demo.tmrwstudio.net/atlas/default/wp-content/uploads/sites/2/2023/10/atlas.png"
              className=""
              loading="lazy"
              alt=""
            />
          ) : (
            <img
              src="https://demo.tmrwstudio.net/atlas/default/wp-content/uploads/sites/2/2023/10/atlas-light.png"
              className=""
              loading="lazy"
              alt=""
            />
          )}
        </Link>
        <div className="flex items-center space-x-4">
          {navigation &&
            navigation.map((item) => (
              <NavLink
                key={item.id}
                to={item.to}
                className="relative text-black dark:text-white text-md group"
              >
                {item.name}
                {/* Line animation */}
                <span className="absolute left-0 -bottom-7 h-[2px] w-0 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
              </NavLink>
            ))}
        </div>

        <div>
          <div className="flex items-center space-x-2">
            <button onClick={openModal} className="p-2">
              <MagnifyingGlassIcon className="h-6 w-6 text-blac dark:text-white" />
            </button>
            <label className="swap swap-rotate ">
              <input
                type="checkbox"
                checked={theme === "dark"}
                onChange={toggleTheme}
              />

              {/* sun icon */}
              <svg
                className="swap-off h-6 w-6 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
              </svg>

              {/* moon icon */}
              <svg
                className="swap-on h-6 w-6 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fontSize={12}
              >
                <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
              </svg>
            </label>

            <div className="w-[1px] h-[40px] bg-[#ccc] dark:bg-[white]"></div>

            <div className="flex items-center gap-x-2">
              <h1 className="font-semibold text-4xl text-black dark:text-white">
                {day}
              </h1>
              <div>
                <p className="block text-sm">{month}</p>
                <p className="block text-sm">{year}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full">
              {/* Modal Header */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Search</h2>
                <button onClick={closeModal} className="text-gray-500">
                  ✕
                </button>
              </div>

              <div>
                {/* Search Input */}
                <input
                  type="text"
                  placeholder="Type to search..."
                  className="w-full border border-gray-300 rounded-lg p-2"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                  className="mt-2 p-2 bg-blue-500 text-white rounded-lg"
                  onClick={handleSearch}
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="flex justify-between">
        <div className="bottom_header bg-[#e7ebf7] dark:bg-[#1f212d] max-w-[460px] h-[40px] rounded-md flex items-center gap-x-2 px-4">
          <h1 className="uppercase text-[12px] text-blue-600">Style</h1>
          <img
            src="https://demo.tmrwstudio.net/atlas/default/wp-content/uploads/sites/2/2023/09/a12-30x30.jpeg"
            className="rounded-full mx-2"
            alt="Style"
          />
          <div>
            <h1 className="text-sm font-semibold relative group dark:text-white">
              Winter Dressing Tips When It’s Really Cold Out
            </h1>
            <span className="absolute left-0 -bottom-7 h-[2px] w-0 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
          </div>
        </div>
        <div className="w-[300px] bg-white dark:bg-[#161617] rounded-lg">
          {user ? (
            <>
              <div
                className="flex items-center gap-x-2 p-2 rounded-lg cursor-pointer"
                onClick={toggleDropdown}
              >
                <img
                  src="https://cdn.dribbble.com/users/1355613/screenshots/15594500/media/aea41a7cf22d09be0bb41afa85be2f5e.jpg?resize=1600x1200&vertical=center"
                  alt=""
                  className="w-12 h-12 object-cover rounded-full"
                />
                <h1 className="dark:text-white">
                  Hello,{" "}
                  <span className="font-semibold text-blue-600">
                    {user.displayName}
                  </span>
                </h1>
                <i class="ri-arrow-down-s-line"></i>
              </div>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-10">
                  <ul>
                    {user.email === "admin@gmail.com" ? (
                      <Link to={'/admin/dashboard'} className="block px-4 py-2 hover:bg-gray-100 cursor-pointer rounded-lg">
                        Admin Panel
                      </Link>
                    ) : (
                      ""
                    )}
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer rounded-lg">
                      Profile
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer rounded-lg">
                      Settings
                    </li>
                    <li
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer rounded-lg text-red-500"
                      onClick={handleSignOut}
                    >
                      Logout
                    </li>
                  </ul>
                </div>
              )}
            </>
          ) : (
            <div className="flex items-center justify-around gap-x-2 p-2 rounded-lg cursor-pointer">
              <Link
                to={"/login"}
                className="px-4 py-2  text-black rounded-lg float-right hover:text-blue-500 transition-all"
              >
                Sign in
              </Link>
              <Link
                to={"/register"}
                className="px-8 py-2 bg-blue-400 text-white rounded-lg float-right"
              >
                Sign up
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
