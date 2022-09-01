import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import LinkPrimary from "./buttons/LinkPrimary";
import ButtonPrimary from "./buttons/ButtonPrimary";
import { useRouter } from "next/router";
import { MdOutlineBedroomBaby } from "react-icons/md";
import { HiOutlineUserCircle } from "react-icons/hi";
import Icon from "./buttons/Icon";
import Image from "next/image";

const Navbar = () => {
  const { user, logout } = useAuth();
  console.log(user);
  const router = useRouter();
  return (
    <nav className="bg-indigo-500 p-4 flex justify-between items-center">
      <Link href="/" passHref>
        <a className="space-x-3 flex items-center">
          <MdOutlineBedroomBaby size={35} className="text-blue-100" />
          <span className="font-bold text-2xl text-blue-100">
            My Babies Story
          </span>
        </a>
      </Link>
      <ul className="space-x-2 flex items-center">
        {user ? (
          <>
            <LinkPrimary
              url="/dashboard"
              label="Dashboard"
              xClass={"px-2 sm:px-4"}
            >
              <Icon icon={"dashboard"} />
            </LinkPrimary>
            <ButtonPrimary
              xClass={"px-2 sm:px-4"}
              label={"Logout"}
              type={"button"}
              handleClick={() => {
                logout();
                router.push("/");
              }}
            >
              <Icon icon={"signout"} />
            </ButtonPrimary>
            <div className="bg-indigo-100 rounded-md p-1 flex items-center space-x-1">
            {user.photoUrl ? (
              <Image
                src={user.photoUrl}
                className={"rounded-full overflow-hidden object-cover"}
                width={30}
                height={30}
                alt={"user avatar"}
              />
            ) : (
              <HiOutlineUserCircle size={25} className="text-blue-500" />
            )}
            {user.userName ? (
              <div className="">
                {user.userName}
              </div>
            ) : (
              <></>
            )}
            </div>
          </>
        ) : (
          <>
            <LinkPrimary url="/signup" label="Signup" xClass={"px-2 sm:px-4"}>
              <Icon icon={"signup"} />
            </LinkPrimary>
            <LinkPrimary url="/login" label="Login" xClass={"px-2 sm:px-4"}>
              <Icon icon={"login"} />
            </LinkPrimary>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
