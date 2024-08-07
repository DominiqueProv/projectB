import { useState, useRef } from "react";
import ButtonPrimary from "../buttons/ButtonPrimary";
import { useAuth } from "../../context/AuthContext";
import { storage } from "../../lib/firebase";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import SectionTitle from "../text/SectionTitle";
import { CgSpinner } from "react-icons/cg";
import { HiOutlineUserCircle } from "react-icons/hi";
import Icon from "../buttons/Icon";

const UpdateUser = () => {
  const inputFileRef = useRef();
  const inputUserNameRef = useRef();
  const { user, updateUser, setUser } = useAuth();
  const [file, setFile] = useState(null);
  const [isUpload, setIsUpload] = useState(false);
  const isDisabled = isUpload || !file;

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const upload = async (file) => {
    const ext = file.name.split(".").pop();
    const fileRef = ref(storage, `${user.uid}/userAvatar/${user.uid}.${ext}`);
    setIsUpload(true);
    try {
      await uploadBytes(fileRef, file);
      const photoURL = await getDownloadURL(fileRef);
      await updateUser(user.displayName, photoURL);
      setUser((prevUser) => ({ ...prevUser, photoURL }));
    } catch (error) {
      console.error("Failed to upload file:", error.message);
    } finally {
      setIsUpload(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      await upload(file);
    } else {
      await updateUser(inputUserNameRef.current.value);
    }
    inputFileRef.current.value = "";
    inputUserNameRef.current.value = "";
  };

  const handleDelete = async () => {
    await updateUser(user.userName, "");
    setUser((prevUser) => ({ ...prevUser, photoURL: "" }));
  };

  return (
    <form
      className="w-full rounded-md bg-slate-100/30 sm:max-w-[500px] flex flex-col gap-y-5 p-3 md:p-5"
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
        {!isUpload ? (
          user.photoURL ? (
            <div className="relative flex-shrink-0 group">
              <img
                src={`${user.photoURL}?${Math.random()}`}
                className="rounded-full overflow-hidden object-cover w-16 h-16"
                alt="user avatar"
              />
              <div
                className="absolute top-0 right-0 bg-blue-200 text-blue-500 rounded-full p-1 cursor-pointer"
                onClick={handleDelete}
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
        xClass="w-full"
        label="Update your profile"
        type="submit"
        isDisabled={isDisabled}
      />
    </form>
  );
};

export default UpdateUser;
