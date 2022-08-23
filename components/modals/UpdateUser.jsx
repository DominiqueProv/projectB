import { useState, useRef } from "react";
import ButtonPrimary from "../buttons/ButtonPrimary";
import { useAuth } from "../../context/AuthContext";
import Icon from "../buttons/Icon";
import { storage } from "../../lib/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const UpdateUserModal = () => {
  const inputFileRef = useRef();
  const { updateUser } = useAuth();
  const [file, setFile] = useState([]);
  const [data, setData] = useState({
    displayName: "",
    photoUrl: "",
  });

  const handleChange = (event) => {
    const chosenFiles = Array.from(event.target.files);
    const uploaded = [...file];
    chosenFiles.some((file) => {
      if (uploaded.findIndex((f) => f.name === file.name) === -1) {
        uploaded.push(file);
      }
    });
    setFile(uploaded);
  };

  const putStorageItem = (item) => {
    const avatarRef = ref(storage, `/userAvatar/${item[0].name}`);
    //TODO upload whole file problem
    uploadBytes(avatarRef, item).then((snapshot) => {
      console.log(snapshot);
      getDownloadURL(snapshot.ref)
        .then((url) => {
          setData({
            ...data,
            photoUrl: url,
          });
        })
        .then(() => {
          updateUser(data.displayName, data.photoUrl);
        })
        .catch((error) => {
          console.log(`Some failed: `, error.message);
        });
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file.length) {
      alert("Please choose a file first!");
      return;
    }
    putStorageItem(file);
  };
  return (
    <>
      <form className="flex flex-col space-y-5 pt-3" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label htmlFor="updateUserName">Username</label>
          <input
            required
            type="text"
            onChange={(e) => {
              setData({
                ...data,
                displayName: e.target.value,
              });
            }}
            value={data.displayName}
            name="username"
            id="updateUserName"
            placeholder="John Smith"
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
          />
        </div>

        <ButtonPrimary label={"Update user"} type={"submit"}>
          <Icon icon={"update"} />
        </ButtonPrimary>
      </form>
    </>
  );
};

export default UpdateUserModal;
