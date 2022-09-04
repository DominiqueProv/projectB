import { useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../context/AuthContext";
import ButtonPrimary from "../buttons/ButtonPrimary";
import Image from "next/image";
import Icon from "../buttons/Icon";
import NavLinkPrimary from "../buttons/NavLinkPrimary";
import { HiOutlineUserCircle } from "react-icons/hi";
import { TbMenu2 } from "react-icons/tb";
import { IoMdClose } from "react-icons/io";

const MenuModal = () => {
  const [showModal, setShowModal] = useState(false);
  const { user, logout } = useAuth();
  const router = useRouter();

  return (
    <>
      <button
        className="bg-blue-200 z-30
      p-2 rounded-full shadow hover:shadow-lg outline-none focus:outline-none"
        type="button"
        onClick={() => setShowModal(!showModal)}
      >
        {!showModal ? (
          <TbMenu2 size={25} className="text-indigo-800" />
        ) : (
          <IoMdClose
            size={25}
            className="text-indigo-800 hover:rotate-[90deg] ease-out-expo duration-200"
          />
        )}
      </button>

      <>
        <div
          onClick={() => setShowModal(false)}
          className={`inset-0 absolute bg-black bg-opacity-30 z-10 backdrop-blur-sm ${
            showModal ? "block" : "hidden"
          }`}
        ></div>
        <div
          className={`flex justify-end p-2 duration-300 ease-out-expo absolute z-20 right-0 top-0 ${
            showModal ? "translate-y-0" : "-translate-y-[130px]"
          }`}
        >
          <div className="flex w-full sm:max-w-420">
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              <div className="flex flex-col items-start p-3 rounded-t ">
                <h3 className="text-3xl font-semibold">Menu</h3>
                <nav className="space-x-2 flex justify-between items-center pt-3">
                  {user ? (
                    <>
                      <button
                        className="relative overflow-hidden group"
                        onClick={() => {
                          setShowModal(false);
                          router.push("/update");
                        }}
                      >
                        <div className="bg-indigo-100 rounded-md p-2 flex items-center space-x-2 group-hover:blur group-hover:opacity-30 duration-150">
                          {user.photoUrl ? (
                            <Image
                              src={user.photoUrl}
                              className={
                                "rounded-full overflow-hidden object-cover"
                              }
                              width={30}
                              height={30}
                              alt={"user avatar"}
                            />
                          ) : (
                            <HiOutlineUserCircle
                              size={25}
                              className="text-blue-500"
                            />
                          )}
                          {user.userName ? (
                            <div className="">
                              Welcome back{" "}
                              <span className="font-semibold">
                                {user.userName}
                              </span>
                            </div>
                          ) : (
                            <></>
                          )}
                        </div>
                        <p className="absolute text-indigo-800 translate-y-1 font-semibold ease-out opacity-0 group-hover:opacity-100 duration-150 top-[50%] left-[50%] -translate-x-[50%] group-hover:-translate-y-[50%]">
                          EDIT
                        </p>
                      </button>
                      <NavLinkPrimary
                        exact
                        url="/timeline"
                        label="timeline"
                        xClass={"px-2 sm:px-4 rounded-md"}
                      >
                        <Icon icon={"timeline"} />
                      </NavLinkPrimary>
                      <ButtonPrimary
                        xClass={"px-2 sm:px-4 sm:gap-2"}
                        label={"Logout"}
                        type={"button"}
                        handleClick={() => {
                          logout();
                          router.push("/");
                        }}
                      >
                        <Icon icon={"signout"} />
                      </ButtonPrimary>
                    </>
                  ) : (
                    <>
                      <NavLinkPrimary
                        exact
                        url="/signup"
                        label="Signup"
                        xClass={"px-2 sm:px-4 rounded-md"}
                      >
                        <Icon icon={"signup"} />
                      </NavLinkPrimary>
                      <NavLinkPrimary
                        exact
                        url="/login"
                        label="Login"
                        xClass={"px-2 sm:px-4 rounded-md"}
                      >
                        <Icon icon={"login"} />
                      </NavLinkPrimary>
                    </>
                  )}
                </nav>
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default MenuModal;
