"use client";

import { motion } from "framer-motion";

export default function Button({ text }: { text: string }) {
  return (
    <motion.button
      className="bg-accent-100 text-base-900 cursor-pointer rounded-full px-16 py-6 text-xl font-bold transition"
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
