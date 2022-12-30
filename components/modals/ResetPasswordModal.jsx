import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useAuth } from "../../context/AuthContext";
import Modal from "./Portal";
import ButtonForm from "../buttons/ButtonForm";
import ModalTitle from "../text/ModalTitle";
import { useFormik } from "formik";

const ResetPasswordModal = () => {
  const { resetPassword } = useAuth();
  const [showModal, setShowModal] = useState(false);

  const errorLabelClass = "text-xs text-indigo-500 pt-2";

  const validate = (values) => {
    const errors = {};

    let emailValidation = !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(
      values.email
    );

    if (!values.email) {
      errors.email = "Required";
    } else if (emailValidation) {
      errors.email = "Invalid email address";
    }
    if (!Object.entries(errors).length) {
      values.isValid = true;
    } else {
      values.isValid = false;
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      isValid: false,
    },
    validate,
    onSubmit: (values) => {
      resetPassword(values.email);
      setShowModal(false);
      formik.values.email = "";
      document.body.style.overflow = "unset";
    },
  });
  return (
    <>
      <button
        onClick={() => {
          setShowModal(true);
          if (typeof window != "undefined" && window.document) {
            document.body.style.overflow = "hidden";
          }
        }}
        className="text-indigo-900 self-start font-medium underline underline-offset-4 text-xs"
        type="button"
      >
        Forgot password?
      </button>
      <Modal>
        {showModal && (
          <>
            <div
              onClick={() => {
                setShowModal(false);
                formik.values.email = "";
                document.body.style.overflow = "unset";
              }}
              className={`inset-0 fixed bg-black bg-opacity-30 z-40 backdrop-blur-sm ${
                showModal ? "block" : "hidden"
              }`}
            ></div>
            <div className="fixed z-40 top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]">
              <div className="flex w-[90vw] sm:w-[420px] rounded-lg p-3 relative flex-col bg-white">
                <div className="flex justify-between items-center">
                  <ModalTitle title="Reset password" />
                  <button
                    onClick={() => {
                      setShowModal(false);
                      formik.values.email = "";
                      document.body.style.overflow = "unset";
                    }}
                    className="bg-blue-200 self-end z-30 p-2 rounded-full shadow hover:shadow-lg outline-none focus:outline-none"
                    type="button"
                  >
                    <IoMdClose
                      size={25}
                      className="text-indigo-800 hover:rotate-[90deg] ease-out-expo duration-200"
                    />
                  </button>
                </div>
                <form
                  className="flex flex-col my-3"
                  onSubmit={formik.handleSubmit}
                >
                  <label htmlFor="loginEmail">Email</label>
                  <input
                    type="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    name="email"
                    id="loginEmail"
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <div className={errorLabelClass}>{formik.errors.email}</div>
                  ) : null}

                  <ButtonForm
                    xClass={"mt-3"}
                    label={"Submit"}
                    type={"submit"}
                    isValid={formik.isValid}
                  ></ButtonForm>
                </form>
              </div>
            </div>
          </>
        )}
      </Modal>
    </>
  );
};

export default ResetPasswordModal;
