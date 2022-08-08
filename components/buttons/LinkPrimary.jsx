import React from "react";
import Link from "next/link";

const ButtonPrimary = ({ url, label, children }) => {
  return (
    <Link href={url} passHref>
      <a className="bg-indigo-800 text-white rounded-lg px-2 sm:px-4 py-2 flex space-x-2 items-center">
        {children}
        <span className="hidden sm:block">{label}</span>
      </a>
    </Link>
  );
};

export default ButtonPrimary;
