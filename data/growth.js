import { useFiles } from "../context/FilesContext";
import { formatDateShort } from "../utils/date";

const lengthForAge = [
  {
    age: 1,
    3: 51,
    15: 53,
    50: 55,
    85: 57,
    97: 58,
  },
  {
    age: 2,
    3: 55,
    15: 57,
    50: 59,
    85: 60,
    97: 62,
  },
  {
    age: 3,
    3: 57,
    15: 59,
    50: 61,
    85: 63,
    97: 65,
  },
  {
    age: 4,
    3: 59,
    15: 62,
    50: 64,
    85: 66,
    97: 68,
  },
];

const Growth = () => {
  const { filesData } = useFiles();
  const data = filesData
    ?.filter(
      (item) =>
        (item.notes && item.notes.weigth) || (item.notes && item.notes.height)
    )
    .map((item) => item.notes)
    .reverse();
  const updatedData = data?.map((item) => ({
    ...item,
    dateCreated: formatDateShort(item.dateCreated),
  }));
  return updatedData;
};

export default Growth;
