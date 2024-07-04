import LayoutDefault from "../components/layouts/LayoutDefault";
import NavLinkPrimary from "../components/buttons/NavLinkPrimary";
import GraphBanner from "../components/lottie/graph/GraphBanner";
import { useAuth } from "../context/AuthContext";
import { CgSpinner } from "react-icons/cg";
import Link from "next/link";
import { useBabies } from "../context/BabiesContext";
import useGridClasses from "../utils/gridClasses";

const Home = () => {
  const { user } = useAuth();
  const { babiesDataList } = useBabies();
  const classesGrid = useGridClasses();

  return (
    <LayoutDefault>
      <h1 className="mb-5 text-7xl uppercase font-extrabold text-center">
        <span className="_linear-wipe inline-block">
          your private <br />
          digital journal
        </span>{" "}
        🥳
      </h1>
      <section>
        {user ? (
          <div className=" my-10 sm:my-20 flex flex-col justify-center items-center bg-slate-100 sm:bg-transparent sm:border-none sm:shadow-none sm:rounded-none border-indigo-800 border-2 shadow-lg rounded-xl p-4">
            <h3 className="text-center font-medium text-xl">
              Visit one of your loved one timeline.
            </h3>
            <div
              className={`grid ${classesGrid} mx-auto gap-6 place-items-center mt-4`}
            >
              {babiesDataList?.map((baby) => (
                <Link href={`/timeline/${baby.id}`} key={baby.id}>
                  <div className="relative cursor-pointer aspect-square h-20 lg:h-32 rounded-full overflow-hidden group flex items-center justify-center">
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

        <div className="grid sm:grid-cols-3 gap-8 my-8">
          <div className="aspect-square bg-slate-100 border-indigo-800 border-2 shadow-lg rounded-xl overflow-hidden">
            <GraphBanner />
          </div>
          <div className="aspect-square bg-slate-100 rounded-xl"></div>
          <div className="aspect-square bg-slate-100 rounded-xl"></div>
        </div>
      </section>
    </LayoutDefault>
  );
};

export default Home;
