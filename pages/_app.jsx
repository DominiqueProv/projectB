import { useEffect } from "react";
import { AuthContextProvider } from "../context/AuthContext";
import FilesContextProvider from "../context/FilesContext";
import BabiesContextProvider from "../context/BabiesContext";
import { useRouter } from "next/router";
import NProgress from "nprogress";
import Head from "next/head";

import "../styles/globals.css";
import ProtectedRoute from "../components/ProtectedRoute";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Slide } from "react-toastify";

const noAuthRequired = ["/", "/login", "/signup"];

const contextClass = {
  success: "bg-slate-50",
  error: "bg-red-50",
  info: "bg-gray-600",
  warning: "bg-orange-400",
  default: "bg-indigo-600",
  dark: "bg-white-600 font-gray-300",
};

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  NProgress.configure({ showSpinner: false });

  useEffect(() => {
    router.events.on("routeChangeStart", (url) => {
      NProgress.start();
    });

    router.events.on("routeChangeComplete", (url) => {
      NProgress.done(false);
    });
  }, [router]);

  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css"
          integrity="sha512-42kB9yDlYiCEfx2xVwq0q7hT4uf26FUgSIZBK8uiaEnTdShXjwr8Ip1V4xGJMg3mHkUt9nNuTDxunHF0/EgxLQ=="
          crossOrigin="anonymous"
          referrerpolicy="no-referrer"
        />
      </Head>
      <ToastContainer
        toastClassName={({ type }) =>
          contextClass[type || "default"] +
          " rounded-lg flex justify-between p-3 w-[90vw] sm:w-auto mx-auto mb-4 sm:mb-0"
        }
        bodyClassName={() => "text-sm text-indigo-800 font-semibold flex"}
        position="bottom-center"
        autoClose={1000000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        theme="light"
        transition={Slide}
      />
      <AuthContextProvider>
        {noAuthRequired.includes(router.pathname) ? (
          <Component {...pageProps} />
        ) : (
          <FilesContextProvider>
            <BabiesContextProvider>
              <ProtectedRoute>
                <Component {...pageProps} />
              </ProtectedRoute>
            </BabiesContextProvider>
          </FilesContextProvider>
        )}
      </AuthContextProvider>
    </>
  );
}

export default MyApp;
