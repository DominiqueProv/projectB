import Medias from "../../components/Medias";
import ButtonSecondary from "../buttons/ButtonSecondary";
import { formatDate } from "../../utils/date";
import { FaRegCalendarAlt } from "react-icons/fa";
import NotesModal from "../modals/NotesModal";
import FileModal from "../modals/FileModal";

const FileCard = ({ file }) => {
  return (
    <article className="flex flex-col">
      <div className="w-full aspect-video relative rounded-t-md overflow-hidden group">
        <FileModal file={file} />
        {file && <Medias file={file} />}
      </div>
      <div className="flex justify-between group items-center bg-indigo-50 p-2 rounded-b-md">
        <div className="flex gap-2">
          <FaRegCalendarAlt size={15} className="text-blue-300" />
          <span className="font-bold text-xs">
            {formatDate(file.metadata.customMetadata.originalDate)}
          </span>
        </div>
        <NotesModal file={file} />
      </div>
    </article>
  );
};

export default FileCard;
