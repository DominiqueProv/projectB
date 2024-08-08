import Link from "next/link";
import MenuModal from "../components/modals/MenuModal";
import { MdOutlineBedroomBaby } from "react-icons/md";

const Navbar = ({ isDark }) => {
  return (
    <nav
      className={`p-4 flex justify-between items-center w-full ${
        isDark ? "bg-indigo-950" : ""
      }`}
    >
      <Link href="/" passHref>
        <a className="gap-3 flex items-center">
          <MdOutlineBedroomBaby
            size={45}
            className={`${isDark ? "text-white" : "text-indigo-800"}`}
          />
          <span
            className={`${
              isDark ? "text-white" : "text-indigo-800"
            } font-bold text-3xl`}
          >
            Family Story
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
