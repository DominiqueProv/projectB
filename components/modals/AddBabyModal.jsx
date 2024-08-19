import { useState, useRef } from "react";
import { IoMdClose } from "react-icons/io";
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
import imageCompression from "browser-image-compression";
import useModal from "../../hooks/useModal";

const AddBabyModal = () => {
  const { setIsUpload, reload, setReload } = useBabies();
  const { user } = useAuth();
  const [babiesData, setBabiesData] = useState({ date: new Date() });
  const [file, setFile] = useState(null);
  const inputFileRef = useRef();
  const babyId = `${babiesData.name}-${user.uid}`;
  const { isOpen, openModal, closeModal, modalRef } = useModal();

  const handleFileUpload = async (file) => {
    const ext = file.name.split(".").pop();
    const fileRef = ref(storage, `${user.uid}/babiesAvatar/${babyId}.${ext}`);
    setIsUpload(true);

    const options = {
      maxSizeMB: 1,
      useWebWorker: true,
      maxWidthOrHeight: 160,
    };

    try {
      const processedFile =
        file.size > 1048576 ? await imageCompression(file, options) : file;

      const snapshot = await uploadBytes(fileRef, processedFile);
      const photoURL = await getDownloadURL(fileRef);
      return photoURL;
    } catch (error) {
      console.error("Error uploading the image:", error);
      return null;
    } finally {
      setIsUpload(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBabiesData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUpload(true); // Start showing the spinner when uploading begins

    if (file) {
      const photoURL = await handleFileUpload(file);
      if (photoURL) {
        setBabiesData((prevData) => ({ ...prevData, url: photoURL }));
      }
    }

    // Save baby data to Firestore
    const docRef = doc(database, `${user.uid}/${babyId}`);
    await setDoc(docRef, babiesData, { merge: true });

    // Close modal and reset state
    closeModal();
    document.body.style.overflow = "unset";
    setReload(!reload);
    resetForm();

    setIsUpload(false); // Ensure the spinner is hidden after the upload process
  };

  const resetForm = () => {
    setBabiesData({ date: new Date() });
    setFile(null);
    inputFileRef.current.value = "";
  };

  const handleAvatarChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  return (
    <>
      <button
        onClick={openModal}
        className="p-3 group aspect-square h-16 rounded-full flex justify-center items-center duration-300 ease-out-expo relative space-x-2 bg-indigo-800"
        type="button"
      >
        <Icon
          icon="add"
          xClass="text-white scale-75 group-hover:scale-100 duration-300"
          size={50}
        />
      </button>

      <Modal>
        {isOpen && (
          <>
            <div
              onClick={closeModal}
              className="inset-0 fixed bg-black bg-opacity-30 z-40 backdrop-blur-sm"
            ></div>

            <div
              className="fixed z-40 top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]"
              ref={modalRef}
            >
              <div className="flex w-[90vw] sm:w-[420px] rounded-lg p-3 relative flex-col bg-white">
                <div className="flex justify-between items-center">
                  <ModalTitle title="Add a loved one" />
                  <button
                    onClick={closeModal}
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
                  className="space-y-3 flex flex-col mt-5"
                  onSubmit={handleSubmit}
                >
                  <input
                    type="text"
                    name="name"
                    placeholder="Baby's name"
                    onChange={handleChange}
                    required
                  />

                  <div className="flex gap-3">
                    <div className="flex flex-col w-full">
                      <label htmlFor="babyAvatar">Add baby avatar</label>
                      <input
                        className="rounded-md w-full"
                        type="file"
                        ref={inputFileRef}
                        onChange={handleAvatarChange}
                        accept=".png, .jpeg"
                        required
                      />
                    </div>
                  </div>

                  <div className="rounded-lg border-indigo-800 border-[1px] overflow-hidden">
                    <div className="text-slate-100 bg-indigo-800 uppercase font-semibold text-xs px-2 py-3">
                      Date of birth
                    </div>
                    <Calendar
                      onChange={(date) =>
                        setBabiesData((prevData) => ({ ...prevData, date }))
                      }
                      value={babiesData.date}
                    />
                  </div>

                  <ButtonPrimary
                    xClass="w-full"
                    label="Add to the family"
                    type="submit"
                  />
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
