"use client";

import { signInWithPopup } from "firebase/auth";
import { signOut, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  let credential: any;

  const user = useAuth();

  const provider = new GoogleAuthProvider();

  function handleLogin() {
    signInWithPopup(auth, provider)
      .then((result) => {
        credential = result.user;
        console.log("inside login client component");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleLogout() {
    signOut(auth)
      .then(() => {
        console.log("signed out");
      })
      .catch((err) => {
        console.log("login component, handleLogout throws error", err);
      });
  }

  return (
    <>
      {!user ? (
        <button onClick={handleLogin}>Login</button>
      ) : (
        <button onClick={handleLogout}>Logout {user.displayName}</button>
      )}
    </>
  );
}
