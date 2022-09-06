import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import ButtonPrimary from "../components/buttons/ButtonPrimary";
import Icon from "../components/buttons/Icon";
import LayoutDefault from "../components/layouts/LayoutDefault";

const SignUp = () => {
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
  };

  return (
    <>
      <LayoutDefault>
        <div className="w-96 mx-auto rounded-md bg-slate-100 p-5 mt-24">
          <h2>Signup</h2>
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
                placeholder="Password"
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
                placeholder="Password"
              />
            </div>
            <ButtonPrimary label={"Sign Up"} type={"submit"}>
              <Icon icon={"signup"} />
            </ButtonPrimary>
          </form>
        </div>
      </LayoutDefault>
    </>
  );
};

export default SignUp;
