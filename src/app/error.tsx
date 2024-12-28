"use client";

import Link from "next/link";
import Head from "next/head";

const Error = ({
  error,
  rest = () => window.location.reload(),
}: {
  error: Error & { digest?: string };
  rest?: () => void;
}) => {
  return (
    <>
      <Head>
        <title>Error</title>
        <meta name="description" content="An unexpected error has occurred." />
      </Head>
      <section className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white text-center p-4">
        <h1 className="text-5xl font-bold text-red-400">
          Something Went Wrong
        </h1>
        <p className="text-lg md:text-2xl my-4">
          {error.message} Please try again
        </p>
        <div className="flex space-x-4">
          <Link href="/" passHref>
            <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded transition duration-300">
              🏠 Back to Home
            </button>
          </Link>
          <button
            onClick={() => rest}
            className="bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-2 px-4 rounded transition duration-300"
          >
            🔄 Try Again
          </button>
        </div>
      </section>
    </>
  );
};

export default Error;
