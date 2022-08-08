import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import LinkPrimary from "./buttons/LinkPrimary";
import ButtonPrimary from "./buttons/ButtonPrimary";
import { useRouter } from "next/router";
import { FaBaby } from "react-icons/fa";
import { MdOutlineBedroomBaby } from "react-icons/md";
import { GoDashboard } from "react-icons/go";
import { VscSignOut } from "react-icons/vsc";

const Navbar = () => {
  const { user, logout } = useAuth();
  const router = useRouter();
  return (
    <header className="bg-indigo-500 p-4 flex justify-between items-center">
      <Link href="/" passHref>
        <a className="space-x-3 flex items-center">
          <MdOutlineBedroomBaby size={35} className="text-blue-100" />
          <span className="font-bold text-2xl text-blue-100">
            My Babies Story
          </span>
        </a>
      </Link>
      <nav className="space-x-3 flex">
        {user ? (
          <>
            <LinkPrimary url="/dashboard" label="Dashboard">
              <GoDashboard
                size={15}
                className="text-indigo-100 flex-shrink-0"
              />
            </LinkPrimary>
            <ButtonPrimary
              label={"Logout"}
              type={"button"}
              handleClick={() => {
                logout();
                router.push("/");
              }}
            >
              <VscSignOut size={15} className="text-indigo-100 flex-shrink-0" />
            </ButtonPrimary>
          </>
        ) : (
          <>
            <LinkPrimary url="/signup" label="Signup" />
            <LinkPrimary url="/login" label="Login" />
          </>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
