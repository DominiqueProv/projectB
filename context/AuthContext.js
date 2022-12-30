import { createContext, useContext, useEffect, useState } from "react";

import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  sendPasswordResetEmail,
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

  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const updateUser = async (displayName, photoURL) => {
    updateProfile(auth.currentUser, {
      displayName,
      photoURL,
    });
    const userUpdate = auth.currentUser;
    if (userUpdate !== null) {
      setUser({
        ...user,
        photoUrl: userUpdate.photoURL,
        userName: userUpdate.displayName,
      });
    }
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
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
