"use client";

import { signInWithPopup } from "firebase/auth";
import { signOut, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Login({ sessCookie }) {

  const [cookie, setCookie] = useState<null | string>(sessCookie)

  const user = useAuth();
  if (!cookie) {
    signOut(auth)
    console.log("sing out, cause no cookie");

  }

  const provider = new GoogleAuthProvider();

  async function handleLogin() {

    try {
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();

      const res = await fetch("/api/setAuthCookie", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ idToken })
      });
      const message = await res.json();

      console.log("User signed in and token sent to API.", message);
      setCookie(null);
      
    } catch (err) {
      console.log("Login error", err)
    }

  }

  async function handleLogout() {
    
    try {
      await signOut(auth);
      const res = await fetch("/api/clearAuthCookie", { method: "POST" });
      const message = await res.json();
      console.log("User signed out and clearing request sent to API", message)
    } catch(err) {
        console.log("login component, handleLogout throws error", err);
      }
  }

  return (
    <>
      {user ? (
        <button onClick={handleLogout}>Logout {user.displayName}</button>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
    </>
  );
}
