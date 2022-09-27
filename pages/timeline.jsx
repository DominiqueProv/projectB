import FileOperation from "../components/FileOperation";
import LayoutDefault from "../components/layouts/LayoutDefault";
import { FaPhotoVideo } from "react-icons/fa";
import PageTitle from "../components/text/PageTitle";

const TimelineFeed = () => {
  return (
    <LayoutDefault>
      <PageTitle title={"Timeline"}>
        <FaPhotoVideo className="text-indigo-500" size={25} />
      </PageTitle>
      <FileOperation />
    </LayoutDefault>
  );
};

export default TimelineFeed;
