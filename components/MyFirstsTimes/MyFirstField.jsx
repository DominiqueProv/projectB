import React from "react";
import AddDateModal from "../modals/AddDateModal";
import { useMyFirst } from "../../context/MyFirstContext";

const MyFirstField = ({ item, setShowAddMyFirstModal }) => {
  const { id, name } = item;
  const { date, formDataFromDb } = useMyFirst();

  const hasData = formDataFromDb[id];

  return (
    !hasData && (
      <div className="flex gap-3 items-center bg-slate-100 p-1 pl-3 justify-between rounded-md">
        <>
          <span className="text-indigo-800 font-semibold">{name}</span>
          <AddDateModal
            date={date}
            id={id}
            setShowAddMyFirstModal={setShowAddMyFirstModal}
          />
        </>
      </div>
    )
  );
};

export default MyFirstField;
