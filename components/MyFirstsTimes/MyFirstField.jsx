import React from "react";
import AddDateModal from "../modals/AddDateModal";
import { useMyFirst } from "../../context/MyFirstContext";

const colors = ["#3730a3", "#6366f1", "#90d8e4", "#f472b6", "#3730a3"];

const MyFirstField = ({ item, setShowAddMyFirstModal, index }) => {
  const { id, name, description, funFact } = item;
  const { date, formDataFromDb } = useMyFirst();

  const hasData = formDataFromDb[id];

  return (
    !hasData && (
      <div
        className="flex gap-3 items-center p-1 pl-3 justify-between rounded-md"
        style={{
          borderColor: colors[index % colors.length],
          borderWidth: "2px",
          borderStyle: "solid",
        }}
      >
        <>
          <span className="text-indigo-800 font-semibold relative group">
            {name}
            <div className="text-xs text-slate-500">
              <p>{description}</p>
              <p>{funFact}</p>
            </div>
          </span>
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
