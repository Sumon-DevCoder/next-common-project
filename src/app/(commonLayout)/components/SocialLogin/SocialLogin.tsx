/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Swal from "sweetalert2";
import { FaGoogle, FaFacebook, FaGithub } from "react-icons/fa";
import { signIn } from "next-auth/react";

const SocialLogin = () => {
  return (
    <div className="flex space-x-4 justify-center">
      <button
        onClick={() =>
          signIn("google", {
            callbackUrl: "http://localhost:3000/",
          })
        }
        className="flex items-center justify-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg shadow-md transform transition duration-200 hover:bg-red-500 hover:scale-105 focus:outline-none"
      >
        <FaGoogle className="text-white text-xl" />
        Google
      </button>

      <button
        onClick={() =>
          signIn("github", {
            callbackUrl: "http://localhost:3000/",
          })
        }
        className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-800 text-white rounded-lg shadow-md transform transition duration-200 hover:bg-gray-700 hover:scale-105 focus:outline-none"
      >
        <FaGithub className="text-white text-xl" />
        GitHub
      </button>

      <button
        onClick={() =>
          signIn("facebook", {
            callbackUrl: "http://localhost:3000/",
          })
        }
        className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-800 text-white rounded-lg shadow-md transform transition duration-200 hover:bg-blue-700 hover:scale-105 focus:outline-none"
      >
        <FaFacebook className="text-white text-xl" />
        Facebook
      </button>
    </div>
  );
};

export default SocialLogin;
