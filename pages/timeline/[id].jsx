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
import { useBabies } from "../../context/BabiesContext";
import UploadButton from "../../components/buttons/UploadButton";
import MenuModal from "../../components/modals/MenuModal";
import { useMediaQuery } from "react-responsive";

const TimelineFeed = () => {
  const { filesData, setFilesData, getFiles } = useFiles();
  const { babyData, setBabyData } = useBabies();
  const router = useRouter();
  const { user } = useAuth();
  const babyId = router.query.id;

  const getBabyData = async (id) => {
    try {
      const docRef = doc(database, `${user.uid}/${id}`);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setBabyData(docSnap.data());
      } else {
        console.error("No such document!");
      }
    } catch (error) {
      console.error("Error fetching baby data:", error);
    }
  };

  useEffect(() => {
    if (router.isReady && babyId) {
      setFilesData([]);
      getFiles(babyId);
      getBabyData(babyId);
    }
  }, [router.isReady, babyId]);

  const [isScrolledPast, setIsScrolledPast] = useState(false);
  const isDesktop = useMediaQuery({ minWidth: 1024 });
  useEffect(() => {
    const handleScroll = () => {
      const h2Element = document.getElementById("timeline-heading");
      if (h2Element) {
        const bounding = h2Element.getBoundingClientRect();
        if (bounding.bottom < 0) {
          setIsScrolledPast(true);
        } else {
          setIsScrolledPast(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <LayoutDefault>
      <MemberTimeline babyData={babyData} filesData={filesData} />
      <div className="backdrop-blur-lg fixed z-20 bottom-0 flex justify-between items-center p-3 left-0 right-0 bg-white/70">
        <UploadButton />
        {isDesktop && (
          <div
            className={`flex gap-5 items-center duration-500 ${
              isScrolledPast
                ? "translate-y-0 opacity-100"
                : "translate-y-[150%] opacity-0"
            }`}
          >
            <h2 className="text-2xl _linear-wipe">
              {babyData && `${babyData?.name}'s timeline`}
            </h2>
            <MenuModal isScrolledPast isDesktop={isDesktop} />
          </div>
        )}
        <div
          className={`duration-500 flex gap-3 ${
            isScrolledPast
              ? "translate-y-0"
              : !isDesktop
              ? "translate-x-[60px]"
              : ""
          }`}
        >
          <MyFirstContextProvider>
            <MyFirstTime />
          </MyFirstContextProvider>
          <MyFirstContextProvider>
            <GrowthCurveHeightModal />
            <GrowthCurveWeightModal />
          </MyFirstContextProvider>
          {!isDesktop && (
            <div>
              <MenuModal isScrolledPast isDesktop={isDesktop} />
            </div>
          )}
        </div>
      </div>
    </LayoutDefault>
  );
};

export default TimelineFeed;
