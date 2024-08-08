import LayoutDefault from "../components/layouts/LayoutDefault";
import AddBabyModal from "../components/modals/AddBabyModal";
import BabiesGrid from "../components/BabiesGrid";
import { useBabies } from "../context/BabiesContext";
import { CgSpinner } from "react-icons/cg";
import useGridClasses from "../utils/gridClasses";

const Dashboard = () => {
  const { isUpload } = useBabies();

  return (
    <LayoutDefault isDark>
      <section className="max-w-[600px] mx-auto pt-6">
        <h2 className="text-center _linear-wipe font-bold text-3xl sm:text-5xl">
          Your Family Members
        </h2>
        <div className="flex justify-center mt-5">
          <AddBabyModal />
        </div>
        <div
          className={`grid ${useGridClasses()} mx-auto gap-2 sm:gap-6 mt-12`}
        >
          {!isUpload ? (
            <BabiesGrid />
          ) : (
            <CgSpinner
              className="animate-spin"
              color={"dodgerblue"}
              size={20}
            />
          )}
        </div>
      </section>
    </LayoutDefault>
  );
};

export default Dashboard;
