import { createContext, useContext, useState } from "react";
import { database } from "../lib/firebase";
import { useAuth } from "../context/AuthContext";
import { collection, query, getDocs } from "firebase/firestore";

const BabiesContext = createContext({});

export const useBabies = () => useContext(BabiesContext);

const BabiesContextProvider = ({ children }) => {
  const { user } = useAuth();
  const [babiesDataList, setBabiesDataList] = useState([]);
  const [babiesData, setBabiesData] = useState({});
  const [isUpload, setIsUpload] = useState(false);

  const getBabies = async () => {
    const q = query(collection(database, `${user.uid}`));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setBabiesDataList((prev) => [...prev, { ...doc.data(), id: doc.id }]);
    });
  };

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
      }}
    >
      {children}
    </BabiesContext.Provider>
  );
};

export default BabiesContextProvider;
