import { createContext, useContext, useState, useEffect } from "react";
import { database, storage } from "../lib/firebase";
import { useAuth } from "../context/AuthContext";
import { collection, query, getDocs, doc, deleteDoc } from "firebase/firestore";
import { ref, deleteObject, listAll } from "firebase/storage";

const BabiesContext = createContext({});
export const useBabies = () => useContext(BabiesContext);

const BabiesContextProvider = ({ children }) => {
  const { user } = useAuth();
  const [babiesDataList, setBabiesDataList] = useState([]);
  const [babiesData, setBabiesData] = useState({});
  const [isUpload, setIsUpload] = useState(false);
  const [reload, setReload] = useState(false);

  const getBabies = async () => {
    if (!user) {
      return;
    }
    const q = query(collection(database, `${user.uid}`));
    const querySnapshot = await getDocs(q);
    const babiesList = [];
    querySnapshot.forEach((doc) => {
      babiesList.push({ ...doc.data(), id: doc.id });
    });
    setBabiesDataList(babiesList);
  };

  const deleteBaby = async (uid, baby) => {
    const pid = baby?.id;
    const file = baby?.url?.split("%2F").pop().split("?")[0];
    await deleteDoc(doc(database, `${uid}/${pid}`));

    const listRef = ref(storage, `${uid}/${pid}`);
    const res = await listAll(listRef);
    const promises = res.items.map((item) => deleteObject(item));
    await Promise.all(promises);

    if (file) {
      const avatarRef = ref(storage, `${uid}/babiesAvatar/${file}`);
      await deleteObject(avatarRef);
    }

    setReload(!reload);
  };

  useEffect(() => {
    getBabies();
  }, [user, reload]);

  return (
    <BabiesContext.Provider
      value={{
        isUpload,
        babiesData,
        babiesDataList,
        setBabiesData,
        setBabiesDataList,
        setIsUpload,
        getBabies,
        deleteBaby,
        reload,
        setReload,
      }}
    >
      {children}
    </BabiesContext.Provider>
  );
};

export default BabiesContextProvider;
