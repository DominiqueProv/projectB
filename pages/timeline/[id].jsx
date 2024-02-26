import { useEffect, useState } from "react";
import MemberTimeline from "../../components/MemberTimeline";
import LayoutDefault from "../../components/layouts/LayoutDefault";
import { database } from "../../lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import MyFirstTime from "../../components/modals/MyFirstTimeModal";
import MyFirstContextProvider from "../../context/MyFirstContext";
import GrowthCurveHeightModal from "../../components/modals/GrowthCurveHeightModal";
import GrowthCurveWeightModal from "../../components/modals/GrowthCurveWeightModal";
import { useRouter } from "next/router";
import { useAuth } from "../../context/AuthContext";
import { useFiles } from "../../context/FilesContext";
import UploadButton from "../../components/buttons/UploadButton";

const TimelineFeed = () => {
  const { filesData, setFilesData, getFiles } = useFiles();
  const [babyData, setBabyData] = useState();
  const router = useRouter();
  const { user } = useAuth();
  const url = window.location.pathname.split("/").pop();

  const getBabyData = async (babyId) => {
    const docRef = doc(database, `${user.uid}/${babyId}`);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setBabyData(docSnap.data());
    } else {
      console.log("No such document!");
    }
  };

  useEffect(() => {
    if (router.isReady) {
      const id = router.query.id;
      if (!id) return null;
      setFilesData([]);
      getFiles(id);
      getBabyData(id);
    }
  }, [router.isReady, url]);

  return (
    <LayoutDefault>
      <MemberTimeline babyData={babyData} filesData={filesData} />
      <div className="fixed z-20 bottom-0 right-2 flex justify-end p-3">
        <UploadButton />
        <MyFirstContextProvider>
          <MyFirstTime />
        </MyFirstContextProvider>
      </div>
      <div className="fixed z-20 bottom-0 right-20 flex justify-end gap-3 p-3">
        <MyFirstContextProvider>
          <GrowthCurveHeightModal />
          <GrowthCurveWeightModal />
        </MyFirstContextProvider>
      </div>
    </LayoutDefault>
  );
};

export default TimelineFeed;
