import { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  sendPasswordResetEmail,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "../lib/firebase";
import { toast } from "react-toastify";

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const notifyPasswordResetSuccess = () =>
    toast.success("Password reset email sent");
  const notifyPasswordResetError = () =>
    toast.error("There was a problem with the operation");
  const notifyVerifyEmailSent = () => toast.success("Verification email sent");
  const notifyEmailNotVerified = () =>
    toast.error("Please verify your email address to access your account.");
  const notifyLogoutSuccess = () => toast.success("Logged out successfully");
  const notifyLogoutError = () => toast.error("Error during logout");

  const signup = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await sendEmailVerification(userCredential.user);
      notifyVerifyEmailSent();
      await auth.signOut();
    } catch (error) {
      console.error("Signup Error: ", error);
    }
  };

  const updateUser = async (displayName, photoURL) => {
    try {
      await updateProfile(auth.currentUser, { displayName, photoURL });
      setUser((prev) => ({
        ...prev,
        displayName: auth.currentUser.displayName,
        photoURL: auth.currentUser.photoURL,
      }));
    } catch (error) {
      console.error("Update User Error: ", error);
    }
  };

  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (!userCredential.user.emailVerified) {
        notifyEmailNotVerified();
        await auth.signOut();
      }
    } catch (error) {
      console.error("Login Error: ", error);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      notifyLogoutSuccess();
    } catch (error) {
      console.error("Logout Error: ", error);
      notifyLogoutError();
    }
  };

  const resetPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      notifyPasswordResetSuccess();
    } catch (error) {
      console.error("Reset Password Error: ", error);
      notifyPasswordResetError();
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(
        user
          ? {
              uid: user.uid,
              email: user.email,
              displayName: user.displayName,
              photoURL: user.photoURL,
              emailVerified: user.emailVerified,
              lastLoginTime: user.metadata.lastLoginAt,
              lastLoginDay: user.metadata.lastSignInTime,
            }
          : null
      );
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        updateUser,
        setUser,
        resetPassword,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};
