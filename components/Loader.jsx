import React from "react";

export const Loader = ({ percent }) => {
  return (
    <>
      {percent > 0 && percent < 100 ? (
        <div className="bg-gray-200 rounded-full h-1.5 absolute bottom-2 left-2 right-2">
          <div
            className="bg-indigo-800 h-1.5 rounded-full"
            style={{ width: `${percent}%` }}
          ></div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
