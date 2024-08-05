import React from "react";
import AddDateModal from "../modals/AddDateModal";
import { useMyFirst } from "../../context/MyFirstContext";

const MyFirstField = ({ item, setShowAddMyFirstModal }) => {
  const { id, name, description, funFact } = item;
  const { formDataFromDb } = useMyFirst();

  const hasData = formDataFromDb[id];

  return (
    !hasData && (
      <div className="rounded-md p-2 border-2 border-[#90d8e4]">
        <div className="flex items-center justify-between gap-3">
          <span className="text-indigo-800 font-semibold relative group leading-5">
            {name}
          </span>
          <AddDateModal
            id={id}
            setShowAddMyFirstModal={setShowAddMyFirstModal}
          />
        </div>
        <div className="text-xs font-light text-slate-500 mt-2">
          <p className="font-medium">{description}</p>
          <p>{funFact}</p>
        </div>
      </div>
    )
  );
};

export default MyFirstField;
