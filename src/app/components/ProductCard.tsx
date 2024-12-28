import React, { useState, useEffect } from "react";
import Image from "next/image";
import { TProduct } from "@/types/gobal";
import Link from "next/link";

const ProductCard = ({ product }: { product: TProduct }) => {
  const { name, price, like, img, _id } = product || {};

  // States for random rating and like count
  const [rating, setRating] = useState<string>("0.0");
  const [likeCount, setLikeCount] = useState<number>(0);
  const [hovered, setHovered] = useState(false);

  // Function to generate a random rating
  const generateRandomRating = () => {
    return (Math.random() * (5 - 1) + 1).toFixed(1); // Between 1 and 5
  };

  // Function to generate a random like count
  const generateRandomLikes = () => {
    return Math.floor(Math.random() * 1000); // Between 0 and 999
  };

  useEffect(() => {
    setRating(generateRandomRating());
    setLikeCount(generateRandomLikes());
  }, []);

  // Handle Like Button Click
  const handleLikeClick = () => {
    setLikeCount((prev) => (likeCount ? prev + 1 : prev + 1)); // Toggle like count
  };

  return (
    <div className="relative w-72 bg-white dark:bg-gray-800   dark:border-b dark:border-r dark:border-l border-gray-500 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-1000 group">
      {/* Product Image */}
      <div
        className="w-full h-48 bg-gray-200 dark:bg-gray-800"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <Image
          src={hovered && img?.[1] ? img[1] : img?.[0] || "/default-image.jpg"} // Hover effect logic
          alt={name || "Product Image"}
          width={256}
          height={160}
          className={`w-full h-full object-cover transition-all duration-500 ease-in-out`} // Transition added here
        />
      </div>

      {/* Content Section */}
      <div className="p-3 space-y-2">
        {/* Title and Like */}
        <div className="flex justify-between items-center">
          <h2 className="text-green-600 font-bold text-lg truncate">
            {name || "Unnamed Product"}
          </h2>
          <button
            onClick={handleLikeClick}
            className="text-gray-500 dark:text-gray-300 hover:text-red-500 flex gap-0.5"
          >
            {/* <span>{likeCount}</span> <span>{like ? "❤️" : "🤍"}</span> */}
            <span>{likeCount}</span> <span>{like ? "❤️" : "❤️"}</span>
          </button>
        </div>

        {/* Price and Rating */}
        <div className="flex justify-between items-center">
          {/* <span className="text-red-500 font-semibold">${price} </span> */}
          <span className="text-red-500 dark:text-red-400 font-semibold">
            $
            {price >= 1000
              ? new Intl.NumberFormat("en-US").format(price)
              : price}
          </span>

          <span className="flex items-center gap-0.5">
            <span className="text-gray-600 dark:text-gray-300 text-md">
              {rating || "N/A"}
            </span>
            <span className="pb-1">⭐</span>
          </span>
        </div>
      </div>
      <div className="relative px-8 bottom-0 inset-x-0 flex items-center justify-center bg-white dark:bg-gray-800 py-2 opacity-100 group-hover:opacity-100 transition-opacity duration-300">
        <button className=" text-green-600 hover:text-white text-nowrap border-l border-t border-b border-green-600  px-6 py-2 rounded-l-lg hover:bg-green-600 transition-all duration-300 flex items-center justify-center">
          Add to Cart
        </button>

        {/* Container for the "or" circle, now flex-based for centering */}
        <div className="flex items-center">
          <span className="text-gray-600 dark:text-gray-300 absolute right-[132px] rounded-full border p-2 h-8 w-8 bg-gray-200 dark:bg-gray-700 flex items-center justify-center dark:border-gray-400">
            or
          </span>
        </div>

        <Link href={`/product/${_id}`}>
          <button className=" text-nowrap border-r-green-500 dark:text-gray-100  border-r border-t border-b  border-green-600  px-6 py-2 rounded-r-lg text-white bg-green-600 hover:bg-green-700  dark:bg-green-800 dark:hover:bg-green-600 transition-all duration-300 flex items-center justify-center">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
