import { useBabies } from "../context/BabiesContext";
import { CgSpinner } from "react-icons/cg";

const BabiesGrid = () => {
  const { babiesDataList } = useBabies();

  return (
    <>
      {babiesDataList?.map((baby, i) => {
        return (
          <a
            href={`timeline?id=${baby.id}`}
            key={i}
            className="relative cursor-pointer aspect-square rounded-xl group overflow-hidden flex items-center justify-center"
          >
            {baby.url ? (
              <>
                <img
                  src={baby.url}
                  alt=""
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-indigo-800/50 duration-300 opacity-0 group-hover:opacity-100"></div>
                <span className="opacity-0 font-semibold text-slate-100 group-hover:opacity-100 duration-300 absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]">
                  {baby.name}
                </span>
              </>
            ) : (
              <CgSpinner
                className="animate-spin"
                color={"dodgerblue"}
                size={20}
              />
            )}
          </a>
        );
      })}
    </>
  );
};

export default BabiesGrid;
