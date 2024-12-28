import Link from "next/link";
import React from "react";

const FeaturesConstruction = () => {
  return (
    <div className="text-center p-5 sm:p-10 text-gray-600 max-w-lg mx-auto">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4">
        Under Construction 🚧
      </h1>
      <p className="text-base sm:text-lg mb-2">
        The feature is currently being built to serve you better. We&apos;re
        working hard to bring it to life soon!
      </p>
      <p className="text-base sm:text-lg">
        Meanwhile, feel free to explore other parts of our website or{" "}
        <Link
          target="_blank"
          className="underline text-blue-600"
          href={"https://www.linkedin.com/in/sumon-devcoder/"}
        >
          contact us
        </Link>{" "}
        if you have any{" "}
        <Link
          className="underline text-blue-600"
          target="_blank"
          href={"https://www.facebook.com/Sumon.DevCoder/"}
        >
          questions.
        </Link>
      </p>
      <Link
        href="/"
        className="mt-5 inline-block px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition-all"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default FeaturesConstruction;
