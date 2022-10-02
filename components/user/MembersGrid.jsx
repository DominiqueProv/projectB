import { useBabies } from "../../context/BabiesContext";
import DeleteMemberModal from "../modals/DeleteMemberModal";
import SectionTitle from "../text/SectionTitle";
import UpdateMemberButton from "../buttons/UpdateMemberButton";
import Icon from "../buttons/Icon";

const MembersGrid = () => {
  const { babiesDataList } = useBabies();

  return (
    <section
      className={
        "w-full rounded-md bg-slate-100/30 flex-grow flex flex-col gap-y-5 p-3 md:p-5"
      }
    >
      <SectionTitle title="Babies List" />
      {babiesDataList
        ? babiesDataList.map((baby, i) => {
            return (
              <div
                key={i}
                className="bg-slate-100 rounded-md p-3 flex flex-col md:flex-row md:items-center gap-3 md:gap-0 justify-between"
              >
                <a
                  className="flex gap-3 items-center"
                  href={`timeline?id=${baby.id}`}
                >
                  <img
                    src={baby.url + "?" + Math.random()}
                    className={`rounded-full overflow-hidden object-cover flex-shrink-0 w-12 h-12`}
                    alt={"user avatar"}
                  />
                  <span className="text-xl font-semibold">{baby.name}</span>
                  <Icon icon={"arrow"} size={25} xClass="text-indigo-800" />
                </a>
                <div className="flex gap-3 justify-between md:justify-end">
                  <UpdateMemberButton index={i} />
                  <DeleteMemberModal baby={baby} />
                </div>
              </div>
            );
          })
        : null}
    </section>
  );
};

export default MembersGrid;
