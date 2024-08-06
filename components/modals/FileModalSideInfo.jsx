import React from "react";
import { TbFileDescription, TbMoodHappy } from "react-icons/tb";
import { MdOutlinePlace, MdOutlineMonitorWeight } from "react-icons/md";
import { AiOutlineColumnHeight } from "react-icons/ai";
import EditableField from "../text/EditableField";

const FileModalSideInfo = ({ file, fileIndex }) => {
  const { notes } = file;

  const infoItems = [
    {
      condition: true,
      icon: <TbFileDescription size={18} />,
      label: "Description",
      value: notes?.description,
      bgColor: "bg-blue-100",
      valueBgColor: "bg-blue-200",
      noteType: "description",
    },
    {
      condition: true,
      icon: <MdOutlinePlace size={18} />,
      label: "Location",
      value: notes?.location,
      bgColor: "bg-teal-100",
      valueBgColor: "bg-teal-200",
      noteType: "location",
    },
    {
      condition: true,
      icon: <TbMoodHappy size={18} />,
      label: "Mood",
      value: notes?.mood,
      bgColor: "bg-indigo-100",
      valueBgColor: "bg-indigo-200",
      noteType: "mood",
    },
    {
      condition: true,
      icon: <AiOutlineColumnHeight size={18} />,
      label: "Height (cm)",
      value: notes?.height ? `${notes?.height} cm` : "",
      bgColor: "bg-gray-100",
      valueBgColor: "bg-gray-200",
      noteType: "height",
    },
    {
      condition: true,
      icon: <MdOutlineMonitorWeight size={18} />,
      label: "Weight (kg)",
      value: notes?.weight ? `${notes?.weight} kg` : "",
      bgColor: "bg-white",
      valueBgColor: "bg-gray-100",
      noteType: "weight",
    },
  ];

  return (
    <ul className="space-y-2 overflow-auto lg:max-h-[70vh] rounded-md">
      {infoItems.map(
        (item, index) =>
          item.condition && (
            <li
              key={index}
              className={`${item.bgColor} p-2 rounded-md flex flex-col gap-2`}
            >
              <span className="flex items-center gap-2 text-sm font-semibold">
                {item.icon}
                {item.label}
              </span>
              <span className={`${item.valueBgColor} rounded-md p-1`}>
                <EditableField
                  file={file}
                  fileIndex={fileIndex}
                  notes={notes}
                  noteType={item.noteType}
                  noteValue={item.value}
                  isTitle={item.noteType === "title"}
                />
              </span>
            </li>
          )
      )}
    </ul>
  );
};

export default FileModalSideInfo;
