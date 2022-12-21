import LayoutSignedIn from "../components/layouts/LayoutSignedIn";
import AddBabyModal from "../components/modals/AddBabyModal";
import BabiesGrid from "../components/BabiesGrid";

const Dashboard = () => {
  return (
    <LayoutSignedIn>
      <section className="max-w-[600px] mx-auto mt-6">
        <h2 className="text-center _linear-wipe font-bold text-3xl">
          Your Family Members
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 w-[70vw] lg:w-full mx-auto lg:mx-0 gap-6 mt-4">
          <AddBabyModal />
          <BabiesGrid />
        </div>
      </section>
    </LayoutSignedIn>
  );
};

export default Dashboard;
