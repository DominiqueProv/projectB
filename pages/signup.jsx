import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import ButtonPrimary from "../components/buttons/ButtonPrimary";

const SignUp = () => {
  const { user, signup } = useAuth();
  console.log(user);
  const [data, setData] = useState({
    email: "",
    passwordOne: "",
    passwordTwo: "",
  });

  const handleSignup = async (e) => {
    e.preventDefault();
    if (passwordOne === passwordTwo) {
      try {
        await signup(data.email, data.password);
      } catch (err) {
        console.log(err);
      }
    }
    console.log(data);
  };

  return (
    <div className="w-96 mx-auto rounded-md bg-slate-100 p-5 mt-24">
      <h2>Signup</h2>
      <form className="flex flex-col space-y-5 pt-3" onSubmit={handleSignup}>
        <div className="flex flex-col">
          <label htmlFor="signUpEmail">Email</label>
          <input
            type="email"
            onChange={(e) =>
              setData({
                ...data,
                email: e.target.value,
              })
            }
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
            onChange={(e) =>
              setData({
                ...data,
                passwordOne: e.target.value,
              })
            }
            value={data.passwordOne}
            id="signUpPassword"
            placeholder="Password"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="signUpPassword2">Confirm Password</label>
          <input
            type="password"
            name="password"
            onChange={(e) =>
              setData({
                ...data,
                passwordTwo: e.target.value,
              })
            }
            value={data.passworTwo}
            id="signUpPassword2"
            placeholder="Password"
          />
        </div>
        <ButtonPrimary label={"Sign Up"} type={"submit"} />
      </form>
    </div>
  );
};

export default SignUp;
