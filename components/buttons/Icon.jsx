import { VscSignOut } from "react-icons/vsc";
import { FiLogIn } from "react-icons/fi";
import { BiUserPlus } from "react-icons/bi";
import { FiUserCheck } from "react-icons/fi";
import { FiChevronRight } from "react-icons/fi";
import { AiFillEdit } from "react-icons/ai";
import { MdOutlineBedroomBaby } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { AiOutlineColumnHeight } from "react-icons/ai";
import { MdOutlineMonitorWeight } from "react-icons/md";
import { TbFileDescription } from "react-icons/tb";
import { TbMoodHappy } from "react-icons/tb";
import { MdOutlinePlace } from "react-icons/md";
import { BsArrowsAngleExpand } from "react-icons/bs";

const components = {
  timeline: MdOutlineBedroomBaby,
  signout: VscSignOut,
  login: FiLogIn,
  signup: BiUserPlus,
  delete: IoMdClose,
  update: FiUserCheck,
  arrow: FiChevronRight,
  edit: AiFillEdit,
  height: AiOutlineColumnHeight,
  weigth: MdOutlineMonitorWeight,
  description: TbFileDescription,
  location: MdOutlinePlace,
  mood: TbMoodHappy,
  expand: BsArrowsAngleExpand,
};

const Icon = ({ icon, xClass, size }) => {
  const IconDisplay = components[icon];
  return (
    <IconDisplay
      size={size || 18}
      className={`flex-shrink-0 ${xClass ? xClass : "text-indigo-100"}`}
    />
  );
};

export default Icon;
