import React from "react";
import Link from "next/link";

const LinkSecondary = ({ url, label }) => {
  return (
    <Link
      href={url}
      passHref
      className="bg-blue-100 py-1 px-3 text-blue-500 rounded-md flex-shrink-0"
    >
      {label}
    </Link>
  );
};

export default LinkSecondary;
