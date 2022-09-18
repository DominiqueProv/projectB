import NoteOperation from "../components/NoteOperation";
import FileOperation from "../components/FileOperation";
import LayoutDefault from "../components/layouts/LayoutDefault";
import { FaPhotoVideo } from "react-icons/fa";

const TimelineFeed = () => {
  return (
    <LayoutDefault>
      <header className="flex items-center justify-center space-x-3 bg-blue-100 rounded-md p-2">
        <FaPhotoVideo className="text-indigo-500" size={25} />
        <h1 className="_title-xl">Timeline</h1>
      </header>
      <hr />
      <section className="mt-10">
        <FileOperation />
      </section>
    </LayoutDefault>
  );
};

export default TimelineFeed;
