"use client";

import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2"; // Import SweetAlert2

const NewsletterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = () => {
    Swal.fire({
      title: "Success!",
      text: "Successfully subscribed to the newsletter!",
      icon: "success",
      confirmButtonText: "OK",
      confirmButtonColor: "#28a745", // Green button to match the theme
    });
    reset(); // Reset the form after submission
  };

  return (
    <div className="w-full mx-auto p-6 bg-gradient-to-t from-green-500 to-green-800 dark:bg-gradient-to-r dark:from-green-600 dark:via-gray-700 dark:to-gray-900 shadow-lg">
      <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 px-14">
        {/* Left Side Content */}
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-3xl font-bold text-gray-200 dark:text-white mb-4">
            Newsletter
          </h2>
          <p className="text-lg text-gray-300 dark:text-gray-300">
            Stay up to date about product drops, news, and special sales.
          </p>
        </div>

        {/* Right Side Form */}
        <div className="w-full md:w-auto">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex items-center justify-center md:justify-start space-x-4"
          >
            <input
              type="email"
              id="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Please enter a valid email address",
                },
              })}
              className="flex-1 max-w-xl px-4 py-3 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
              placeholder="Enter your email"
            />
            <button
              type="submit"
              className="w-32 py-3 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none dark:bg-green-700 dark:hover:bg-green-600"
            >
              Subscribe
            </button>
          </form>
          {errors.email && (
            <p className="text-red-500 text-xs mt-2 text-center md:text-left">
              {errors.email.message as string}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsletterForm;
