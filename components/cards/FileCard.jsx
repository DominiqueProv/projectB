import { useState, useEffect } from "react";
import Medias from "../../components/Medias";
import { formatDate } from "../../utils/date";
import { FaRegCalendarAlt } from "react-icons/fa";
import NotesModal from "../modals/NotesModal";
import FileModal from "../modals/FileModal";
import { doc, getDoc } from "firebase/firestore";
import { database } from "../../lib/firebase";

const FileCard = ({ file, deleteFile }) => {
  const [notes, setNotes] = useState({});

  const getNote = async (file) => {
    const fileRefName = file.metadata.name.split(".")[0];
    const docRef = doc(database, `notes/${fileRefName}`);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setNotes({ ...docSnap.data() });
    } else {
      console.log("No such document!");
    }
  };

  useEffect(() => {
    getNote(file);
  }, [file]);

  return (
    <article className="flex flex-col">
      <div className="w-full aspect-video rounded-t-md overflow-hidden group relative">
        <FileModal
          file={file}
          notes={notes}
          deleteFile={deleteFile}
          getNote={getNote}
        />
        {file && <Medias file={file} />}
      </div>
      <div className="flex justify-between group items-center bg-indigo-50 p-2 rounded-b-md">
        <div className="flex gap-2">
          <FaRegCalendarAlt size={15} className="text-blue-300" />
          <span className="font-bold text-xs">
            {formatDate(file?.metadata?.customMetadata?.originalDate)}
          </span>
        </div>
        <NotesModal file={file} notes={notes} />
      </div>
    </article>
  );
};

export default FileCard;
