import { useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../context/AuthContext";

import ButtonPrimary from "../buttons/ButtonPrimary";
import UserButton from "../buttons/UserButton";
import BurgerMenu from "../buttons/BurgerMenu";
import BackDrop from "../modals/BackDrop";
import Icon from "../buttons/Icon";
import NavLinkPrimary from "../buttons/NavLinkPrimary";

const MenuModal = () => {
  const [showModal, setShowModal] = useState(false);
  const { user, logout } = useAuth();
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
        <div className="flex max-w-full sm:max-w-420 border-0 rounded-lg p-3 shadow-lg relative flex-col bg-white outline-none focus:outline-none">
          <h3 className="text-3xl font-semibold">Menu</h3>
          <nav className="space-x-2 flex items-center pt-3">
            {user ? (
              <>
                <UserButton
                  user={user}
                  setShowModal={setShowModal}
                  router={router}
                />
                <NavLinkPrimary
                  exact
                  url="/timeline"
                  label="Timeline"
                  xClass={"px-2 sm:px-4 rounded-md"}
                >
                  <Icon icon={"timeline"} />
                </NavLinkPrimary>
                <ButtonPrimary
                  xClass={"px-2 sm:px-4 sm:gap-2"}
                  label={"Logout"}
                  type={"button"}
                  handleClick={() => {
                    router.push("/");
                    logout();
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
      </aside>
    </>
  );
};

export default MenuModal;
