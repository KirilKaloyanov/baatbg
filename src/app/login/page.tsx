"use client";

import { signInWithPopup } from "firebase/auth";
import { signOut, GoogleAuthProvider } from "firebase/auth";
import { useAuth } from "../../context/AuthContext";
import { auth } from "@firebaseConfig";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const user = useAuth();
  const router = useRouter();

  useEffect(() => {
    const logout = async () => {
      await handleLogout();
    };
    logout();
  }, []);

  async function handleLogin() {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();

      const res = await fetch("/api/setAuthCookie", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idToken }),
      });
      if (res.ok) router.push('/dashboard')
        else throw new Error('Error logging in.')
    } catch (err) {
      console.log("Login error", err);
    }
  }

  async function handleLogout() {
    try {
      await signOut(auth);
      const res = await fetch("/api/clearAuthCookie", { method: "POST" });
      const message = await res.json();
      console.log("User signed out and clearing request sent to API", message);
    } catch (err) {
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
