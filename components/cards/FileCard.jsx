import Medias from "../../components/Medias";
import { formatDate } from "../../utils/date";
import { BsCalendar3 } from "react-icons/bs";
import NotesModal from "../modals/NotesModal";
import FileModal from "../modals/FileModal";

const FileCard = ({ file, index, dob }) => {
  const dateOfFile = formatDate(file?.metadata?.customMetadata?.originalDate);
  const ONEDAY = 1000 * 60 * 60 * 24;
  const differenceMs =
    file?.metadata?.customMetadata?.originalDate - dob?.seconds * 1000;
  const differenceInDays = Math.round(differenceMs / ONEDAY);
  const dateValue = () => {
    if (differenceInDays > 60 && differenceInDays < 365) {
      return `${Math.floor(differenceInDays / 30)} month${
        differenceInDays / 30 > 1 ? "s" : ""
      } old`;
    } else if (differenceInDays / 30 > 12) {
      return `${Math.floor(differenceInDays / 365)} year${
        differenceInDays / 365 > 1 ? "s" : ""
      } old`;
    } else {
      return `${differenceInDays} day${differenceInDays > 1 ? "s" : ""} old`;
    }
  };

  return (
    <article className="flex flex-col lg:hover:scale-105 transform duration-300 ease-out-expo lg:hover:drop-shadow-xl">
      <div className="w-full lg:aspect-card rounded-t-md overflow-hidden group relative">
        <FileModal file={file} index={index} />
        {file && <Medias file={file} />}
      </div>
      <div className="flex justify-between items-center bg-slate-100 p-2 rounded-b-md">
        <div className="flex gap-2">
          <BsCalendar3 size={14} className="text-blue-300" />
          <span className="font-medium text-xs text-indigo-900">
            {dateOfFile} <br />
            {dateValue()}
          </span>
        </div>
        <NotesModal file={file} index={index} />
      </div>
    </article>
  );
};

export default FileCard;
