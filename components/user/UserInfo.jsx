import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import SectionTitle from "../text/SectionTitle";
import { MdVerified } from "react-icons/md";
import ButtonSecondary from "../buttons/ButtonSecondary";

const UserInfo = () => {
  const { user } = useAuth();
  const rawDate = new Date(user.lastLoginDay);
  const date = rawDate.toLocaleString();

  return (
    <div className="w-full rounded-md bg-slate-100/30 flex-grow flex flex-col gap-y-5 p-5">
      <SectionTitle title="Info" />
      <div className="grid md:grid-cols-2 h-full gap-y-3 md:gap-y-0">
        <div className="flex space-x-3 md:border-r-[1px] border-r-slate-300 pr-5">
          <span className="">
            {user.emailVerified
              ? "Your account is Verified"
              : "Your account is not Verified"}
          </span>
          {user.emailVerified ? (
            <MdVerified />
          ) : (
            //TODO autheticate with email
            <ButtonSecondary
              label={"Verify with email"}
              xClass={"py-1 px-2 rounded-md flex-shrink-0"}
            />
          )}
        </div>
        <div className="flex gap-x-3 md:pl-5">
          <span className="">Last login:</span>
          <span className="">{date}</span>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
