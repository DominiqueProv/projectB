import { useEffect } from "react";
import ModalTitle from "../text/ModalTitle";
import CloseButton from "../buttons/CloseButton";
import Modal from "./Portal";
import { CgSpinner } from "react-icons/cg";
import { GoTrophy } from "react-icons/go";
import MyFirstFieldTimeline from "../MyFirstsTimes/MyFirstFieldTimeline";
import { myFirstfields } from "../../data/my_first_fields";
import { useMyFirst } from "../../context/MyFirstContext";
import { useBabies } from "../../context/BabiesContext";
import { formattedDate } from "../../utils/date";
import { BsCalendarHeart } from "react-icons/bs";
import AddFirstTimesModal from "./AddFirstTimesModal";
import AddFirstTimesCustomModal from "./AddFirstTimesCustomModal";
import useModal from "../../hooks/useModal";

const MyFirstTime = () => {
  const { isDeleting, getInfo, formDataFromDb } = useMyFirst();
  const { babyData } = useBabies();
  const { isOpen, openModal, closeModal, modalRef } = useModal();

  const dob = new Date(babyData?.date?.seconds * 1000);
  const formattedDob = formattedDate(dob);

  useEffect(() => {
    if (isOpen) {
      getInfo();
    }
  }, [isOpen]);

  // Dynamic height calculation to avoid 100vh issue on mobile
  useEffect(() => {
    const setCorrectHeight = () => {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };

    window.addEventListener("resize", setCorrectHeight);
    window.addEventListener("orientationchange", setCorrectHeight);

    // Initial call
    setCorrectHeight();

    return () => {
      window.removeEventListener("resize", setCorrectHeight);
      window.removeEventListener("orientationchange", setCorrectHeight);
    };
  }, []);

  // Convert formDataFromDb object to array of objects
  const formDataArray = Object.keys(formDataFromDb).map((key) => ({
    ...formDataFromDb[key],
    id: key,
  }));

  // Helper function to group items by year
  const groupByYear = (items) => {
    const grouped = items.reduce((acc, item) => {
      const year = new Date(item.date.seconds * 1000).getFullYear();
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
      {!isOpen && (
        <button
          onClick={openModal}
          className="bg-blue-50 aspect-square h-[50px] w-[50px] border-2 border-blue-400 group p-3 rounded-xl outline-none focus:outline-none"
          type="button"
        >
          <GoTrophy size={25} className="text-blue-400 _scale-rotate" />
        </button>
      )}

      <Modal>
        {isOpen && (
          <>
            <div
              onClick={closeModal}
              className="inset-0 fixed bg-black bg-opacity-30 z-20 backdrop-blur-sm"
            ></div>
            <aside
              className="flex justify-end p-2 duration-500 ease-out-expo fixed z-20 inset-0"
              ref={modalRef}
            >
              <div className="flex flex-col w-full lg:w-[70vw] h-[calc(var(--vh, 1vh)*100-15px)] border-0 rounded-lg shadow-lg relative bg-white outline-none focus:outline-none">
                <div className="flex justify-between p-3 border-b border-gray-200">
                  <ModalTitle title="First times" />
                  <CloseButton showModal={isOpen} setShowModal={closeModal} />
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
                  className={`flex-grow flex flex-col p-3 overflow-y-auto ${
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
                <div className="flex justify-end p-3 border-t border-gray-200 w-full gap-3 sm:gap-5">
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
