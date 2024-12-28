"use client";

import { authApi } from "@/redux/features/auth/authApi";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "sonner";
import { HiEye, HiEyeOff } from "react-icons/hi";
import axios from "axios";
import { TError } from "@/types/gobal";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Register = () => {
  const [signup] = authApi.useSignupMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [userImg, setUserImg] = useState<File | null>(null);
  const router = useRouter();

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Processing...");

    let imageUrl = "";
    if (userImg) {
      const formData = new FormData();
      formData.append("image", userImg);

      try {
        const response = await axios.post(
          `https://api.imgbb.com/1/upload?key=${"9b72c2e7f55726fd9a28bfb8bfedc08b"}`,
          formData
        );
        imageUrl = response.data.data.url;
      } catch (uploadError) {
        console.error("Image upload failed:", uploadError);
        return toast.error("Image upload failed", {
          id: toastId,
          duration: 2000,
        });
      }
    }

    const userInfo = {
      name: data.name,
      email: data.email,
      password: data.password,
      phone: data.phone,
      role: "user",
      address: data.address,
      img: imageUrl,
    };

    try {
      const response = await signup(userInfo).unwrap();

      if (response) {
        toast.success("Registration Successful, Please Login", {
          id: toastId,
          duration: 4000,
        });
        router.push("/login");
      }
    } catch (err) {
      console.log(err);
      const serverMsgErr =
        (err as TError)?.data?.message ||
        "Something went wrong. Please try again!";

      if (serverMsgErr === "Invalid ID") {
        return toast.error("Phone number already registered!", {
          id: toastId,
          duration: 2000,
        });
      }

      if (serverMsgErr) {
        return toast.error(serverMsgErr, {
          id: toastId,
          duration: 2000,
        });
      } else {
        return toast.error("Something went wrong", {
          id: toastId,
          duration: 2000,
        });
      }
    }
  };

  return (
    <div>
      <div className="mx-auto">
        <div className="flex justify-center px-6 py-5">
          <div className="w-full xl:w-3/4 lg:w-11/12 flex justify-center">
            <div className="w-full lg:w-7/12 shadow-xl bg-gray-100 dark:bg-gray-700 p-5 rounded-lg lg:rounded-l-none">
              <h3 className="py-4 text-2xl text-center text-gray-800 dark:text-white">
                Create an Account!
              </h3>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="px-8 pt-6 pb-8 mb-4 bg-gray-100 dark:bg-gray-800 rounded"
              >
                <div className="mb-4 md:flex md:justify-between">
                  <div className="mb-4 md:mr-2 md:mb-0">
                    <label
                      className="block mb-2 text-sm font-bold text-gray-700 dark:text-white"
                      htmlFor="firstName"
                    >
                      Name
                    </label>
                    <input
                      className="w-full px-3 py-2 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="firstName"
                      type="text"
                      placeholder="Enter Name"
                      {...register("name", {
                        required: "Name is required",
                        minLength: {
                          value: 3,
                          message: "Name must be at least 3 characters long",
                        },
                      })}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm ml-2 mt-1">
                        {errors.name.message as string}
                      </p>
                    )}
                  </div>
                  <div className="md:ml-2">
                    <label
                      className="block mb-2 text-sm font-bold text-gray-700 dark:text-white"
                      htmlFor="lastName"
                    >
                      Email
                    </label>
                    <input
                      className="w-full px-3 py-2 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="lastName"
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
                </div>
                <div className="mb-4">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700 dark:text-white"
                    htmlFor="address"
                  >
                    Address
                  </label>
                  <input
                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="address"
                    type="text"
                    placeholder="Enter Address"
                    {...register("address", {
                      required: "Address is required",
                      minLength: {
                        value: 10,
                        message: "Address must be at least 10 characters long",
                      },
                    })}
                  />
                  {errors.address && (
                    <p className="text-red-500 text-sm ml-2 mt-1">
                      {errors.address.message as string}
                    </p>
                  )}
                </div>
                <div className="mb-4 md:flex md:justify-between">
                  <div className="mb-4 md:mr-2 md:mb-0">
                    <label
                      className="block mb-2 text-sm font-bold text-gray-700 dark:text-white"
                      htmlFor="phone"
                    >
                      Phone
                    </label>
                    <input
                      className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="phone"
                      type="number"
                      placeholder="Enter Number"
                      {...register("phone", {
                        required: "Phone number is required",
                        pattern: {
                          value: /^\d{10,15}$/,
                          message:
                            "Phone number must be between 10 and 15 digits",
                        },
                      })}
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm ml-2 mt-1">
                        {errors.phone.message as string}
                      </p>
                    )}
                  </div>
                  <div className="md:ml-2 ">
                    <label
                      className="block mb-2 text-sm font-bold text-gray-700 dark:text-white"
                      htmlFor="c_password"
                    >
                      Password
                    </label>
                    <div className="relative">
                      <input
                        className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="c_password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter Password"
                        {...register("password", {
                          required: "Password is required",
                          pattern: {
                            value:
                              /^(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                            message:
                              "Password must be at least 6 characters with uppercase, lowercase, number, and special character",
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
                </div>
                <div className="mb-4">
                  <label className="block mb-2 text-sm font-bold text-gray-700 dark:text-white">
                    Profile Picture
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setUserImg(e.target.files?.[0] || null)}
                    className="w-full px-3 py-2 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div className="mb-6 text-center">
                  <button
                    type="submit"
                    className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                  >
                    Register Account
                  </button>
                </div>
                <hr className="mb-6 border-t" />
                <div className="text-center">
                  <Link
                    href="#"
                    className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                  >
                    Forgot Password?
                  </Link>
                </div>
                <div className="text-center">
                  <Link
                    href="/login"
                    className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                  >
                    Already have an account? Login!
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
