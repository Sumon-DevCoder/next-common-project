import Link from "next/link";
import { usePathname } from "next/navigation";
import useCurrentUserInfo from "./useCurrentUserInfo";

const useNavLinks = () => {
  const pathname = usePathname();
  const { role } = useCurrentUserInfo();

  // Define a reusable style function
  const getLinkClass = (path: string) =>
    `p-2 rounded-lg text-slate-800 dark:text-slate-100 ${
      pathname === path ? "text-green-600" : "text-black dark:text-white"
    }`;

  return (
    <>
      <Link href="/" className={getLinkClass("/")}>
        Home
      </Link>
      <Link href="/product" className={getLinkClass("/product")}>
        Products
      </Link>
      <Link href="/about" className={getLinkClass("/about")}>
        About
      </Link>
      <Link href="/contact" className={getLinkClass("/contact")}>
        Contact
      </Link>
      {role === "user" && (
        <>
          <Link href="/cart" className={getLinkClass("/cart")}>
            Carts
          </Link>
          <Link
            href="/dashboard/order-history"
            className={getLinkClass("/dashboard/order-history")}
          >
            Order History
          </Link>
        </>
      )}
      {role === "admin" && (
        <Link
          href="/admin-dashboard"
          className={getLinkClass("/admin-dashboard")}
        >
          Dashboard
        </Link>
      )}
      {role === "user" && (
        <Link href="/dashboard" className={getLinkClass("/dashboard")}>
          Dashboard
        </Link>
      )}
    </>
  );
};

export default useNavLinks;
