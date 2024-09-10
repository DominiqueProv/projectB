import { useBabies } from "../../context/BabiesContext";
import DeleteMemberModal from "../modals/DeleteMemberModal";
import SectionTitle from "../text/SectionTitle";
import UpdateMemberButton from "../buttons/UpdateMemberButton";
import Icon from "../buttons/Icon";
import Link from "next/link";
import NavLinkPrimary from "../buttons/NavLinkPrimary";

const MembersGrid = () => {
  const { babiesDataList } = useBabies();

  return (
    <>
      {babiesDataList.length > 0 && (
        <section
          className={
            "w-full rounded-md bg-slate-100/30 flex-grow flex flex-col gap-y-5 p-3 sm:p-5"
          }
        >
          <SectionTitle title="Babies List" />
          {babiesDataList?.map((baby, i) => {
            return (
              <div
                key={i}
                className="sm:bg-slate-100 sm:rounded-md sm:p-3 flex flex-col sm:flex-row sm:items-center justify-between relative"
              >
                <Link
                  href={`/timeline/${baby.id}`}
                  key={i}
                  className="flex justify-between gap-3 bg-slate-100 rounded-md p-3 items-center group sm:bg-transparent sm:rounded-none sm:p-0"
                >
                  <img
                    src={baby.url + "?" + Math.random()}
                    className={`rounded-full overflow-hidden object-cover flex-shrink-0 w-12 h-12`}
                    alt={"user avatar"}
                  />
                  <div className="flex gap-3 items-center">
                    <span className="text-xl font-semibold">{baby.name}</span>
                    <Icon
                      icon={"arrow"}
                      size={25}
                      xClass="text-indigo-800 group-hover:translate-x-1 duration-100"
                    />
                  </div>
                </Link>
                <div className="flex gap-3 sm:justify-end">
                  <UpdateMemberButton index={i} />
                  <DeleteMemberModal baby={baby} />
                </div>
              </div>
            );
          })}
          <NavLinkPrimary
            exact
            url="/dashboard"
            label="Add a family member"
            xClass="px-5 lg:px-10 rounded-md justify-center self-start"
          >
            <Icon icon="members" />
          </NavLinkPrimary>
        </section>
      )}
    </>
  );
};

export default MembersGrid;
