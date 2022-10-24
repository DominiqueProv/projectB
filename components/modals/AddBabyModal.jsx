import { useState, useRef } from "react";
import { IoMdClose } from "react-icons/io";
import { v4 } from "uuid";
import { useBabies } from "../../context/BabiesContext";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { useAuth } from "../../context/AuthContext";
import { storage, database } from "../../lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import Icon from "../buttons/Icon";
import Modal from "./Portal";
import Calendar from "react-calendar";
import ButtonPrimary from "../buttons/ButtonPrimary";
import ModalTitle from "../text/ModalTitle";

const AddBabyModal = () => {
  const { setIsUpload, reload, setReload } = useBabies();
  const { user } = useAuth();
  const [babiesData, setBabiesData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [date, onChange] = useState(new Date());
  const [file, setFile] = useState([]);
  const inputFileRef = useRef();
  const babyId = `${babiesData.name}-${user.uid}`;

  const uploadBabyAvatar = async () => {
    const ext = file[0].name.split(".").pop();
    const fileRef = ref(storage, `${user.uid}/babiesAvatar/${babyId}.${ext}`);
    setIsUpload(true);
    const snapshot = await uploadBytes(fileRef, file[0]);
    const photoURL = await getDownloadURL(fileRef);
    babiesData.url = photoURL;
  };

  const saveBabyData = async () => {
    const docRef = doc(database, `${user.uid}/${babyId}`);
    await setDoc(docRef, babiesData, {
      merge: true,
    });
  };

  const handleChangeAvatar = (e) => {
    if (e.target.files) {
      setFile(e.target.files);
    }
  };

  const handleChangeFile = (e) => {
    setBabiesData({
      ...babiesData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowModal(false);
    babiesData.date = date;
    await uploadBabyAvatar();
    saveBabyData();
    setIsUpload(false);
    setReload(!reload);
  };

  return (
    <>
      <button
        onClick={() => {
          setShowModal(true);
          if (typeof window != "undefined" && window.document) {
            document.body.style.overflow = "hidden";
          }
        }}
        className={
          "border-2 p-3 group aspect-square w-full rounded-lg border-indigo-800 flex justify-center items-center duration-300 ease-out-expo relative space-x-2"
        }
        type="button"
      >
        <Icon
          icon={"add"}
          xClass={
            "text-indigo-800 scale-75 group-hover:scale-100 duration-300 "
          }
          size={50}
        />
      </button>
      <Modal>
        {showModal && (
          <>
            <div
              onClick={() => {
                setShowModal(false);
                document.body.style.overflow = "unset";
              }}
              className={`inset-0 fixed bg-black bg-opacity-30 z-40 backdrop-blur-sm ${
                showModal ? "block" : "hidden"
              }`}
            ></div>
            <div className="fixed z-40 top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]">
              <div className="flex w-[90vw] sm:w-[420px] rounded-lg p-3 relative flex-col bg-white">
                <div className="flex justify-between items-center">
                  <ModalTitle title="Add a bambino" />
                  <button
                    onClick={() => {
                      setShowModal(false);
                      document.body.style.overflow = "unset";
                    }}
                    className="bg-blue-200 self-end z-30 p-2 rounded-full shadow hover:shadow-lg outline-none focus:outline-none"
                    type="button"
                  >
                    <IoMdClose
                      size={25}
                      className="text-indigo-800 hover:rotate-[90deg] ease-out-expo duration-200"
                    />
                  </button>
                </div>
                <form
                  action=""
                  className="space-y-3 flex flex-col mt-5"
                  onSubmit={handleSubmit}
                >
                  <input
                    type="text"
                    name="name"
                    placeholder={"Baby's name"}
                    onChange={handleChangeFile}
                    required
                  />

                  <div className="flex gap-3">
                    <div className="flex flex-col w-full">
                      <label htmlFor="signUpPassword">Add baby avatar</label>
                      <input
                        className="rounded-md w-full"
                        type="file"
                        ref={inputFileRef}
                        onChange={handleChangeAvatar}
                        accept=".png, .jpeg"
                        required
                      />
                    </div>
                  </div>
                  <div className="rounded-lg border-indigo-800 border-[1px] overflow-hidden">
                    <div className="text-slate-100 bg-indigo-800  uppercase font-semibold text-xs px-2 py-3">
                      Date of birth
                    </div>
                    <Calendar onChange={onChange} value={date} />
                  </div>
                  <ButtonPrimary
                    xClass={"w-full"}
                    label={"Add to the family"}
                    type={"submit"}
                  ></ButtonPrimary>
                </form>
              </div>
            </div>
          </>
        )}
      </Modal>
    </>
  );
};

export default AddBabyModal;
