// import {
//   GithubAuthProvider,
//   GoogleAuthProvider,
//   createUserWithEmailAndPassword,
//   onAuthStateChanged,
//   signInWithEmailAndPassword,
//   signInWithPopup,
//   signOut,
// } from "firebase/auth";
import { useEffect, useState } from "react";
import { createContext } from "react";
// import auth from "../firebaseConfig/firebaseConfig";

export const AuthContext = createContext();

const AuthProviders = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Social login providers
  // const googleProvider = new GoogleAuthProvider();
  // const gitHubProvider = new GithubAuthProvider();

  // Create user.
  // const createUser = (email, password) => {
  //   return createUserWithEmailAndPassword(auth, email, password);
  // };

  // LoginUser
  // const loginUser = (email, password) => {
  //   return signInWithEmailAndPassword(auth, email, password);
  // };

  // Login with Google
  // const loginWithGoogle = () => {
  //   return signInWithPopup(auth, googleProvider);
  // };

  // Login with Github
  // const loginWithGithub = () => {
  //   return signInWithPopup(auth, gitHubProvider);
  // };

  // LogoutUser
  // const logoutUser = () => {
  //   return signOut(auth);
  // };

  const authInfo = {
    user,
    loading,
    // createUser,
    // loginUser,
    // logoutUser,
    // loginWithGoogle,
    // loginWithGithub,
  };

  // observation function here
  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (user) => {
  //     setUser(user);
  //     setLoading(false);
  //   });

  //   return () => {
  //     unsubscribe();
  //   };
  // }, []);

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProviders;
