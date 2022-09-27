import LayoutDefault from "../components/layouts/LayoutDefault";
import PageTitle from "../components/text/PageTitle";
import AddBabyModal from "../components/modals/AddBabyModal";
import FilesContextProvider from "../context/FilesContext";
import BabiesContextProvider from "../context/BabiesContext";
import BabiesGrid from "../components/BabiesGrid";

const Dashboard = () => {
  return (
    <LayoutDefault>
      <FilesContextProvider>
        <BabiesContextProvider>
          <PageTitle title={"Dashboard"} />
          <section className="max-w-[600px] mx-auto mt-6">
            <h2 className="text-center">Family members</h2>
            <div className="grid grid-cols-1 lg:grid-cols-4 w-full gap-6 mt-4">
              <AddBabyModal />
              <BabiesGrid />
            </div>
          </section>
        </BabiesContextProvider>
      </FilesContextProvider>
    </LayoutDefault>
  );
};

export default Dashboard;
