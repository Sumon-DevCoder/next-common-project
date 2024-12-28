import Link from "next/link";
import Head from "next/head";

const NotFound = () => {
  return (
    <>
      <Head>
        <title>404 - Page Not Found</title>
        <meta
          name="description"
          content="Oops! The page you're looking for doesn't exist."
        />
      </Head>

      <section
        className="relative h-screen bg-cover bg-center"
        style={{
          backgroundImage: `url(https://i.ibb.co.com/QHcDKbp/not-found.jpg)`,
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative flex flex-col items-center justify-center h-full text-white text-center p-4">
          <h2 className="mt-4 text-3xl md:text-7xl font-medium animate-bounce">
            Page Not Found
          </h2>
          <p className="text-lg md:text-2xl mb-2 py-4 font-oswald tracking-wide">
            Oops! The page you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link href="/" passHref>
            <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded transition duration-300">
              Back to Home
            </button>
          </Link>
        </div>
      </section>
    </>
  );
};

export default NotFound;
