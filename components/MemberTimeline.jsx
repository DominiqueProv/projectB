import { useEffect, useState } from "react";
import { useFiles } from "../context/FilesContext";
import FileCard from "./cards/FileCard";
import UploadButton from "./buttons/UploadButton";
import { useRouter } from "next/router";
import { database } from "../lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";

const MemberTimeline = () => {
  const { filesData, getFiles } = useFiles();
  const [babyData, setBabyData] = useState();
  const router = useRouter();
  const { user } = useAuth();

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
      const { id } = router.query;
      if (!id) return null;
      getFiles(id);
      getBabyData(id);
    }
  }, [router.isReady]);

  return (
    <section className="mt-10">
      <h2 className="mb-5">
        {filesData.length
          ? `Add memories to ${babyData.name}'s story`
          : "Start by adding some memories"}
      </h2>
      <div className="flex lg:mt-10 gap-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 w-full gap-6">
          <UploadButton />
          {filesData
            ? filesData
                .sort(
                  (a, b) =>
                    b?.metadata?.customMetadata?.originalDate -
                    a?.metadata?.customMetadata?.originalDate
                )
                .map((file, i) => {
                  return (
                    <FileCard
                      file={file}
                      key={i}
                      index={i}
                      dob={babyData.date}
                    />
                  );
                })
            : null}
        </div>
      </div>
    </section>
  );
};

export default MemberTimeline;
