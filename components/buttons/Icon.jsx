import { VscSignOut } from "react-icons/vsc";
import { FiLogIn } from "react-icons/fi";
import { BiUserPlus } from "react-icons/bi";
import { FiUserCheck } from "react-icons/fi";
import { FiChevronRight } from "react-icons/fi";
import { AiFillEdit } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import { AiOutlineColumnHeight } from "react-icons/ai";
import { MdOutlineMonitorWeight } from "react-icons/md";
import { TbFileDescription } from "react-icons/tb";
import { TbMoodHappy } from "react-icons/tb";
import { MdOutlinePlace } from "react-icons/md";
import { RiFullscreenLine } from "react-icons/ri";
import { MdTitle } from "react-icons/md";
import { IoAddSharp } from "react-icons/io5";
import { FiHeart } from "react-icons/fi";
import { IoMdRemove } from "react-icons/io";

const iconComponents = {
  title: MdTitle,
  signout: VscSignOut,
  login: FiLogIn,
  signup: BiUserPlus,
  delete: IoMdClose,
  update: FiUserCheck,
  arrow: FiChevronRight,
  edit: AiFillEdit,
  height: AiOutlineColumnHeight,
  weight: MdOutlineMonitorWeight,
  description: TbFileDescription,
  location: MdOutlinePlace,
  mood: TbMoodHappy,
  expand: RiFullscreenLine,
  add: IoAddSharp,
  members: FiHeart,
  minus: IoMdRemove,
};

const Icon = ({ icon, xClass = "text-indigo-100", size = 18 }) => {
  const IconComponent = iconComponents[icon];
  return IconComponent ? (
    <IconComponent size={size} className={`flex-shrink-0 ${xClass}`} />
  ) : null;
};

export default Icon;
