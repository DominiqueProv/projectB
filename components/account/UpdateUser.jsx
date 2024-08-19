import { useState, useRef } from "react";
import ButtonPrimary from "../buttons/ButtonPrimary";
import { useAuth } from "../../context/AuthContext";
import { storage } from "../../lib/firebase";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import SectionTitle from "../text/SectionTitle";
import { CgSpinner } from "react-icons/cg";
import { HiOutlineUserCircle } from "react-icons/hi";
import Icon from "../buttons/Icon";
import imageCompression from "browser-image-compression";

const UpdateUser = () => {
  const inputFileRef = useRef();
  const inputUserNameRef = useRef();
  const { user, updateUser, setUser } = useAuth();
  const [state, setState] = useState({
    file: null,
    isUpload: false,
  });

  const isDisabled =
    state.isUpload || (!state.file && !inputUserNameRef.current?.value);

  const handleChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setState((prevState) => ({ ...prevState, file: selectedFile }));
    }
  };

  const compressAndUploadFile = async (file) => {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 100,
      useWebWorker: true,
    };

    const compressedFile = await imageCompression(file, options);
    const ext = compressedFile.name.split(".").pop();
    const fileRef = ref(storage, `${user.uid}/userAvatar/${user.uid}.${ext}`);

    setState((prevState) => ({ ...prevState, isUpload: true }));

    try {
      await uploadBytes(fileRef, compressedFile);
      const photoURL = await getDownloadURL(fileRef);
      return photoURL;
    } catch (error) {
      console.error("File upload error:", error.message);
    } finally {
      setState((prevState) => ({ ...prevState, isUpload: false }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userName = inputUserNameRef.current.value;
    let updatedPhotoURL = user.photoURL;

    if (state.file) {
      updatedPhotoURL = await compressAndUploadFile(state.file);
    }

    if (userName || state.file) {
      await updateUser(userName || user.displayName, updatedPhotoURL);
      setUser((prevUser) => ({
        ...prevUser,
        displayName: userName || prevUser.displayName,
        photoURL: updatedPhotoURL,
      }));
    }

    resetForm();
  };

  const resetForm = () => {
    setState({ file: null, isUpload: false });
    inputFileRef.current.value = "";
    inputUserNameRef.current.value = "";
  };

  const handleDeleteAvatar = async () => {
    await updateUser(user.displayName, "");
    setUser((prevUser) => ({ ...prevUser, photoURL: "" }));
  };

  return (
    <form
      className="w-full rounded-md bg-slate-100/30 flex flex-col gap-y-5 p-3 md:p-5"
      onSubmit={handleSubmit}
    >
      <SectionTitle title="Manage" />

      <div className="flex flex-col">
        <label htmlFor="updateUserName">
          {user.displayName ? "Change your username" : "Create a username"}
        </label>
        <input
          className="w-full rounded-md"
          ref={inputUserNameRef}
          type="text"
          name="username"
          id="updateUserName"
          placeholder="John Smith"
        />
      </div>

      <div className="flex gap-3 relative">
        <div className="flex flex-col w-full">
          <label htmlFor="updateUserAvatar">Update your avatar</label>
          <input
            className="rounded-md w-full"
            type="file"
            ref={inputFileRef}
            onChange={handleChange}
            accept=".png, .jpeg"
          />
        </div>

        {!state.isUpload ? (
          user.photoURL ? (
            <div className="relative flex-shrink-0 group">
              <img
                src={`${user.photoURL}?${Math.random()}`}
                className="rounded-full overflow-hidden object-cover w-16 h-16"
                alt="user avatar"
              />
              <div
                className="absolute top-0 right-0 bg-blue-200 text-blue-500 rounded-full p-1 cursor-pointer"
                onClick={handleDeleteAvatar}
              >
                <Icon icon="delete" xClass="w-3 h-3" />
              </div>
            </div>
          ) : (
            <HiOutlineUserCircle size={50} className="text-blue-500 self-end" />
          )
        ) : (
          <div className="w-16 rounded-full h-16 flex justify-center items-center flex-shrink-0 bg-slate-100">
            <CgSpinner className="animate-spin" color="dodgerblue" size={20} />
          </div>
        )}
      </div>

      <ButtonPrimary
        xClass="w-full lg:w-auto lg:self-start lg:px-10"
        label="Update your profile"
        type="submit"
        isDisabled={isDisabled}
      />
    </form>
  );
};

export default UpdateUser;
