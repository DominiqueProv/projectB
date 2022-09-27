import LayoutDefault from "../components/layouts/LayoutDefault";
import PageTitle from "../components/text/PageTitle";
import AddBabyModal from "../components/modals/AddBabyModal";
import BabiesGrid from "../components/BabiesGrid";

const Dashboard = () => {
  return (
    <LayoutDefault>
      <PageTitle title={"Dashboard"} />
      <section className="max-w-[600px] mx-auto mt-6">
        <h2 className="text-center">Your Family Members</h2>
        <div className="grid grid-cols-1 lg:grid-cols-4 w-full gap-6 mt-4">
          <AddBabyModal />
          <BabiesGrid />
        </div>
      </section>
    </LayoutDefault>
  );
};

export default Dashboard;
