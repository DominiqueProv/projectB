import React from "react";

export const Loader = ({ percent }) => {
  return (
    <>
      {percent > 0 && percent < 100 ? (
        <div className="w-full bg-gray-200 rounded-full h-1.5 my-4 dark:bg-gray-700">
          <div
            className="bg-blue-600 h-1.5 rounded-full dark:bg-blue-500"
            // style={{ width: `${percent}%` }}
            style={{ transform: `translate(${percent}%` }}
          ></div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
