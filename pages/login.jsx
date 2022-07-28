import { useRouter } from "next/router";
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Link from "next/link";

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
      router.push("/dashboard");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
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
          <button>Login</button>
          <div className="flex flex-col">
            <h3 className="">No account?</h3>
            <Link href="/signup" passHref>
              <a className="bg-blue-100 py-1 px-3 text-blue-500 rounded-md self-start">
                Create one
              </a>
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
