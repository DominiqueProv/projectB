import React from "react";
import Link from "next/link";

const ButtonSecondary = ({ url, label }) => {
  return (
    <Link href={url} passHref>
      <a className="bg-blue-100 py-1 px-3 text-blue-500 rounded-md self-start">
        {label}
      </a>
    </Link>
  );
};

export default ButtonSecondary;
