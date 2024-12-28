/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import useCurrentUserInfo from "../../../../../hooks/useCurrentUserInfo";
import useDarkMode from "@/hooks/useDarkMode";
import DropDownProfile from "@/app/components/DropDownProfile";
import PrimaryButton from "@/app/components/PrimaryButton";
import { FaSignInAlt } from "react-icons/fa";
import useNavLinks from "@/hooks/useNavLinks";
import BrandLogo from "@/app/components/BrandLogo";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { email } = useCurrentUserInfo();
  const [isDarkMode, toggleDarkMode] = useDarkMode();
  const Links = useNavLinks();

  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="sticky top-0 z-50 ">
      <div className="navbar md:px-5 h-6 md:h-10 text-white dark:bg-gray-800 bg-[#F3F4F6] shadow-sm">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost lg:hidden"
              onClick={handleToggleMenu}
            >
              {isMenuOpen ? (
                // Close Icon
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 dark:text-white text-black"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                // Menu Icon
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 dark:text-white text-black"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              )}
            </div>
            {/* small navlinks */}
            {isMenuOpen && (
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-gray-50 dark:bg-gray-600  rounded-box z-[1] mt-3 w-52 p-2  gap-1 shadow-lg"
              >
                {Links}
              </ul>
            )}
          </div>
          {/* brand logo */}
          <BrandLogo />
        </div>
        {/* lg navlink */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 font-semibold text-base">
            {Links}
          </ul>
        </div>

        <div className="navbar-end space-x-4 cursor-pointer">
          {/* dark mode setup  */}
          <input
            type="checkbox"
            className="peer sr-only opacity-0"
            id="toggleDarkMode"
          />
          <label
            htmlFor="toggleDarkMode"
            onClick={toggleDarkMode}
            className="relative flex h-6 w-11 cursor-pointer items-center rounded-full bg-gray-400 px-0.5 outline-gray-400 transition-colors before:h-5 before:w-5 before:rounded-full before:bg-white before:shadow before:transition-transform before:duration-300 peer-checked:bg-green-500 peer-checked:before:translate-x-full peer-focus-visible:outline peer-focus-visible:outline-offset-2 peer-focus-visible:outline-gray-400 peer-checked:peer-focus-visible:outline-green-500"
          >
            <span className="sr-only">Enable</span>
          </label>

          {email ? (
            <DropDownProfile />
          ) : (
            <PrimaryButton
              path="/login"
              name="Login"
              icons={<FaSignInAlt className="mr-2" />}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
