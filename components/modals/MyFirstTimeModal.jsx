import { useState, useEffect } from "react";
import ModalTitle from "../text/ModalTitle";
import CloseButton from "../buttons/CloseButton";
import Modal from "./Portal";
import { CgSmileMouthOpen } from "react-icons/cg";
import { database } from "../../lib/firebase";
import {
  doc,
  setDoc,
  getDoc,
  deleteField,
  updateDoc,
} from "firebase/firestore";
import { useFiles } from "../../context/FilesContext";
import { useAuth } from "../../context/AuthContext";
import Icon from "../buttons/Icon";

const MyFirstTime = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, updateFormData] = useState({});
  const [formDataFromDb, setFormDataFromDb] = useState({});
  const { pid } = useFiles();
  const { user } = useAuth();

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    console.log(formData);
  };

  const handleSubmit = () => {
    saveNote();
  };

  const handleDelete = async (e) => {
    const infoRef = doc(database, `${user.uid}/${pid}/info/myFirst`);
    // Remove the 'capital' field from the document
    await updateDoc(infoRef, {
      [e.currentTarget.name]: deleteField(),
    });
    getInfo();
  };

  const saveNote = async () => {
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
  };

  const getInfo = async () => {
    const docRef = doc(database, `${user.uid}/${pid}/info/myFirst`);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setFormDataFromDb(docSnap.data());
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  };

  useEffect(() => {
    getInfo();
  }, []);
  return (
    <>
      {!showModal && (
        <button
          onClick={() => {
            setShowModal(true);
            if (typeof window != "undefined" && window.document) {
              document.body.style.overflow = "hidden";
            }
          }}
          className="bg-pink-400 z-30
  p-3 rounded-full shadow hover:shadow-lg outline-none focus:outline-none"
          type="button"
        >
          <CgSmileMouthOpen size={35} className="text-white" />
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
              className={`flex justify-end p-2 duration-500 ease-out-expo absolute z-20 right-0 bottom-0 w-full ${
                showModal ? "translate-y-0" : "translate-y-[100%]"
              }`}
            >
              <div className="flex w-full sm:w-420 border-0 rounded-lg p-3 shadow-lg relative gap-3 flex-col bg-white outline-none focus:outline-none">
                <div className="flex justify-between">
                  <ModalTitle title="My First times" />
                  <CloseButton
                    showModal={showModal}
                    setShowModal={setShowModal}
                  />
                </div>
                <div className="flex gap-3">
                  {!formDataFromDb.firstTeeth ? (
                    <>
                      <input
                        className="flex-grow"
                        type="text"
                        name="firstTeeth"
                        id="teeth"
                        placeholder="My first teeth"
                        onChange={handleChange}
                      />
                      <button
                        className="bg-indigo-800 cursor-pointer text-white rounded-lg flex items-center justify-center aspect-square h-full hover:bg-blue-500 duration-300 ease-out-expo"
                        onClick={handleSubmit}
                      >
                        <Icon icon={"arrow"} />
                      </button>
                    </>
                  ) : (
                    <>
                      <span className="flex-grow items-center flex">
                        {formDataFromDb.firstTeeth}
                      </span>
                      <button
                        className="bg-slate-50 cursor-pointer text-white rounded-lg py-2 flex items-center justify-center aspect-square h-full hover:bg-red-500 duration-300 ease-out-expo"
                        onClick={handleDelete}
                        name="firstTeeth"
                      >
                        <Icon icon={"delete"} xClass="text-slate-500" />
                      </button>
                    </>
                  )}
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
