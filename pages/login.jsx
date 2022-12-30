import parse from "html-react-parser";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useFormik } from "formik";
import LinkSecondary from "../components/buttons/LinkSecondary";
import LayoutDefault from "../components/layouts/LayoutDefault";
import PageTitle from "../components/text/PageTitle";
import ButtonForm from "../components/buttons/ButtonForm";
import ResetPasswordModal from "../components/modals/ResetPasswordModal";

const Login = () => {
  const router = useRouter();
  const { login } = useAuth();
  const [formError, setFormError] = useState("");
  const errorLabelClass = "text-xs text-indigo-500 pt-2";

  const validate = (values) => {
    const errors = {};
    let passValidation = !/^(?=.*[\d])(?=.*[!@#$%^&*])[\w!@#$%^&*]{6,16}$/.test(
      values.password
    );
    let emailValidation = !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(
      values.email
    );

    if (!values.password) {
      errors.password = "Required";
    } else if (passValidation) {
      errors.password = parse(`
      Minimum 6 characters<br />
      Maximum 16 characters<br />
      Must contain at least one special character !@#$%^&*<br />
      Must contain at least one number
      `);
    }

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
      password: "",
      isValid: false,
    },
    validate,
    onSubmit: (values) => {
      handleLogin(values.email, values.password);
    },
  });

  const handleLogin = async (email, password) => {
    try {
      await login(email, password);
      router.push("/dashboard");
    } catch (err) {
      console.dir(err);
      setFormError(err.code);
    }
  };

  return (
    <>
      <LayoutDefault>
        <PageTitle title={"Login"} />
        <div className="mx-auto w-full rounded-md sm:max-w-md bg-slate-100/30 flex flex-col space-y-5 p-5 mt-4">
          <form
            className="flex flex-col space-y-5 pt-3"
            onSubmit={formik.handleSubmit}
          >
            {formError && (
              <div className="rounded-lg p-2 text-red-500 text-center bg-red-50">
                {formError}
              </div>
            )}
            <div className="flex flex-col">
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
            </div>
            <div className="flex flex-col">
              <label htmlFor="loginPassword">Password</label>
              <input
                type="password"
                name="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                id="loginPassword"
              />
              {formik.touched.password && formik.errors.password ? (
                <div className={errorLabelClass}>{formik.errors.password}</div>
              ) : null}
            </div>
            <ResetPasswordModal />
            <ButtonForm
              label={formik.isValid ? "Go" : "Fill the form"}
              type={"submit"}
              isValid={formik.isValid}
            ></ButtonForm>
            <div className="flex items-center gap-x-3">
              <h3 className="">You dont have an account yet?</h3>
              <LinkSecondary url={"/signup"} label={"Create one"} />
            </div>
          </form>
        </div>
      </LayoutDefault>
    </>
  );
};

export default Login;
