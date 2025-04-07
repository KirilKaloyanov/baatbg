"use client";

import { useLoader } from "@context/LoaderContext";
import { motion, AnimatePresence } from "framer-motion";

export default function Loader() {
  const { isLoading } = useLoader();
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="spinner"
          className="fixed top-4 right-4 z-50"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-t-transparent border-blue-500" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
