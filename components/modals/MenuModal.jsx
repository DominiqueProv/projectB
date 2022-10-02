import { useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../context/AuthContext";

import ButtonPrimary from "../buttons/ButtonPrimary";
import UserButton from "../buttons/UserButton";
import BurgerMenu from "../buttons/BurgerMenu";
import BackDrop from "../modals/BackDrop";
import Icon from "../buttons/Icon";
import NavLinkPrimary from "../buttons/NavLinkPrimary";
import { useBabies } from "../../context/BabiesContext";
import ModalTitle from "../text/ModalTitle";
import SubTitle from "../text/SubTitle";

const MenuModal = () => {
  const [showModal, setShowModal] = useState(false);
  const { user, logout } = useAuth();
  const { babiesDataList } = useBabies();
  const router = useRouter();
  return (
    <>
      <BurgerMenu setShowModal={setShowModal} showModal={showModal} />
      <BackDrop setShowModal={setShowModal} showModal={showModal} />
      <aside
        className={`flex justify-end p-2 duration-500 ease-out-expo absolute z-20 right-0 top-0 w-full ${
          showModal ? "translate-y-0" : "-translate-y-[100%]"
        }`}
      >
        <div className="flex w-full sm:w-420 border-0 rounded-lg p-3 shadow-lg relative flex-col bg-white outline-none focus:outline-none">
          <ModalTitle title="Menu" />
          <nav className="space-x-2 flex items-center pt-3">
            {user ? (
              <div className="flex flex-col gap-y-3 w-full">
                <UserButton setShowModal={setShowModal} />
                <div className="flex gap-2">
                  <NavLinkPrimary
                    exact
                    url="/dashboard"
                    label="Add a new members"
                    xClass={"px-2 sm:px-4 rounded-md flex-grow"}
                  >
                    <Icon icon={"members"} />
                  </NavLinkPrimary>
                  <ButtonPrimary
                    xClass={"px-2 sm:px-4 sm:gap-2 flex-grow justify-center"}
                    label={"Logout"}
                    type={"button"}
                    handleClick={() => {
                      router.push("/");
                      logout();
                    }}
                  >
                    <Icon icon={"signout"} />
                  </ButtonPrimary>
                </div>
              </div>
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

          {babiesDataList.length > 0 && (
            <div className="mt-4 space-y-3">
              <SubTitle title="Your babies Timeline" />
              <div className="space-y-2">
                {babiesDataList?.map((baby, i) => {
                  return (
                    <a
                      key={i}
                      href={`timeline?id=${baby.id}`}
                      className="bg-slate-100 rounded-md p-2 flex items-center justify-between"
                    >
                      <div className="flex gap-3 items-center">
                        <img
                          src={baby.url + "?" + Math.random()}
                          className={`rounded-full overflow-hidden object-cover flex-shrink-0 w-12 h-12`}
                          alt={"user avatar"}
                        />
                        <span className="text-xl font-semibold">
                          {baby.name}
                        </span>
                      </div>
                      <Icon icon={"arrow"} size={25} xClass="text-indigo-800" />
                    </a>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default MenuModal;
