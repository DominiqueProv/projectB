import React from "react";
import { useAuth } from "../../context/AuthContext";
import SectionTitle from "../text/SectionTitle";
import { MdVerified } from "react-icons/md";
import ButtonSecondary from "../buttons/ButtonSecondary";
import { sendEmailVerification } from "firebase/auth";
import { toast } from "react-toastify";
import { auth } from "../../lib/firebase";

const UserInfo = () => {
  const { user } = useAuth();
  const { email, emailVerified } = auth.currentUser;
  const lastLoginDate = new Date(user.lastLoginDay).toLocaleString();

  const notifyVerifyEmailSent = () => toast.success("Verification email sent");

  const handleVerifyWithEmail = async () => {
    try {
      await sendEmailVerification(auth.currentUser);
      notifyVerifyEmailSent();
    } catch (error) {
      toast.error("Failed to send verification email: " + error.message);
    }
  };

  return (
    <div className="w-full rounded-md bg-slate-100/30 flex-grow flex flex-col gap-y-5 p-3 md:p-5">
      <SectionTitle title="Info" />
      {user.displayName && (
        <div className="flex gap-x-3">
          <span className="font-semibold">User Name:</span>
          <span>{user.displayName}</span>
        </div>
      )}
      <div className="flex gap-x-3">
        <span className="font-semibold">Email:</span>
        <span>{email}</span>
      </div>

      <div className="flex items-center space-x-3">
        <span className="font-semibold">Account confirmation: </span>
        {emailVerified ? (
          <div className="flex flex-shrink-0 text-blue-500 text-sm font-medium px-3 py-1 items-center gap-2 border border-blue-500 bg-blue-50 rounded-full">
            <span>Email Verified</span>
            <MdVerified className="" />
          </div>
        ) : (
          <span className="">not verified</span>
        )}
        {!emailVerified && (
          <ButtonSecondary
            label="Verify with email"
            xClass="py-1 px-2 rounded-md flex-shrink-0"
            handleClick={handleVerifyWithEmail}
          />
        )}
      </div>
      <div className="flex gap-x-3">
        <span className="font-semibold">Last login:</span>
        <span>{lastLoginDate}</span>
      </div>
    </div>
  );
};

export default UserInfo;
