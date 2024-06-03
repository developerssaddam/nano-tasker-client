import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { createContext } from "react";
import auth from "../firebaseConfig/firebaseConfig";
import useAxiosSecure from "../hooks/useAxiosSecure";

export const AuthContext = createContext();

const AuthProviders = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  // Social login providers
  const googleProvider = new GoogleAuthProvider();

  // Create user.
  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // LoginUser
  const loginUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Login with Google
  const loginWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
  };

  // LogoutUser
  const logoutUser = () => {
    return signOut(auth);
  };

  const authInfo = {
    user,
    loading,
    createUser,
    loginUser,
    loginWithGoogle,
    logoutUser,
  };

  // observation function here
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        // Access token set to localStorage.
        axiosSecure.post(`/jwt/create?email=${user.email}`).then((res) => {
          const token = res.data.token;
          localStorage.setItem("accessToken", token);
        });
      } else {
        localStorage.removeItem("accessToken");
        setUser(null);
      }
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, [axiosSecure]);

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProviders;
