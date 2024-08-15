import LayoutDefault from "../components/layouts/LayoutDefault";
import NavLinkPrimary from "../components/buttons/NavLinkPrimary";
import GraphBanner from "../components/lottie/graph/GraphBanner";
import { useAuth } from "../context/AuthContext";
import { CgSpinner } from "react-icons/cg";
import Link from "next/link";
import { useBabies } from "../context/BabiesContext";
import useGridClasses from "../utils/gridClasses";
import ClothesDetection from "../components/ClothesDetection/ClothesDetection";

const Home = () => {
  const { user } = useAuth();
  const { babiesDataList } = useBabies();
  const classesGrid = useGridClasses();

  return (
    <LayoutDefault>
      <div className="p-5">
        <h1 className="text-4xl sm:text-7xl uppercase font-extrabold text-center">
          <span className="_linear-wipe inline-block">
            your private <br />
            digital journal
          </span>
        </h1>
      </div>
      <section>
        {user ? (
          <div className="sm:mx-10 lg:mx-20 mt-2.5 sm:mt-10 flex flex-col justify-center  items-center">
            <h3 className="text-center px-7 p-1.5 text-indigo-800 bg-slate-100 rounded-full font-medium mx-5 text-xl">
              Timelines
            </h3>
            <div
              className={`grid ${classesGrid} mx-auto gap-2.5 sm:gap-6 place-items-center p-2.5 sm:p-4`}
            >
              {babiesDataList?.map((baby) => (
                <Link href={`/timeline/${baby.id}`} key={baby.id}>
                  <div className="relative cursor-pointer aspect-square h-auto sm:h-32 lg:h-40 rounded-xl overflow-hidden group flex items-center justify-center">
                    {baby.url ? (
                      <>
                        <img
                          src={baby.url}
                          alt=""
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
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <div className="h-[150px] lg:h-[300px] backdrop-blur-sm flex-col gap-7 flex items-center justify-center rounded-lg">
            <h3 className="text-center font-medium text-xl">
              How about a break from sharing! <br />
              Follow the progress of your loved ones
            </h3>
            <div className="flex gap-4">
              <NavLinkPrimary
                exact
                url="/signup"
                label="Create an account"
                xClass="px-6 py-2 md:px-10 md:py-4 rounded-md"
              />
              <NavLinkPrimary
                exact
                url="/login"
                label="Login"
                xClass="px-6 py-2 md:px-10 md:py-4 rounded-md"
              />
            </div>
          </div>
        )}

        <div className="grid sm:grid-cols-3 gap-8 mt-2.5 sm:mt-5">
          <div className="aspect-square bg-slate-100 border-indigo-800 border-2 shadow-lg rounded-xl overflow-hidden">
            <GraphBanner />
          </div>
          <div className="aspect-square bg-slate-100 rounded-xl">
            <ClothesDetection />
          </div>
          <div className="aspect-square bg-slate-100 rounded-xl"></div>
        </div>
      </section>
    </LayoutDefault>
  );
};

export default Home;
