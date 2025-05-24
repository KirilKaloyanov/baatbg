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
          className="bg-stone-800/30 fixed inset-0 z-5 flex items-center justify-center"
          initial={{ opacity: 0 }} //, scale: 0.8
          animate={{ opacity: 1 }} //, scale: 1 
          exit={{ opacity: 0 }}
          transition={{ duration: 0.1}}
        >
          <div className="size-16 animate-spin rounded-full border-6 border-t-transparent border-accent-500" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
