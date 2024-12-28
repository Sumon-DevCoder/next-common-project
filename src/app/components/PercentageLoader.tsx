"use client";
import { useState, useEffect } from "react";

const PercentageLoader = () => {
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    if (percentage < 100) {
      const interval = setInterval(() => {
        setPercentage((prev) => Math.min(prev + 1, 100));
      }, 30);
      return () => clearInterval(interval); // Cleanup on unmount
    }
  }, [percentage]);

  return (
    <div className="flex justify-center items-center min-h-screen flex-col">
      <div className="text-center space-y-4">
        <div className="relative w-64 h-8 bg-gray-200">
          <div
            className="absolute top-0 left-0 h-full bg-[#008ECC] transition-all duration-300"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
        <p className="text-xl text-[#008ECC] font-semibold">{percentage}%</p>
      </div>
    </div>
  );
};

export default PercentageLoader;
