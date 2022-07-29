import React from "react";
import Link from "next/link";

const ButtonPrimary = ({ url, label }) => {
  return (
    <Link href={url} passHref>
      <a className="bg-indigo-800 text-white rounded-lg px-4 py-2">{label}</a>
    </Link>
  );
};

export default ButtonPrimary;
