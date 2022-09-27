import { useEffect } from "react";
import { useBabies } from "../context/BabiesContext";
import { CgSpinner } from "react-icons/cg";

const BabiesGrid = () => {
  const { getBabies, babiesDataList, isUpload } = useBabies();

  useEffect(() => {
    getBabies();
  }, []);

  return (
    <>
      {babiesDataList?.map((doc, i) => {
        return (
          <a
            href={`timeline?id=${doc.id}`}
            key={i}
            className="relative cursor-pointer aspect-square rounded-xl group overflow-hidden flex items-center justify-center"
          >
            {doc.url ? (
              <>
                <img
                  src={doc.url}
                  alt=""
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-indigo-800/50 duration-300 opacity-0 group-hover:opacity-100"></div>
                <span className="opacity-0 font-semibold text-slate-100 group-hover:opacity-100 duration-300 absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]">
                  {doc.name}
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
