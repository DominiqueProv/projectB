import Link from "next/link";
import { MdOutlineBedroomBaby } from "react-icons/md";
import MenuModal from "../components/modals/MenuModal";

const Navbar = () => {
  return (
    <div className="bg-indigo-500 p-4 flex justify-between items-center">
      <Link href="/" passHref>
        <a className="space-x-3 flex items-center">
          <MdOutlineBedroomBaby size={35} className="text-blue-100" />
          <span className="font-bold text-2xl text-blue-100">
            My Babies Story
          </span>
        </a>
      </Link>
      <MenuModal />
    </div>
  );
};

export default Navbar;
