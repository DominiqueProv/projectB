import { useRouter } from "next/router";
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import LinkSecondary from "../components/buttons/LinkSecondary";
import ButtonPrimary from "../components/buttons/ButtonPrimary";
import Icon from "../components/buttons/Icon";
import LayoutDefault from "../components/layouts/LayoutDefault";

const Login = () => {
  const router = useRouter();
  const { user, login } = useAuth();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(user);
    try {
      await login(data.email, data.password);
      router.push("/timeline");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <LayoutDefault>
        <div className="w-96 mx-auto rounded-md bg-slate-100 p-5 mt-24">
          <h2>Login</h2>

          <form className="flex flex-col space-y-5 pt-3" onSubmit={handleLogin}>
            {/* {error && <div className="text-red">{error}</div>} */}
            <div className="flex flex-col">
              <label htmlFor="loginEmail">Email</label>
              <input
                type="email"
                value={data.email}
                onChange={(e) =>
                  setData({
                    ...data,
                    email: e.target.value,
                  })
                }
                name="email"
                id="loginEmail"
                placeholder="Email"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="loginPassword">Password</label>
              <input
                type="password"
                name="password"
                value={data.password}
                onChange={(e) =>
                  setData({
                    ...data,
                    password: e.target.value,
                  })
                }
                id="loginPassword"
                placeholder="Password"
              />
            </div>
            <ButtonPrimary label={"Login"} type={"submit"}>
              <Icon icon={"login"} />
            </ButtonPrimary>
            <div className="flex flex-col">
              <h3 className="">No account?</h3>
              <LinkSecondary url={"/signup"} label={"Create one"} />
            </div>
          </form>
        </div>
      </LayoutDefault>
    </>
  );
};

export default Login;
