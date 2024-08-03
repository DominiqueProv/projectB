import { useState, useEffect } from "react";
import ModalTitle from "../text/ModalTitle";
import CloseButton from "../buttons/CloseButton";
import Modal from "./Portal";
import { CgSmileMouthOpen, CgSpinner } from "react-icons/cg";
import MyFirstFieldTimeline from "../MyFirstsTimes/MyFirstFieldTimeline";
import { myFirstfields } from "../../data/my_first_fields";
import { useMyFirst } from "../../context/MyFirstContext";
import { useBabies } from "../../context/BabiesContext";
import { formattedDate } from "../../utils/date";
import { BsCalendarHeart } from "react-icons/bs";
import AddFirstTimesModal from "./AddFirstTimesModal";
import AddFirstTimesCustomModal from "./AddFirstTimesCustomModal";

const MyFirstTime = () => {
  const [showModal, setShowModal] = useState(false);
  const { isDeleting, getInfo, formDataFromDb } = useMyFirst();
  const { babyData } = useBabies();

  const dob = new Date(babyData?.date?.seconds * 1000);
  const formattedDob = formattedDate(dob);

  useEffect(() => {
    const close = (e) => {
      if (e.keyCode === 27) {
        setShowModal(false);
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);

  // Convert formDataFromDb object to array of objects
  const formDataArray = Object.keys(formDataFromDb).map((key) => ({
    ...formDataFromDb[key],
    id: key,
  }));

  // Helper function to group items by year
  const groupByYear = (items) => {
    const grouped = items.reduce((acc, item) => {
      const year = new Date(item.seconds * 1000).getFullYear();
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(item);
      return acc;
    }, {});
    return grouped;
  };

  const groupedItems = groupByYear(formDataArray);

  // Map the keys in myFirstfields to the corresponding items in groupedItems
  const mappedFields = Object.keys(groupedItems).reduce((acc, year) => {
    acc[year] = groupedItems[year].map((item) => {
      const field = myFirstfields.find((field) => field.id === item.id);
      return { ...item, ...field };
    });
    return acc;
  }, {});

  return (
    <>
      {!showModal && (
        <button
          onClick={() => {
            setShowModal(true);
            getInfo();
            if (typeof window !== "undefined" && window.document) {
              document.body.style.overflow = "hidden";
            }
          }}
          className="bg-white z-30 group p-3 rounded-xl shadow hover:shadow-lg outline-none focus:outline-none"
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
              className={`flex justify-end p-2 duration-500 ease-out-expo fixed z-20 inset-0`}
            >
              <div className="flex w-full lg:w-[70vw] h-[calc(100vh-15px)] border-0 rounded-lg shadow-lg relative flex-col bg-white outline-none focus:outline-none">
                <div className="flex justify-between p-3 border-b border-gray-200">
                  <ModalTitle title="First times" />
                  <CloseButton
                    showModal={showModal}
                    setShowModal={setShowModal}
                  />
                </div>

                <div className="w-full flex flex-col items-center justify-center text-center font-semibold bg-gray-100 py-5">
                  <div className="flex gap-3 p-2 bg-indigo-50 rounded-md">
                    <BsCalendarHeart size={20} color={"indigo"} />
                    <span className="text-indigo-950">Date of birth</span>
                  </div>
                  <span>{formattedDob}</span>
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
                  className={`flex flex-col p-3 max-h-[calc(100vh-30px)] overflow-y-auto ${
                    isDeleting ? "hidden" : "block"
                  }`}
                >
                  {Object.keys(mappedFields).map((year) => (
                    <div key={year}>
                      <div className="text-md font-bold mt-4 bg-gray-50 rounded-md p-2">
                        {year}
                      </div>
                      {mappedFields[year].map((item, index) => (
                        <div
                          key={item.id}
                          className={`w-full flex ${
                            index % 2 === 0 ? "justify-start" : "justify-end"
                          }`}
                        >
                          <MyFirstFieldTimeline item={item} />
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
                <div className="flex justify-end p-3 border-t border-gray-200 w-full gap-5">
                  <AddFirstTimesModal myFirstfields={myFirstfields} />
                  <AddFirstTimesCustomModal />
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
