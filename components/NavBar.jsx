import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import LinkPrimary from "./buttons/LinkPrimary";
import ButtonPrimary from "./buttons/ButtonPrimary";
import { useRouter } from "next/router";
import { MdOutlineBedroomBaby } from "react-icons/md";
import Icon from "./buttons/Icon";
import Image from "next/image";

const Navbar = () => {
  const { user, logout } = useAuth();
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
      <ul className="space-x-2 flex">
        {user ? (
          <>
            {user.photoUrl ? (
              <Image
                src={user.photoUrl}
                className={"rounded-full overflow-hidden"}
                width={50}
                height={50}
                alt={"user avatar"}
              />
            ) : (
              <></>
            )}

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
