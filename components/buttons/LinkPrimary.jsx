import React from "react";
import Link from "next/link";

const LinkPrimary = ({ url, label, children, xClass }) => {
  return (
    <Link href={url} passHref>
      <a
        className={`bg-indigo-800 text-white py-2 flex space-x-2 items-center ${xClass}`}
      >
        {children}
        <span className="hidden sm:block">{label}</span>
      </a>
    </Link>
  );
};

export default LinkPrimary;
