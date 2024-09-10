import { useRouter } from "next/router";
import { useAuth } from "../../context/AuthContext";
import { useBabies } from "../../context/BabiesContext";
import ButtonPrimary from "../buttons/ButtonPrimary";
import Link from "next/link";
import UserButton from "../buttons/UserButton";
import BurgerMenu from "../buttons/BurgerMenu";
import BackDrop from "../modals/BackDrop";
import Icon from "../buttons/Icon";
import NavLinkPrimary from "../buttons/NavLinkPrimary";
import ModalTitle from "../text/ModalTitle";
import SubTitle from "../text/SubTitle";
import useModal from "../../hooks/useModal";

const MenuModal = ({ isScrolledPast, isDesktop }) => {
  const { user, logout } = useAuth();
  const { babiesDataList } = useBabies();
  const router = useRouter();
  const { isOpen, openModal, closeModal, modalRef } = useModal();

  const handleLogout = () => {
    logout();
    closeModal();
    router.push("/");
  };

  return (
    <>
      <BurgerMenu
        openModal={openModal}
        isOpen={isOpen}
        closeModal={closeModal}
      />
      {!isScrolledPast && (
        <BackDrop setShowModal={closeModal} showModal={isOpen} />
      )}
      <aside
        className={`flex justify-end p-2 duration-700 ease-out-expo absolute z-20 right-0 top-0 min-w-[calc(100vw-24px)] lg:min-w-0 sm:w-auto ${
          isOpen
            ? isScrolledPast
              ? "-translate-y-[108%]"
              : "translate-y-0"
            : isScrolledPast
            ? "translate-y-[108%]"
            : "-translate-y-[108%]"
        } ${
          isScrolledPast && isDesktop
            ? "left-[50%] translate-x-[-50%] right-auto"
            : "right-0"
        }`}
        ref={modalRef}
      >
        <div className="flex w-full sm:w-420 border-0 rounded-lg p-3 shadow-lg relative flex-col bg-white outline-none focus:outline-none">
          <ModalTitle title="Menu" />
          <nav className="space-x-2 flex items-center pt-5">
            {user ? (
              <div className="flex flex-col gap-y-3 w-full">
                <UserButton setShowModal={closeModal} />
                <div className="flex gap-2">
                  <NavLinkPrimary
                    exact
                    url="/dashboard"
                    label="Add a family member"
                    xClass="px-2 sm:px-4 rounded-md flex-grow justify-center"
                  >
                    <Icon icon="members" />
                  </NavLinkPrimary>
                  <ButtonPrimary
                    xClass="px-2 sm:px-4 sm:gap-2 flex-grow justify-center"
                    label="Logout"
                    type="button"
                    handleClick={handleLogout}
                  >
                    <Icon icon="signout" />
                  </ButtonPrimary>
                </div>
              </div>
            ) : (
              <>
                <NavLinkPrimary
                  exact
                  url="/signup"
                  label="Signup"
                  xClass="px-2 sm:px-4 rounded-md"
                  handleClick={closeModal}
                >
                  <Icon icon="signup" />
                </NavLinkPrimary>
                <NavLinkPrimary
                  exact
                  url="/login"
                  label="Login"
                  xClass="px-2 sm:px-4 rounded-md"
                  handleClick={closeModal}
                >
                  <Icon icon="login" />
                </NavLinkPrimary>
              </>
            )}
          </nav>
          {user && babiesDataList?.length > 0 && (
            <div className="mt-4 space-y-3">
              <SubTitle title="Your family members timelines" />
              <div className="space-y-2">
                {babiesDataList.map((baby, i) => (
                  <Link
                    key={i}
                    href={`/timeline/${baby.id}`}
                    className="bg-slate-100 rounded-md p-2 flex items-center justify-between group"
                    onClick={closeModal}
                  >
                    <div className="flex gap-3 items-center">
                      <img
                        src={`${baby.url}?${Math.random()}`}
                        className="rounded-full overflow-hidden object-cover flex-shrink-0 w-12 h-12"
                        alt="user avatar"
                      />
                      <span className="text-xl font-semibold">{baby.name}</span>
                    </div>
                    <Icon
                      icon="arrow"
                      size={25}
                      xClass="text-indigo-800 group-hover:translate-x-1 duration-100"
                    />
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default MenuModal;
