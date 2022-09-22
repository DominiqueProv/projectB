import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import ButtonPrimary from "../components/buttons/ButtonPrimary";
import Icon from "../components/buttons/Icon";
import LayoutDefault from "../components/layouts/LayoutDefault";
import PageTitle from "../components/text/PageTitle";
import { useRouter } from "next/router";

const SignUp = () => {
  const router = useRouter();
  const { signup } = useAuth();
  const [data, setData] = useState({
    email: "",
    passwordOne: "",
    passwordTwo: "",
  });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (data.passwordOne === data.passwordTwo) {
      try {
        await signup(data.email, data.passwordOne);
      } catch (err) {
        console.log(err);
      }
    }
    router.push("/timeline");
  };

  return (
    <>
      <LayoutDefault>
        <PageTitle title={"Sign Up"} />
        <div className="mx-auto w-full rounded-md sm:max-w-md bg-slate-100/30 flex flex-col space-y-5 p-5 mt-4">
          <form
            className="flex flex-col space-y-5 pt-3"
            onSubmit={handleSignup}
          >
            <div className="flex flex-col">
              <label htmlFor="signUpEmail">Email</label>
              <input
                type="email"
                onChange={handleChange}
                value={data.email}
                name="email"
                id="signUpEmail"
                placeholder="Email"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="signUpPassword">Password</label>
              <input
                type="password"
                name="passwordOne"
                onChange={handleChange}
                value={data.passwordOne}
                id="signUpPassword"
                placeholder="123456"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="signUpPassword2">Confirm Password</label>
              <input
                type="password"
                name="passwordTwo"
                onChange={handleChange}
                value={data.passwordTwo}
                id="signUpPassword2"
                placeholder="123456"
              />
            </div>
            <ButtonPrimary
              label={"Let's get started"}
              type={"submit"}
            ></ButtonPrimary>
          </form>
        </div>
      </LayoutDefault>
    </>
  );
};

export default SignUp;
