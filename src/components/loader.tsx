"use client";

import { useLoader } from "@context/LoaderContext";
import "./loader.css";

export default function Loader() {
  const { isLoading } = useLoader();
  if (!isLoading) return null;
  if (isLoading) {
    return (
      <div className="loader-overlay">
        <div className="spinner"></div>
      </div>
    );
  }
}
