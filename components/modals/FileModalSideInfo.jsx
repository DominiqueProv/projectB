import { TbFileDescription, TbMoodHappy } from "react-icons/tb";
import { MdOutlinePlace, MdOutlineMonitorWeight } from "react-icons/md";
import { AiOutlineColumnHeight } from "react-icons/ai";

const FileModalSideInfo = ({ notes }) => {
  if (!notes) return null;

  const infoItems = [
    {
      condition: notes.description,
      icon: <TbFileDescription size={18} />,
      label: "Description",
      value: notes.description,
      bgColor: "bg-blue-100",
      valueBgColor: "bg-blue-200",
    },
    {
      condition: notes.location,
      icon: <MdOutlinePlace size={18} />,
      label: "Location",
      value: notes.location,
      bgColor: "bg-teal-100",
      valueBgColor: "bg-teal-200",
    },
    {
      condition: notes.mood,
      icon: <TbMoodHappy size={18} />,
      label: "Mood",
      value: notes.mood,
      valueClass: "text-3xl",
      bgColor: "bg-indigo-100",
      valueBgColor: "bg-indigo-200",
    },
    {
      condition: notes.height,
      icon: <AiOutlineColumnHeight size={18} />,
      label: "Height",
      value: `${notes.height} cm`,
      bgColor: "bg-gray-100",
      valueBgColor: "bg-gray-200",
    },
    {
      condition: notes.weight,
      icon: <MdOutlineMonitorWeight size={18} />,
      label: "Weight",
      value: `${notes.weight} kg`,
      bgColor: "bg-white",
      valueBgColor: "bg-gray-100",
    },
  ];

  return (
    <ul className="space-y-2 lg:overflow-auto lg:max-h-[65vh] rounded-md">
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
              <span
                className={`${item.valueBgColor} rounded-md p-1 ${
                  item.valueClass || ""
                }`}
              >
                {item.value}
              </span>
            </li>
          )
      )}
    </ul>
  );
};

export default FileModalSideInfo;
