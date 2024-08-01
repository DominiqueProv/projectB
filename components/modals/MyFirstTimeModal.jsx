import { useState, useEffect } from "react";
import ModalTitle from "../text/ModalTitle";
import CloseButton from "../buttons/CloseButton";
import Modal from "./Portal";
import { CgSmileMouthOpen } from "react-icons/cg";
import MyFirstFieldTimeline from "../MyFirstsTimes/MyFirstFieldTimeline";
import { myFirstfields } from "../../data/my_first_fields";
import { CgSpinner } from "react-icons/cg";
import { useMyFirst } from "../../context/MyFirstContext";
import { useBabies } from "../../context/BabiesContext";
import { formattedDate } from "../../utils/date";
import AddFirstTimesModal from "./AddFirstTimesModal";

const MyFirstTime = () => {
  const [showModal, setShowModal] = useState(false);
  const { isDeleting, getInfo } = useMyFirst();
  const { babyData } = useBabies();

  const date = new Date(babyData?.date?.seconds * 1000);

  const formattedDob = formattedDate(date);

  useEffect(() => {
    const close = (e) => {
      if (e.keyCode === 27) {
        setShowModal(false);
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);

  return (
    <>
      {!showModal && (
        <button
          onClick={() => {
            setShowModal(true);
            getInfo();
            if (typeof window != "undefined" && window.document) {
              document.body.style.overflow = "hidden";
            }
          }}
          className="bg-white z-30 group
  p-3 rounded-xl shadow hover:shadow-lg outline-none focus:outline-none"
          type="button"
        >
          <CgSmileMouthOpen size={35} className="text-pink-400 _scale-rotate" />
        </button>
      )}

      <Modal>
        {showModal && (
          <>
            <div
              onClick={() => {
                setShowModal(false);
                document.body.style.overflow = "unset";
              }}
              className={`inset-0 fixed bg-black bg-opacity-30 z-20 backdrop-blur-sm ${
                showModal ? "block" : "hidden"
              }`}
            ></div>
            <aside
              className={`flex justify-end p-2 duration-500 ease-out-expo fixed z-20 right-0 bottom-0`}
            >
              <div className="flex w-[calc(100vw-15px)] h-[calc(100vh-15px)] border-0 rounded-lg p-3 shadow-lg relative gap-3 flex-col bg-white outline-none focus:outline-none">
                <div className="flex justify-between">
                  <ModalTitle title="First times" />
                  <CloseButton
                    showModal={showModal}
                    setShowModal={setShowModal}
                  />
                </div>
                <div
                  className={`flex-grow min-h-[504px] flex justify-center items-center ${
                    isDeleting ? "block" : "hidden"
                  }`}
                >
                  <CgSpinner
                    className="animate-spin"
                    color={"dodgerblue"}
                    size={40}
                  />
                </div>
                <div
                  className={` flex flex-col gap-2 ${
                    isDeleting ? "hidden" : "block"
                  }`}
                >
                  <div className="w-full text-center">
                    Date of birth {formattedDob}
                  </div>
                  {myFirstfields.map((item) => (
                    <MyFirstFieldTimeline key={item.id} item={item} />
                  ))}
                </div>
                <div className="absolute bottom-3 right-3">
                  <AddFirstTimesModal myFirstfields={myFirstfields} />
                </div>
              </div>
            </aside>
          </>
        )}
      </Modal>
    </>
  );
};

export default MyFirstTime;
