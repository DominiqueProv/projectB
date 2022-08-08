import { formatDate } from "../utils/date";

const Timeline = ({ files }) => {
  return (
    <div className="hidden sm:block sticky top-0 w-72 h-full rounded-md bg-indigo-100 p-3 font-bold">
      {files.length ? (
        <ul className="">
          {files.map((file, i) => {
            return (
              <li key={i}>
                {formatDate(file.metadata.customMetadata.originalDate)}
              </li>
            );
          })}
        </ul>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Timeline;
