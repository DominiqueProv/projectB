import React from "react";

const LayoutDefault = (props) => {
  return (
    <main className="max-w-[1920px] mx-auto px-4 pt-4">{props.children}</main>
  );
};

export default LayoutDefault;
