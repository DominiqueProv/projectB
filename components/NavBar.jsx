import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import LinkPrimary from "./buttons/LinkPrimary";
import ButtonPrimary from "./buttons/ButtonPrimary";
import { useRouter } from "next/router";
import { FaBaby } from "react-icons/fa";

const Navbar = () => {
  const { user, logout } = useAuth();
  const router = useRouter();
  return (
    <nav className="bg-indigo-500 p-4 flex justify-between items-center">
      <Link href="/" passHref>
        <a className="space-x-3 flex items-center">
          <FaBaby size={30} className="text-blue-100" />
          <span className="font-bold text-2xl text-blue-100">
            My Babies Story
          </span>
        </a>
      </Link>
      <div className="space-x-3 flex">
        {user ? (
          <>
            <LinkPrimary url="/dashboard" label="Dashboard" />
            <ButtonPrimary
              label={"Logout"}
              type={"button"}
              handleClick={() => {
                logout();
                router.push("/");
              }}
            />
          </>
        ) : (
          <>
            <LinkPrimary url="/signup" label="Signup" />
            <LinkPrimary url="/login" label="Login" />
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
