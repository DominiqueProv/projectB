import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const LinkPrimary = ({
  url,
  label,
  children,
  xClass = "",
  exact = false,
  handleClick,
}) => {
  const { pathname } = useRouter();
  const isActive = exact ? pathname === url : pathname.startsWith(url);

  return (
    <Link href={url} passHref>
      <a
        onClick={handleClick}
        className={`text-white py-2 flex space-x-2 items-center hover:bg-blue-500 duration-300 ease-out-expo ${xClass} ${
          isActive ? "bg-blue-500" : "bg-indigo-800"
        }`}
      >
        {children}
        <span>{label}</span>
      </a>
    </Link>
  );
};

export default LinkPrimary;
