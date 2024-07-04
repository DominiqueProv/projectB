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
    const handleRouteChangeStart = (url) => NProgress.start();
    const handleRouteChangeComplete = (url) => NProgress.done();
    const handleRouteChangeError = (err, url) => NProgress.done();

    router.events.on("routeChangeStart", handleRouteChangeStart);
    router.events.on("routeChangeComplete", handleRouteChangeComplete);
    router.events.on("routeChangeError", handleRouteChangeError);

    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart);
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
      router.events.off("routeChangeError", handleRouteChangeError);
    };
  }, [router]);

  return (
    <>
      <ToastContainer
        toastClassName={({ type }) =>
          contextClass[type || "default"] +
          " rounded-lg flex justify-between p-3 w-[90vw] sm:w-auto mx-auto mb-4 sm:mb-0"
        }
        bodyClassName={() => "text-sm text-indigo-800 font-semibold flex"}
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        theme="light"
        transition={Slide}
      />
      <AuthContextProvider>
        <BabiesContextProvider>
          {noAuthRequired.includes(router.pathname) ? (
            <Component {...pageProps} />
          ) : (
            <FilesContextProvider>
              <ProtectedRoute>
                <Component {...pageProps} />
              </ProtectedRoute>
            </FilesContextProvider>
          )}
        </BabiesContextProvider>
      </AuthContextProvider>
    </>
  );
}

export default MyApp;
