import Link from "next/link";
import MenuModal from "../components/modals/MenuModal";
import { LuBaby } from "react-icons/lu";

const Navbar = ({ isDark }) => {
  return (
    <nav
      className={`p-2.5 sm:p-4 flex justify-between items-center w-full ${
        isDark ? "bg-indigo-950" : ""
      }`}
    >
      <Link href="/" passHref>
        <a className="gap-2 flex items-center">
          <LuBaby
            className={`text-[30px] ${
              isDark ? "text-white" : "text-indigo-800"
            }`}
          />
          <span
            className={`${
              isDark ? "text-white" : "text-indigo-800"
            } font-bold text-xl sm:text-3xl`}
          >
            BabyPath
          </span>
          <div
            className={`hidden sm:block border-b ml-6 ${
              isDark ? "border-white" : "border-indigo-800"
            } w-[60px]`}
          />
        </a>
      </Link>
      <MenuModal />
    </nav>
  );
};

export default Navbar;
