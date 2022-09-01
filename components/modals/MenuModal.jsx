import { useState } from "react";
import { TbMenu2 } from "react-icons/tb";
import { IoMdClose } from "react-icons/io";
import { useAuth } from "../../context/AuthContext";
import LinkPrimary from "../buttons/LinkPrimary";
import ButtonPrimary from "../buttons/ButtonPrimary";
import { useRouter } from "next/router";
import { HiOutlineUserCircle } from "react-icons/hi";
import Icon from "../buttons/Icon";
import Image from "next/image";

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
          <IoMdClose size={25} className="text-indigo-800" />
        )}
      </button>

      {showModal ? (
        <>
          <div className="inset-0 absolute bg-black bg-opacity-30 backdrop-blur-sm z-10"></div>
          <div className="flex justify-end overflow-x-hidden overflow-y-auto p-2 fixed inset-0 z-20 outline-none focus:outline-none">
            <div className="flex">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex flex-col items-start justify-between p-5 rounded-t ">
                  <h3 className="text-3xl font-semibold">Menu</h3>
                  <nav className="space-x-2 flex items-center pt-3">
                    {user ? (
                      <>
                        <div className="bg-indigo-100 rounded-md p-2 flex items-center space-x-2">
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
                        <LinkPrimary
                          url="/dashboard"
                          label="Dashboard"
                          xClass={"px-2 sm:px-4"}
                        >
                          <Icon icon={"dashboard"} />
                        </LinkPrimary>
                        <ButtonPrimary
                          xClass={"px-2 sm:px-4"}
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
                        <LinkPrimary
                          url="/signup"
                          label="Signup"
                          xClass={"px-2 sm:px-4"}
                        >
                          <Icon icon={"signup"} />
                        </LinkPrimary>
                        <LinkPrimary
                          url="/login"
                          label="Login"
                          xClass={"px-2 sm:px-4"}
                        >
                          <Icon icon={"login"} />
                        </LinkPrimary>
                      </>
                    )}
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default MenuModal;
