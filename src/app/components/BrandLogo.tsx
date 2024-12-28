import Image from "next/image";
import Link from "next/link";
import logoImg from "../../../public/assets/logo.png";

const BrandLogo = () => {
  return (
    <div>
      <Link href={`/`} className="flex items-center -space-x-1.5 md:-space-x-3">
        <Image
          className="h-14 w-24 md:h-16 md:w-24 mt-1  dark:brightness-110"
          src={logoImg}
          alt="Animal Bazaar Logo"
        />
        <span className="text-xl md:text-2xl  text-nowrap font-extrabold text-green-600">
          Animal Bazaar
        </span>
      </Link>
    </div>
  );
};

export default BrandLogo;
