import Icon from "./Icon";
import { useFiles } from "../../context/FilesContext";
import AddMediasModal from "../modals/AddMediasModal";

const UploadButton = () => {
  const { handleChange } = useFiles();

  return (
    <div className="flex gap-3 items-center">
      <div
        className={`p-3 lg:aspect-square h-[50px] w-[50px] rounded-full bg-indigo-800 duration-300 ease-out-expo`}
      >
        <label
          htmlFor="file-upload"
          role="upload"
          className="w-full h-full flex justify-center items-center cursor-pointer group"
        >
          <Icon
            icon="add"
            size={40}
            xClass="text-white cursor-pointer group-hover:scale-110 duration-200"
          />
        </label>
        <input
          className="hidden"
          id="file-upload"
          type="file"
          multiple="multiple"
          onChange={handleChange}
          accept=".png, .jpeg, video/*"
        />
      </div>
      <span className="font-semibold hidden lg:block">Add a memory</span>

      <AddMediasModal />
    </div>
  );
};

export default UploadButton;
