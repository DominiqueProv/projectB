import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import ButtonForm from "../components/buttons/ButtonForm";
import LayoutDefault from "../components/layouts/LayoutDefault";
import PageTitle from "../components/text/PageTitle";
import parse from "html-react-parser";
import LinkSecondary from "../components/buttons/LinkSecondary";

const SignUp = () => {
  const router = useRouter();
  const { signup } = useAuth();
  const [formError, setFormError] = useState("");
  const errorLabelClass = "text-xs text-indigo-500 pt-2";

  const validate = (values) => {
    const errors = {};
    const passValidation = !/^(?=.*\d)(?=.*[!@#$%^&*])[\w!@#$%^&*]{6,16}$/.test(
      values.passwordOne
    );
    const emailValidation = !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(
      values.email
    );

    if (!values.passwordOne) {
      errors.passwordOne = "Required";
    } else if (passValidation) {
      errors.passwordOne = parse(`
        Minimum 6 characters<br />
        Maximum 16 characters<br />
        Must contain at least one special character !@#$%^&*<br />
        Must contain at least one number
      `);
    }

    if (!values.passwordTwo) {
      errors.passwordTwo = "Required";
    } else if (values.passwordOne !== values.passwordTwo) {
      errors.passwordTwo = "Must be identical";
    }

    if (!values.email) {
      errors.email = "Required";
    } else if (emailValidation) {
      errors.email = "Invalid email address";
    }

    values.isValid = Object.keys(errors).length === 0;

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      passwordOne: "",
      passwordTwo: "",
      isValid: false,
    },
    validate,
    onSubmit: (values) => handleSignup(values.email, values.passwordOne),
  });

  const handleSignup = async (email, password) => {
    try {
      await signup(email, password);
      router.push("/dashboard");
    } catch (err) {
      setFormError(err.message);
    }
  };

  return (
    <LayoutDefault>
      <PageTitle title="Sign Up" />
      <div className="mx-auto w-full rounded-md sm:max-w-md bg-slate-100/30 flex flex-col space-y-5 p-5 mt-4">
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col space-y-5 pt-3"
        >
          {formError && (
            <div className="rounded-lg p-2 text-red-500 text-center bg-red-50">
              {formError}
            </div>
          )}
          <div className="flex flex-col">
            <label htmlFor="signUpEmail">Email</label>
            <input
              type="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              name="email"
              id="signUpEmail"
              placeholder="Valid Email"
              aria-describedby="emailError"
              aria-invalid={
                formik.touched.email && formik.errors.email ? "true" : "false"
              }
            />
            {formik.touched.email && formik.errors.email && (
              <div id="emailError" className={errorLabelClass}>
                {formik.errors.email}
              </div>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="signUpPassword">Password</label>
            <input
              type="password"
              name="passwordOne"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.passwordOne}
              id="signUpPassword"
              placeholder="Minimum 6 characters"
              aria-describedby="passwordOneError"
              aria-invalid={
                formik.touched.passwordOne && formik.errors.passwordOne
                  ? "true"
                  : "false"
              }
            />
            {formik.touched.passwordOne && formik.errors.passwordOne && (
              <div id="passwordOneError" className={errorLabelClass}>
                {formik.errors.passwordOne}
              </div>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="signUpPassword2">Confirm Password</label>
            <input
              type="password"
              name="passwordTwo"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.passwordTwo}
              id="signUpPassword2"
              placeholder="Must be identical"
              aria-describedby="passwordTwoError"
              aria-invalid={
                formik.touched.passwordTwo && formik.errors.passwordTwo
                  ? "true"
                  : "false"
              }
            />
            {formik.touched.passwordTwo && formik.errors.passwordTwo && (
              <div id="passwordTwoError" className={errorLabelClass}>
                {formik.errors.passwordTwo}
              </div>
            )}
          </div>
          <ButtonForm
            label={formik.isValid ? "Let's get started" : "Fill the form"}
            type="submit"
            isValid={formik.isValid}
          />
          <div className="flex items-center gap-x-3">
            <h3>Already have an account?</h3>
            <LinkSecondary url="/login" label="Login" />
          </div>
        </form>
      </div>
    </LayoutDefault>
  );
};

export default SignUp;
