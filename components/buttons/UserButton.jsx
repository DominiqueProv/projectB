import { useRouter } from "next/router";
import { HiOutlineUserCircle } from "react-icons/hi";
import { RiSettings3Line } from "react-icons/ri";
import { useAuth } from "../../context/AuthContext";
import Icon from "../buttons/Icon";

const UserButton = ({ setShowModal }) => {
  const { user } = useAuth();
  const router = useRouter();

  const handleButtonClick = () => {
    setShowModal(false);
    if (typeof window !== "undefined" && window.document) {
      document.body.style.overflow = "unset";
    }
    router.push("/account");
  };

  return (
    <button
      className="relative overflow-hidden group"
      onClick={handleButtonClick}
    >
      <div className="bg-indigo-100 rounded-md p-2 flex items-center space-x-2 group-hover:blur group-hover:opacity-30 duration-150">
        {user.photoURL ? (
          <img
            src={`${user.photoURL}`}
            className="rounded-full overflow-hidden object-cover w-8 h-8"
            alt="user avatar"
          />
        ) : (
          <HiOutlineUserCircle size={25} className="text-blue-500" />
        )}
        {user && (
          <div className="flex justify-between items-center w-full">
            <div>
              Welcome{" "}
              <span className="font-semibold">
                {user.userName || user.email}
              </span>
            </div>
            <RiSettings3Line size={25} className="text-indigo-500 md:hidden" />
          </div>
        )}
      </div>
      <p className="absolute flex items-center text-indigo-800 translate-y-1 font-semibold opacity-0 group-hover:opacity-100 duration-150 top-[50%] left-[50%] -translate-x-[50%] group-hover:-translate-y-[50%]">
        Dashboard
        <Icon
          icon="arrow"
          size={15}
          xClass="text-indigo-800 group-hover:translate-x-1 duration-100"
        />
      </p>
    </button>
  );
};

export default UserButton;
