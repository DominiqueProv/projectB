import React from "react";
import { useBabies } from "../../context/BabiesContext";
import DeleteMemberModal from "../modals/DeleteMemberModal";
import SectionTitle from "../text/SectionTitle";

const MembersGrid = () => {
  const { babiesDataList } = useBabies();
  console.log(babiesDataList);
  return (
    <section
      className={
        "w-full rounded-md bg-slate-100/30 flex-grow flex flex-col gap-y-5 p-5"
      }
    >
      <SectionTitle title="Babies List" />
      {babiesDataList
        ? babiesDataList.map((baby, i) => {
            return (
              <div
                key={i}
                className="bg-slate-100 rounded-md p-3 flex items-center justify-between"
              >
                <div className="flex gap-3 items-center">
                  <img
                    src={baby.url + "?" + Math.random()}
                    className={`rounded-full overflow-hidden object-cover flex-shrink-0 w-16 h-16`}
                    alt={"user avatar"}
                  />
                  <span className="text-xl font-semibold">{baby.name}</span>
                </div>
                <DeleteMemberModal />
              </div>
            );
          })
        : null}
    </section>
  );
};

export default MembersGrid;
