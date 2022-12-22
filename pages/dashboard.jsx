import LayoutDefault from "../components/layouts/LayoutDefault";
import AddBabyModal from "../components/modals/AddBabyModal";
import BabiesGrid from "../components/BabiesGrid";
import { useBabies } from "../context/BabiesContext";

const Dashboard = () => {
  const { babiesDataList } = useBabies();
  return (
    <LayoutDefault>
      <section className="max-w-[600px] mx-auto mt-6">
        <h2 className="text-center _linear-wipe font-bold text-3xl">
          Your Family Members
        </h2>
        <div
          className={`grid ${
            babiesDataList?.length > 0
              ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 w-[70vw] lg:w-full lg:mx-0"
              : "grid-cols-1 w-[35vw] md:w-[20vw] lg:w-[10vw]"
          } mx-auto gap-6 mt-4`}
        >
          <AddBabyModal />
          <BabiesGrid />
        </div>
      </section>
    </LayoutDefault>
  );
};

export default Dashboard;
