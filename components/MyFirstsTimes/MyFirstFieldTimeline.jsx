import React from "react";
import Icon from "../buttons/Icon";
import { useMyFirst } from "../../context/MyFirstContext";
import { formatDateFirst } from "../../utils/date";

const MyFirstFieldTimeline = ({ item }) => {
  const { id, name } = item;
  const { formDataFromDb, handleDelete } = useMyFirst();
  const hasData = formDataFromDb[id];

  return (
    hasData && (
      <div className="flex gap-3 items-center bg-indigo-800 text-white p-1 pl-3 justify-between rounded-md w-full sm:w-[400px] mt-4">
        <span className="flex-grow flex flex-col rounded-md">
          <span className="text-white font-semibold">{name}</span>
          {formatDateFirst(formDataFromDb[id])}
        </span>
        <button
          className="group bg-indigo-700 cursor-pointer text-white rounded-full max-h-[30px] py-2 flex items-center justify-center aspect-square h-full hover:bg-slate-300 duration-300 ease-out-expo"
          onClick={handleDelete}
          name={id}
        >
          <Icon
            icon="minus"
            size={15}
            xClass="text-slate-500 group-hover:text-indigo-500 duration-300"
          />
        </button>
      </div>
    )
  );
};

export default MyFirstFieldTimeline;
