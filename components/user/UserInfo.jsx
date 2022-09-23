import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import SectionTitle from "../text/SectionTitle";
import { MdVerified } from "react-icons/md";
import ButtonSecondary from "../buttons/ButtonSecondary";
import { getAuth, sendSignInLinkToEmail } from "firebase/auth";

const UserInfo = () => {
  const { user } = useAuth();
  const date = new Date(user.lastLoginDay).toLocaleString();

  const actionCodeSettings = {
    // URL you want to redirect back to. The domain (www.example.com) for this
    // URL must be in the authorized domains list in the Firebase Console.
    url: "https://project-baby-phi.vercel.app/update",
    handleCodeInApp: true,
    iOS: {
      bundleId: "com.example.ios",
    },
    android: {
      packageName: "com.example.android",
      installApp: true,
      minimumVersion: "12",
    },
    dynamicLinkDomain: "https://project-baby-phi.vercel.app/update",
  };

  const handleVerifyWithEmail = () => {
    const auth = getAuth();
    console.log(auth);
    console.log(user.email);
    sendSignInLinkToEmail(auth, user.email, actionCodeSettings)
      .then(() => {
        console.log("success");
        // The link was successfully sent. Inform the user.
        // Save the email locally so you don't need to ask the user for it again
        // if they open the link on the same device.
        window.localStorage.setItem("emailForSignIn", email);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  return (
    <div className="w-full rounded-md bg-slate-100/30 flex-grow flex flex-col gap-y-5 p-5">
      <SectionTitle title="Info" />
      <div className="grid lg:grid-cols-2 lg:h-full gap-y-3">
        <div className="flex space-x-3 lg:border-r-[1px] lg:border-r-slate-300 lg:pr-5">
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
              handleClick={handleVerifyWithEmail}
            />
          )}
        </div>
        <div className="flex gap-x-3 lg:pl-5">
          <span className="">Last login:</span>
          <span className="">{date}</span>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
