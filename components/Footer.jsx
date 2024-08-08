import React from "react";

const Footer = ({ isDark }) => {
  return (
    <footer
      className={`${
        isDark ? "bg-indigo-950" : "bg-indigo-800"
      } relative w-full mt-32`}
    >
      <div
        className={`absolute h-[300px] bottom-0 left-0 -z-10 w-full bg-gradient-to-t ${
          isDark ? "from-indigo-900" : "from-indigo-700"
        } ${isDark ? "bg-indigo-900" : ""}`}
      ></div>
      <div className="max-w-[1920px] mx-auto p-4 text-blue-100">
        Copywright 2024
      </div>
    </footer>
  );
};

export default Footer;
