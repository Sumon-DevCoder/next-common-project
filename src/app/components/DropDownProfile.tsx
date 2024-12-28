/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import Link from "next/link";
import { logout } from "@/redux/features/auth/authSlice";
import { FaSignInAlt, FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import PrimaryButton from "./PrimaryButton";
import useCurrentUserData from "../../hooks/useCurrentUserInfoData";
import { toast } from "sonner";
import { useAppDispatch } from "@/redux/hooks";
import useCurrentUserInfo from "@/hooks/useCurrentUserInfo";
import { MdDashboard } from "react-icons/md";
import { AiFillProfile } from "react-icons/ai";

const DropDownProfile = () => {
  const { user, refetch } = useCurrentUserData();
  const { role } = useCurrentUserInfo();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    refetch();
  }, [refetch]);

  console.log("user", user);

  // toggle
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleLogout = async () => {
    try {
      dispatch(logout());
      toast.success("Logout Successful");
    } catch (err: any) {
      toast.error("Logout Failed. Please try again.");
    }
  };

  return (
    <div className="relative pr-2 md:pr-0">
      {user ? (
        <>
          <button onClick={toggleDropdown}>
            <div className="avatar flex justify-center w-10 h-10 md:w-11 md:h-11">
              {user?.img ? (
                <img
                  src={user?.img}
                  alt="User image"
                  className="rounded-full"
                />
              ) : (
                <img
                  src="https://i.ibb.co/j8KxL3f/blank-profile-picture-973460-640.png"
                  alt="Default Avatar"
                  className="rounded-full"
                />
              )}
            </div>
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 min-w-60 bg-white rounded shadow-lg">
              <Link
                href="/dashboard"
                className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100"
              >
                <FaUserCircle className="mr-2" />
                {user?.name}
              </Link>
              {role === "admin" ? (
                <Link
                  href="/admin-dashboard"
                  className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  <MdDashboard className="mr-2" />
                  Dashboard
                </Link>
              ) : (
                <Link
                  href="/dashboard/user-profile"
                  className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  <AiFillProfile className="mr-2" />
                  Profile
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="flex items-center w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
              >
                <FaSignOutAlt className="mr-2" />
                Logout
              </button>
            </div>
          )}
        </>
      ) : (
        <PrimaryButton
          path="/login"
          name="Login"
          icons={<FaSignInAlt className="mr-2" />}
        />
      )}
    </div>
  );
};

export default DropDownProfile;
