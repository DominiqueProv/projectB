import Link from "next/link";
import MenuModal from "../components/modals/MenuModal";
import { MdOutlineBedroomBaby } from "react-icons/md";

const Navbar = () => {
  return (
    <nav className="p-4 flex justify-between items-center w-full">
      <Link href="/" passHref>
        <a className="gap-3 flex items-center">
          <MdOutlineBedroomBaby size={45} className="text-indigo-800" />
          <span className="font-bold text-3xl text-indigo-800">
            Familly Story
          </span>
          <div className="hidden sm:block border-b ml-6 border-indigo-800 w-[60px]"></div>
        </a>
      </Link>
      <MenuModal />
    </nav>
  );
};

export default Navbar;
