import MemberTimeline from "../components/MemberTimeline";
import LayoutSignedIn from "../components/layouts/LayoutSignedIn";
import { FaPhotoVideo } from "react-icons/fa";
import PageTitle from "../components/text/PageTitle";
import MyFirstTime from "../components/modals/MyFirstTimeModal";
import MyFirstContextProvider from "../context/MyFirstContext";
import GrowthCurveModal from "../components/modals/GrowthCurveModal";

const TimelineFeed = () => {
  return (
    <LayoutSignedIn>
      <PageTitle title={"Timeline"}>
        <FaPhotoVideo className="text-indigo-500" size={25} />
      </PageTitle>
      <MemberTimeline />
      <div className="fixed z-20 bottom-0 left-0 right-2 flex justify-end p-3">
        <MyFirstContextProvider>
          <MyFirstTime />
        </MyFirstContextProvider>
      </div>
      <div className="fixed z-20 bottom-0 left-0 right-20 flex justify-end p-3">
        <MyFirstContextProvider>
          <GrowthCurveModal />
        </MyFirstContextProvider>
      </div>
    </LayoutSignedIn>
  );
};

export default TimelineFeed;
