import React from "react";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import LinkPrimary from "./buttons/LinkPrimary";
import ButtonPrimary from "./buttons/ButtonPrimary";
import { useRouter } from "next/router";

const Navbar = () => {
  const { user, logout } = useAuth();
  const router = useRouter();
  return (
    <nav className="bg-indigo-500 p-4 flex justify-between items-center">
      <Link href="/" passHref>
        <a className="font-bold text-xl text-blue-100">Babies Journal</a>
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
