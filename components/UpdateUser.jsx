import { useState, useRef } from "react";
import ButtonPrimary from "./buttons/ButtonPrimary";
import { useAuth } from "../context/AuthContext";
import Icon from "./buttons/Icon";
import { storage } from "../lib/firebase";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";

const UpdateUser = () => {
  const inputFileRef = useRef();
  const { user, updateUser } = useAuth();
  const [file, setFile] = useState([]);
  const [isUpload, setIsUpload] = useState(false);
  const [displayName, setData] = useState("");
  const isDisabled = isUpload || !file?.length;

  const handleChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files);
    }
  };
  const upload = async (file, user, setIsUpload) => {
    const fileRef = ref(storage, `userAvatar/${user.uid}.png`);
    setIsUpload(true);
    const snapshot = await uploadBytes(fileRef, file[0]);
    const photoURL = await getDownloadURL(fileRef);
    updateUser(displayName, photoURL);
    setIsUpload(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please choose a file first!");
      return;
    }
    upload(file, user, setIsUpload);
  };
  return (
    <>
      <form
        className="mx-auto w-full rounded-md sm:max-w-md bg-slate-100 flex flex-col space-y-5 p-5 mt-4"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col">
          <label htmlFor="updateUserName">Username</label>
          <input
            className="w-full rounded-md sm:max-w-md"
            type="text"
            onChange={(e) => {
              setData(e.target.value);
            }}
            value={displayName}
            name="username"
            id="updateUserName"
            placeholder="John Smith"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="signUpPassword">Avatar</label>
          <input
            className="w-full rounded-md sm:max-w-md"
            type="file"
            ref={inputFileRef}
            onChange={handleChange}
            accept=".png, .jpeg"
            required
          />
        </div>
        <ButtonPrimary
          xClass={"w-full sm:max-w-md"}
          label={"Update user"}
          type={"submit"}
          isDisabled={isDisabled}
        >
          <Icon icon={"update"} />
        </ButtonPrimary>
      </form>
    </>
  );
};

export default UpdateUser;
