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
  const date = new Date(user.lastLoginDay).toLocaleString();
  const notifyVerifyEmailSent = () => toast.success("Notification email sent");
  const handleVerifyWithEmail = () => {
    sendEmailVerification(auth.currentUser);
    notifyVerifyEmailSent();
  };
  return (
    <div className="w-full rounded-md bg-slate-100/30 flex-grow flex flex-col gap-y-5 p-3 md:p-5">
      <SectionTitle title="Info" />
      <div className="grid lg:grid-cols-2">
        <div className="lg:border-r-[1px] lg:border-r-slate-300 lg:pr-5 space-y-3">
          {user.userName && (
            <div className="flex gap-x-3">
              <span>User Name:</span>
              <span>{user.userName}</span>
            </div>
          )}
          <div className="flex gap-x-3">
            <span>Email:</span>
            <span>{<span>{email}</span>}</span>
          </div>
        </div>
        <div className="lg:pl-5 space-y-3 mt-5 md:mt-0">
          <div className="flex space-x-3 md:flex-row items-center">
            <span className="">
              {emailVerified ? "Verified" : "Account not verified"}
            </span>
            {emailVerified ? (
              <MdVerified className="text-blue-500" />
            ) : (
              <ButtonSecondary
                label={"Verify with email"}
                xClass={"py-1 px-2 rounded-md flex-shrink-0"}
                handleClick={handleVerifyWithEmail}
              />
            )}
          </div>
          <div className="flex gap-x-3">
            <span>Last login:</span>
            <span>{date}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
