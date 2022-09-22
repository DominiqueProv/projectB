import Image from "next/image";
import { useRouter } from "next/router";
import { HiOutlineUserCircle } from "react-icons/hi";
import { useAuth } from "../../context/AuthContext";

const UserButton = ({ setShowModal }) => {
  const { user } = useAuth();
  const router = useRouter();
  return (
    <button
      className="relative overflow-hidden group"
      onClick={() => {
        setShowModal(false);
        router.push("/update");
      }}
    >
      <div className="bg-indigo-100 rounded-md p-2 flex items-center space-x-2 group-hover:blur group-hover:opacity-30 duration-150">
        {user ? (
          <img
            src={user.photoUrl}
            className={"rounded-full overflow-hidden object-cover w-8 h-8"}
            alt={"user avatar"}
          />
        ) : (
          <HiOutlineUserCircle size={25} className="text-blue-500" />
        )}
        {user && (
          <div className="">
            Welcome back{" "}
            <span className="font-semibold">{user.userName || user.email}</span>
          </div>
        )}
      </div>
      <p className="absolute text-indigo-800 translate-y-1 font-semibold ease-out opacity-0 group-hover:opacity-100 duration-150 top-[50%] left-[50%] -translate-x-[50%] group-hover:-translate-y-[50%]">
        VIEW
      </p>
    </button>
  );
};

export default UserButton;
