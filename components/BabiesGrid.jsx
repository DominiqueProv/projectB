import { useEffect, useState } from "react";
import { useBabies } from "../context/BabiesContext";
import { CgSpinner } from "react-icons/cg";
import Link from "next/link";

const BabiesGrid = () => {
  const { babiesDataList } = useBabies();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (babiesDataList) {
      setIsLoading(false);
    }
  }, [babiesDataList]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <CgSpinner className="animate-spin" color={"dodgerblue"} size={40} />
      </div>
    );
  }

  return (
    <>
      {babiesDataList?.map((baby) => (
        <div className="flex justify-center" key={baby.id}>
          <Link
            href={`/timeline/${baby.id}`}
            className="relative cursor-pointer aspect-square rounded-xl group overflow-hidden flex items-center justify-center max-w-40"
          >
            {baby.url ? (
              <>
                <img
                  src={baby.url}
                  alt={baby.name}
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-indigo-800/50 duration-300 opacity-0 group-hover:opacity-100"></div>
                <span className="flex items-center justify-center w-full text-center lg:opacity-0 font-semibold bg-gradient-to-t lg:from-transparent from-black/30 text-slate-100 lg:group-hover:opacity-100 lg:duration-300 absolute bottom-0 lg:top-[50%] lg:left-[50%] lg:-translate-x-[50%] lg:-translate-y-[50%]">
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
          </Link>
        </div>
      ))}
    </>
  );
};

export default BabiesGrid;
