import { useState } from "react";
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
    <article className="flex flex-col h-full lg:hover:scale-105 transform duration-300 ease-out-expo lg:hover:drop-shadow-xl">
      <div className="relative">
        <FileModal file={file} index={index} />
      </div>
      <div className="flex justify-between gap-2 bg-slate-50 rounded-b-md p-2">
        <div className="flex flex-col flex-grow justify-center bg-blue-50 p-2 rounded-md">
          <span className="font-medium text-xs text-indigo-900 mb-1">
            {dateOfFile}
          </span>
          <span className="font-medium text-xs text-indigo-900">
            {dateValue()}
          </span>
        </div>
        <div className="flex flex-col">
          <NotesModal file={file} index={index} />
          {file?.notes?.mood && (
            <span className="font-medium text-xs text-indigo-900 self-end">
              Feeling <span className="text-xl">{file.notes.mood}</span>
            </span>
          )}
          {file?.notes?.location && (
            <span className="font-medium text-xs text-indigo-900 self-end bg-indigo-100 rounded-md p-2">
              {file.notes.location.split(",")[0]}
            </span>
          )}
        </div>
      </div>
    </article>
  );
};

export default FileCard;
