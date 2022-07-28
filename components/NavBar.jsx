import React from "react";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";

const NavbarComp = () => {
  const { user, logout } = useAuth();
  const router = useRouter();

  return (
    <nav className="bg-indigo-500 p-4">
      <div className="flex justify-between items-center">
        <Link href="/" passHref>
          <a className="font-bold text-xl text-blue-100">Babies Journal</a>
        </Link>
        {user ? (
          <div>
            <button
              className="_button-auth"
              onClick={() => {
                logout();
                router.push("/login");
              }}
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="space-x-3">
            <Link href="/signup" passHref>
              <a className="_button-auth">Signup</a>
            </Link>
            <Link href="/login" passHref>
              <a className="_button-auth">Login</a>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavbarComp;
