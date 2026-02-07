"use client";

import { motion } from "framer-motion";

//button with hover
export default function Button({ text, classes }: { text: string; classes: string }) {
  return (
    <motion.button
      className={`bg-accent-100 text-base-900 cursor-pointer rounded-full transition ${classes}`}
      initial={{ y: 0 }}
      whileHover={{
        y: -5,
        boxShadow:
          "0 10px 20px rgba(0, 0, 0, 0.2), 0 0 10px rgba(0, 0, 0, 0.1)",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 28 }}
    >
      {text}
    </motion.button>
  );

}
