import React from "react";
import { GoDashboard } from "react-icons/go";
import { VscSignOut } from "react-icons/vsc";
import { FiLogIn } from "react-icons/fi";
import { BiUserPlus } from "react-icons/bi";
import { RiDeleteBack2Line } from "react-icons/ri";
import { FiUserCheck } from "react-icons/fi";
import { FiChevronRight } from "react-icons/fi";
import { AiFillEdit } from "react-icons/ai";
import { MdOutlineBedroomBaby } from "react-icons/md";

const components = {
  timeline: MdOutlineBedroomBaby,
  signout: VscSignOut,
  login: FiLogIn,
  signup: BiUserPlus,
  delete: RiDeleteBack2Line,
  update: FiUserCheck,
  arrow: FiChevronRight,
  edit: AiFillEdit,
};

const Icon = ({ icon, xClass }) => {
  const IconDisplay = components[icon];
  return (
    <IconDisplay
      size={18}
      className={`flex-shrink-0 ${xClass ? xClass : "text-indigo-100"}`}
    />
  );
};

export default Icon;
