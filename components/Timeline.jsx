import { formatDate } from "../utils/date";

const Timeline = ({ files }) => {
  return (
    <div className="hidden sm:block sticky top-0 w-72 h-full rounded-md bg-indigo-100 p-3 font-bold">
      {files.length > 0 ? (
        <ul>
          {files.map((file, index) => (
            <li key={file.metadata.customMetadata.originalDate + index}>
              {formatDate(file.metadata.customMetadata.originalDate)}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

export default Timeline;
