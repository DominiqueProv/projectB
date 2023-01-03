import { createContext, useContext, useEffect, useState, useMemo } from "react";
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
  const notifyVerifyEmailSent = () => toast.success("Notification email sent");
  const notifyEmailNotVerified = () =>
    toast.error(
      "You must verified you email address to access your account, Dont forget to check your spam folder"
    );

  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password).then(
      (userCredential) => {
        sendEmailVerification(userCredential.user);
        notifyVerifyEmailSent();
        auth.signOut();
      }
    );
  };

  const updateUser = async (displayName, photoURL) => {
    await updateProfile(auth.currentUser, {
      displayName,
      photoURL,
    });
    setUser((prev) => ({
      ...prev,
      userName: auth.currentUser.displayName,
      photoUrl: auth.currentUser.photoURL,
    }));
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password).then(
      (userCredential) => {
        if (!userCredential.user.emailVerified) {
          notifyEmailNotVerified();
          auth.signOut();
          return;
        }
      }
    );
  };

  const logout = async () => {
    setUser(null);
    await signOut(auth);
  };

  const resetPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      notifyPasswordResetSuccess();
    } catch (err) {
      notifyPasswordResetError();
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
        setUser({
          uid: user.uid,
          email: user.email,
          userName: user.displayName,
          photoUrl: user.photoURL,
          emailVerified: user.emailVerified,
          lastLoginTime: user.metadata.lastLoginAt,
          lastLoginDay: user.metadata.lastSignInTime,
        });
      } else {
        setUser(null);
      }
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
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
