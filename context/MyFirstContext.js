import {
  useContext,
  createContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useFiles } from "./FilesContext";
import { useAuth } from "./AuthContext";
import { database } from "../lib/firebase";
import {
  doc,
  setDoc,
  getDoc,
  deleteField,
  updateDoc,
} from "firebase/firestore";

const MyFirstContext = createContext({});

export const useMyFirst = () => useContext(MyFirstContext);

const MyFirstContextProvider = ({ children }) => {
  const [formData, updateFormData] = useState({});
  const [formDataFromDb, setFormDataFromDb] = useState({});
  const [id, setId] = useState("");
  const [isReadyToUpload, setIsReadyToUpload] = useState(false);
  const { pid } = useFiles();
  const { user } = useAuth();
  const [date, onChange] = useState(new Date());

  const handleDelete = async (e) => {
    const infoRef = doc(database, `${user.uid}/${pid}/info/myFirst`);
    await updateDoc(infoRef, {
      [e.currentTarget.name]: deleteField(),
    });
    getInfo();
  };

  const saveNote = useCallback(async () => {
    const docRef = doc(database, `${user.uid}/${pid}/info/myFirst`);
    await setDoc(docRef, formData, {
      merge: true,
    });
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setFormDataFromDb(docSnap.data());
    } else {
      console.log("No such document!");
    }
    setIsReadyToUpload(false);
  }, [formData, user, pid]);

  const getInfo = useCallback(async () => {
    const docRef = doc(database, `${user.uid}/${pid}/info/myFirst`);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setFormDataFromDb(docSnap.data());
    } else {
      console.log("No such document!");
    }
  }, []);

  useEffect(() => {
    if (isReadyToUpload) {
      updateFormData((prev) => ({
        ...prev,
        [id]: date,
      }));
    }
  }, [isReadyToUpload, date, id]);

  useEffect(() => {
    saveNote();
  }, [formData, saveNote]);

  useEffect(() => {
    getInfo();
  }, [getInfo]);

  return (
    <MyFirstContext.Provider
      value={{
        date,
        formData,
        formDataFromDb,
        onChange,
        updateFormData,
        getInfo,
        handleDelete,
        saveNote,
        setId,
        setIsReadyToUpload,
      }}
    >
      {children}
    </MyFirstContext.Provider>
  );
};

export default MyFirstContextProvider;
