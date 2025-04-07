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
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-t-transparent border-blue-500" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
