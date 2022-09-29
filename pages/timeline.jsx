import FileOperation from "../components/FileOperation";
import LayoutSignedIn from "../components/layouts/LayoutSignedIn";
import { FaPhotoVideo } from "react-icons/fa";
import PageTitle from "../components/text/PageTitle";

const TimelineFeed = () => {
  return (
    <LayoutSignedIn>
      <PageTitle title={"Timeline"}>
        <FaPhotoVideo className="text-indigo-500" size={25} />
      </PageTitle>
      <FileOperation />
    </LayoutSignedIn>
  );
};

export default TimelineFeed;
