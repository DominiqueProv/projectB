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
      <div className="grid lg:grid-cols-2 gap-y-5">
        <div className="lg:border-r-[1px] lg:border-r-slate-300 lg:pr-5 space-y-3">
          {user.userName && (
            <div className="flex gap-x-3">
              <span>User Name:</span>
              <span>{user.userName}</span>
            </div>
          )}
          <div className="flex gap-x-3">
            <span>Email:</span>
            <span>{email}</span>
          </div>
        </div>
        <div className="lg:pl-5 space-y-3">
          <div className="flex items-center space-x-3">
            <span>
              {emailVerified
                ? "Account email Verified"
                : "Account not verified"}
            </span>
            {emailVerified ? (
              <MdVerified className="text-blue-500" />
            ) : (
              <ButtonSecondary
                label="Verify with email"
                xClass="py-1 px-2 rounded-md flex-shrink-0"
                handleClick={handleVerifyWithEmail}
              />
            )}
          </div>
          <div className="flex gap-x-3">
            <span>Last login:</span>
            <span>{lastLoginDate}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
