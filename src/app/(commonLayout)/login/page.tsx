"use client";

/* eslint-disable @typescript-eslint/no-unused-vars */
import { authApi } from "@/redux/features/auth/authApi";
import { setUser, TUser } from "@/redux/features/auth/authSlice";
import { verifyToken } from "@/utils/verifyToken";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { TError } from "@/types/gobal";
import Link from "next/link";
import SocialLogin from "../components/SocialLogin/SocialLogin";
import useCurrentUserInfo from "@/hooks/useCurrentUserInfo";

const Login = () => {
  const dispatch = useDispatch();
  const [activeRole, setActiveRole] = useState<string | null>("admin");
  const pathname = usePathname();
  const { role } = useCurrentUserInfo();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loginUser] = authApi.useLoginUserMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      email: "mustafiz247@gmail.com",
      password: "Mustafiz247@",
    },
  });
  const [showPassword, setShowPassword] = useState(false);

  // handle default value
  const handleDefaultValueChange = (role: string) => {
    setActiveRole(role);
    const newValues =
      role === "admin"
        ? { email: "mustafiz247@gmail.com", password: "Mustafiz247@" }
        : { email: "sumon2@gmail.com", password: "Sumon2@" };

    reset(newValues);
  };

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Logging in");

    try {
      const userInfo = {
        email: data.email,
        password: data.password,
      };

      // Call the login mutation
      const res = await loginUser(userInfo).unwrap();

      console.log("res", res);

      // redirect path
      // const from = searchParams.get("from") || "/";

      if (res) {
        const user = verifyToken(res?.token) as TUser; // set user in store
        const BearerToken = `Bearer ${res?.token}`;

        dispatch(setUser({ user: user, token: BearerToken })); // set token in store

        // success
        toast.success("Login Successful", { id: toastId, duration: 3000 });
        router.push(`/${user?.role}-dashboard`);
      }
    } catch (err) {
      const serverMsgErr =
        (err as TError)?.data?.message || "Something went wrong";

      if (serverMsgErr) {
        return toast.error(serverMsgErr, {
          id: toastId,
          duration: 3000,
        });
      } else if (err) {
        return toast.error("Something went wrong", {
          id: toastId,
          duration: 2000,
        });
      }
    }
  };

  return (
    <div className="mx-auto">
      <div className="flex justify-center px-6 py-12">
        <div className="w-full xl:w-3/4 lg:w-11/12 flex justify-center">
          <div className="w-full lg:w-7/12 shadow-xl bg-gray-100 dark:bg-gray-800 p-5 rounded-lg lg:rounded-l-none">
            <h3 className="py-4 text-2xl text-center text-gray-800 dark:text-white">
              Login to Your Account
            </h3>

            <div className="text-center space-x-2">
              <button
                onClick={() => handleDefaultValueChange("admin")}
                className={`btn btn-sm btn-outline  ${
                  activeRole === "admin"
                    ? "btn-active bg-blue-500 text-white dark:text-blue-400"
                    : "text-gray-800 dark:text-white"
                }`}
              >
                Admin Credentials
              </button>
              <button
                onClick={() => handleDefaultValueChange("user")}
                className={`btn btn-sm btn-outline ${
                  activeRole === "user"
                    ? "btn-active bg-blue-500 text-white dark:text-blue-400"
                    : "text-gray-800 dark:text-white"
                }`}
              >
                User Credentials
              </button>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="px-8 pt-6 pb-8 mb-4 bg-gray-100 dark:bg-gray-800 rounded"
            >
              <div className="mb-4">
                <label
                  className="block mb-2 text-sm font-bold text-gray-700 dark:text-white"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="w-full px-3 py-2 text-sm leading-tight  text-black  rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  placeholder="Enter Email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email format",
                    },
                  })}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm ml-2 mt-1">
                    {errors.email.message as string}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label
                  className="block mb-2 text-sm font-bold text-gray-700 dark:text-white"
                  htmlFor="password"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700  border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter Password"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters long",
                      },
                    })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute top-2 right-0 flex items-center px-3 text-gray-500 focus:outline-none"
                  >
                    {showPassword ? (
                      <HiEyeOff className="text-xl" />
                    ) : (
                      <HiEye className="text-xl" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm ml-2 mt-1">
                    {errors.password.message as string}
                  </p>
                )}
              </div>

              <div className="mb-6 text-center">
                <button
                  className="w-full px-4 py-2 font-semibold text-white bg-blue-500 hover:bg-blue-700 rounded-full focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Login
                </button>
              </div>
              <div className="text-center">
                <p className="inline-block text-md text-black dark:text-blue-500 align-baseline">
                  Don&apos;t have an account?{" "}
                  <Link
                    className="font-semibold text-indigo-500 underline"
                    href={"/register"}
                  >
                    Register
                  </Link>
                </p>
              </div>
            </form>
            <SocialLogin />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
