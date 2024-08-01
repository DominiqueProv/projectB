import React from "react";
import Icon from "../buttons/Icon";
import { useMyFirst } from "../../context/MyFirstContext";
import { formatDateFirst } from "../../utils/date";

const MyFirstField = ({ item }) => {
  const { id, name } = item;
  const { date, formDataFromDb, handleDelete } = useMyFirst();

  const hasData = formDataFromDb[id];

  return (
    hasData && (
      <div className="flex gap-3 items-center bg-slate-100 p-1 pl-3 justify-between rounded-md">
        <span className="flex-grow flex flex-col rounded-md">
          <span className="text-indigo-800 font-semibold">{name}</span>
          {formatDateFirst(formDataFromDb[id])}
        </span>
        <button
          className="bg-slate-50 cursor-pointer text-white rounded-lg py-2 flex items-center justify-center aspect-square h-full hover:bg-slate-300 duration-300 ease-out-expo"
          onClick={handleDelete}
          name={id}
        >
          <Icon icon="minus" size={25} xClass="text-slate-500" />
        </button>
      </div>
    )
  );
};

export default MyFirstField;
