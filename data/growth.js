import { useFiles } from "../context/FilesContext";
import { formatDate } from "../utils/date";

const Growth = () => {
  const { filesData } = useFiles();
  const data = filesData
    .filter(
      (item) =>
        (item.notes && item.notes.weigth) || (item.notes && item.notes.height)
    )
    .map((item) => item.notes)
    .reverse();
  console.log(data);
  const updatedData = data.map((item) => ({
    ...item,
    dateCreated: formatDate(item.dateCreated),
  }));
  return updatedData;
};

export default Growth;
