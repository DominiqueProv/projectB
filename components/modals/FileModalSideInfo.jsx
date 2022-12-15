import { TbFileDescription } from "react-icons/tb";
import { TbMoodHappy } from "react-icons/tb";
import { MdOutlinePlace } from "react-icons/md";
import { AiOutlineColumnHeight } from "react-icons/ai";
import { MdOutlineMonitorWeight } from "react-icons/md";

const FileModalSideInfo = ({ notes }) => {
  return (
    <ul className="space-y-2 lg:overflow-auto lg:max-h-[65vh] rounded-md">
      {notes && (
        <>
          {notes.description && (
            <li className="bg-blue-100 p-2 rounded-md flex flex-col gap-2">
              <span className="flex items-center gap-2 text-sm font-semibold">
                <TbFileDescription size={18} />
                Informations
              </span>
              <span className="bg-blue-200 rounded-md p-1">
                {notes.description}
              </span>
            </li>
          )}
          {notes.location && (
            <li className="bg-teal-100 p-2 rounded-md flex flex-col gap-2">
              <span className="flex items-center gap-2 text-sm font-semibold">
                <MdOutlinePlace size={18} />
                Location
              </span>
              <span className="bg-teal-200 rounded-md p-1">
                {notes.location}
              </span>
            </li>
          )}
          {notes.mood && (
            <li className="bg-indigo-100 p-2 rounded-md flex flex-col gap-2">
              <span className="flex items-center gap-2 text-sm font-semibold">
                <TbMoodHappy size={18} />
                Mood
              </span>
              <span className="bg-indigo-200 rounded-md p-1">{notes.mood}</span>
            </li>
          )}
          {notes.height && (
            <li className="bg-gray-100 p-2 rounded-md flex flex-col gap-2">
              <span className="flex items-center gap-2 text-sm font-semibold">
                <AiOutlineColumnHeight size={18} />
                Height
              </span>
              <span className="bg-gray-200 rounded-md p-1">
                {notes.height} cm
              </span>
            </li>
          )}
          {notes.weight && (
            <li className="bg-white p-2 rounded-md flex flex-col gap-2">
              <span className="flex items-center gap-2 text-sm font-semibold">
                <MdOutlineMonitorWeight size={18} />
                Weight
              </span>
              <span className="bg-gray-100 rounded-md p-1">
                {notes.weight} kg
              </span>
            </li>
          )}
        </>
      )}
    </ul>
  );
};

export default FileModalSideInfo;
