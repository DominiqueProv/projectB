import { useRouter } from "next/router";
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import LinkSecondary from "../components/buttons/LinkSecondary";
import ButtonPrimary from "../components/buttons/ButtonPrimary";
import LayoutDefault from "../components/layouts/LayoutDefault";
import PageTitle from "../components/text/PageTitle";

const Login = () => {
  const router = useRouter();
  const { user, login } = useAuth();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(data.email, data.password);
      router.push("/dashboard");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <LayoutDefault>
        <PageTitle title={"Login"} />
        <div className="mx-auto w-full rounded-md sm:max-w-md bg-slate-100/30 flex flex-col space-y-5 p-5 mt-4">
          <form className="flex flex-col space-y-5 pt-3" onSubmit={handleLogin}>
            {/* {error && <div className="text-red">{error}</div>} */}
            <div className="flex flex-col">
              <label htmlFor="loginEmail">Email</label>
              <input
                type="email"
                value={data.email}
                onChange={handleChange}
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
                onChange={handleChange}
                id="loginPassword"
                placeholder="Password"
              />
            </div>
            <ButtonPrimary
              label={"Go go ga ga"}
              type={"submit"}
            ></ButtonPrimary>
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
