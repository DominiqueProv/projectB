import { useState, useRef } from "react";
import ButtonPrimary from "../buttons/ButtonPrimary";
import { useAuth } from "../../context/AuthContext";
import { storage } from "../../lib/firebase";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import SectionTitle from "../text/SectionTitle";
import { CgSpinner } from "react-icons/cg";

const UpdateUser = () => {
  const inputFileRef = useRef();
  const { user, updateUser, setUser } = useAuth();
  const [file, setFile] = useState([]);
  const [isUpload, setIsUpload] = useState(false);
  const isDisabled = isUpload || !file?.length;
  const handleChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files);
    }
  };
  const upload = async (file, user, setIsUpload) => {
    const fileRef = ref(storage, `${user.uid}/userAvatar/${user.uid}.png`);
    setIsUpload(true);
    const snapshot = await uploadBytes(fileRef, file[0]);
    const photoURL = await getDownloadURL(fileRef);
    updateUser(user.userName, photoURL);
    setIsUpload(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    upload(file, user, setIsUpload);
    inputFileRef.current.value = "";
  };

  return (
    <>
      <form
        className="w-full rounded-md bg-slate-100/30 sm:max-w-[500px] flex flex-col gap-y-5 p-3 md:p-5"
        onSubmit={handleSubmit}
      >
        <SectionTitle title="Manage" />
        <div className="flex flex-col">
          <label htmlFor="updateUserName">Change your username</label>
          <input
            className="w-full rounded-md"
            type="text"
            onChange={(e) => {
              setUser({ ...user, userName: e.target.value });
            }}
            value={user.userName || user.email}
            name="username"
            id="updateUserName"
            placeholder="John Smith"
            required
          />
        </div>
        <div className="flex gap-3">
          <div className="flex flex-col w-full">
            <label htmlFor="signUpPassword">Update your avatar</label>
            <input
              className="rounded-md w-full"
              type="file"
              ref={inputFileRef}
              onChange={handleChange}
              accept=".png, .jpeg"
              required
            />
          </div>
          {!isUpload ? (
            <img
              src={user.photoUrl + "?" + Math.random()}
              className={`rounded-full overflow-hidden object-cover flex-shrink-0 w-16 h-16`}
              alt={"user avatar"}
            />
          ) : (
            <div className="w-16 rounded-full h-16 flex justify-center items-center flex-shrink-0 bg-slate-100">
              <CgSpinner
                className="animate-spin"
                color={"dodgerblue"}
                size={20}
              />
            </div>
          )}
        </div>
        <ButtonPrimary
          xClass={"w-full"}
          label={"Update your profile"}
          type={"submit"}
          isDisabled={isDisabled}
        ></ButtonPrimary>
      </form>
    </>
  );
};

export default UpdateUser;
