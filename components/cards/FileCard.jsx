import Medias from "../../components/Medias";
import ButtonSecondary from "../buttons/ButtonSecondary";
import { formatDate } from "../../utils/date";
import { FaRegCalendarAlt } from "react-icons/fa";
import { RiDeleteBack2Line } from "react-icons/ri";

const FileCard = ({ file, deleteFile }) => {
  return (
    <div className="flex flex-col space-y-3">
      <div className="w-full aspect-video relative rounded-md overflow-hidden">
        {file && <Medias file={file} />}
      </div>
      <div className="flex justify-between items-center bg-indigo-50 p-2 rounded-md">
        <div className="flex gap-2">
          <FaRegCalendarAlt size={18} className="text-blue-500" />
          <span className="font-bold text-sm">
            {formatDate(file.metadata.customMetadata.originalDate)}
          </span>
        </div>
        <ButtonSecondary handleClick={() => deleteFile(file)} label={"Delete"}>
          <RiDeleteBack2Line
            size={15}
            className="text-blue-500 flex-shrink-0"
          />
        </ButtonSecondary>
      </div>
    </div>
  );
};

export default FileCard;
