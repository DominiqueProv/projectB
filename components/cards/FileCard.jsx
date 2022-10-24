import Medias from "../../components/Medias";
import { formatDate } from "../../utils/date";
import { FaRegCalendarAlt } from "react-icons/fa";
import NotesModal from "../modals/NotesModal";
import FileModal from "../modals/FileModal";

const FileCard = ({ file, index, dob }) => {
  const dateOfFile = formatDate(file?.metadata?.customMetadata?.originalDate);
  const ONEDAY = 1000 * 60 * 60 * 24;
  const differenceMs =
    file?.metadata?.customMetadata?.originalDate - dob.seconds * 1000;
  const differenceInDays = Math.round(differenceMs / ONEDAY);

  return (
    <article className="flex flex-col">
      <div className="w-full lg:aspect-video rounded-t-md overflow-hidden group relative">
        <FileModal file={file} index={index} />
        {file && <Medias file={file} />}
      </div>
      <div className="flex justify-between group items-center bg-indigo-50 p-2 rounded-b-md">
        <div className="flex gap-2">
          <FaRegCalendarAlt size={15} className="text-blue-300" />
          <span className="font-bold text-xs">
            {dateOfFile} <br />
            {`${differenceInDays} day${differenceInDays > 1 ? "s" : ""} old`}
          </span>
        </div>
        <NotesModal file={file} index={index} />
      </div>
    </article>
  );
};

export default FileCard;
