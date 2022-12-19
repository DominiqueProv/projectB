import { useState, useEffect } from "react";
import { AuthContextProvider } from "../context/AuthContext";
import FilesContextProvider from "../context/FilesContext";
import { useRouter } from "next/router";
import NProgress from "nprogress";
import Head from "next/head";

import "../styles/globals.css";
import ProtectedRoute from "../components/ProtectedRoute";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Flip } from "react-toastify";

import { CgSpinner } from "react-icons/cg";

const noAuthRequired = ["/", "/login", "/signup"];

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
        position="bottom-center"
        autoClose={4000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        theme="light"
        transition={Flip}
      />
      <AuthContextProvider>
        {noAuthRequired.includes(router.pathname) ? (
          <Component {...pageProps} />
        ) : (
          <FilesContextProvider>
            <ProtectedRoute>
              <Component {...pageProps} />
            </ProtectedRoute>
          </FilesContextProvider>
        )}
      </AuthContextProvider>
    </>
  );
}

export default MyApp;
