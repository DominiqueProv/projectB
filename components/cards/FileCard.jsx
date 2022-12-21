import { useState } from "react";
import { formatDate } from "../../utils/date";
import { BsCalendar3 } from "react-icons/bs";
import NotesModal from "../modals/NotesModal";
import FileModal from "../modals/FileModal";
import { MouseParallaxContainer } from "react-parallax-mouse";

const FileCard = ({ file, index, dob }) => {
  const [showModal, setShowModal] = useState(false);
  console.log(file);

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
    <article className="flex flex-col h-full lg:hover:scale-105 transform duration-300 ease-out-expo lg:hover:drop-shadow-xl">
      <MouseParallaxContainer
        enabled={showModal ? false : true}
        resetOnLeave
        className="parallax w-full lg:aspect-card rounded-t-md overflow-hidden group relative"
      >
        <FileModal
          file={file}
          index={index}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      </MouseParallaxContainer>
      <div className="flex justify-between items-center bg-slate-100 p-2 rounded-b-md">
        <div className="flex gap-2">
          <BsCalendar3 size={14} className="text-blue-300" />
          <span className="font-medium text-xs text-indigo-900">
            {dateOfFile} <br />
            {dateValue()}
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <NotesModal file={file} index={index} />
          {file?.notes?.mood && (
            <span className="font-medium text-xs text-indigo-900">
              Mood <span className="text-xl">{file.notes.mood}</span>
            </span>
          )}
        </div>
      </div>
    </article>
  );
};

export default FileCard;
