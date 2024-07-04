import { useState, useEffect } from "react";
import { database } from "../lib/firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

const dbInstance = collection(database, "notes");

export default function NoteOperations() {
  const [isInputVisible, setInputVisible] = useState(false);
  const [noteTitle, setNoteTitle] = useState("");
  const [noteDesc, setNoteDesc] = useState("");
  const [notesArray, setNotesArray] = useState([]);

  useEffect(() => {
    getNotes();
  }, []);

  const inputToggle = () => {
    setInputVisible(!isInputVisible);
  };

  const saveNote = async () => {
    try {
      await addDoc(dbInstance, {
        noteTitle: noteTitle,
        noteDesc: noteDesc,
      });
      setNoteTitle("");
      setNoteDesc("");
      getNotes();
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const getNotes = async () => {
    try {
      const data = await getDocs(dbInstance);
      const notes = data.docs.map((item) => ({ ...item.data(), id: item.id }));
      setNotesArray(notes);
    } catch (error) {
      console.error("Error fetching documents: ", error);
    }
  };

  return (
    <>
      <div>
        <button className="_button-auth" onClick={inputToggle}>
          Add a New Note
        </button>
      </div>

      {isInputVisible && (
        <div>
          <input
            className=""
            placeholder="Enter the Title.."
            onChange={(e) => setNoteTitle(e.target.value)}
            value={noteTitle}
          />
          <textarea
            className=""
            placeholder="Enter the Description.."
            onChange={(e) => setNoteDesc(e.target.value)}
            value={noteDesc}
          />
          <button onClick={saveNote} className="">
            Save Note
          </button>
        </div>
      )}

      <div>
        {notesArray.map((note) => (
          <div key={note.id}>
            <h3>{note.noteTitle}</h3>
            <p>{note.noteDesc}</p>
          </div>
        ))}
      </div>
    </>
  );
}
