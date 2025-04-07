"use client";
import { motion } from "framer-motion";

export default function FramerTest() {
  return (
    <>
    <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
                duration: 0.4,
                scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
            }}
            style={ball}
        />
    {/* DOES NOT WORK */}
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="h-16 w-16 bg-red-500"
    />
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="h-16 w-16 bg-red-500"
      />
    <div className="flex justify-center items-center h-screen bg-gray-200">
    <div className="h-16 w-16 border-4 border-t-transparent border-blue-500 rounded-full animate-spin" />
  </div>

  <motion.div
        className="h-16 w-16 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      />

<motion.div
      className="fixed top-4 right-4 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="h-6 w-6 animate-spin rounded-full border-2 border-t-transparent border-blue-500" />
    </motion.div>
{/* WORKS */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="p-4 text-white bg-green-500 rounded"
    >
      Hello from Framer
    </motion.div>
<h1>end</h1>
      </>
);
}

const ball = {
  width: 100,
  height: 100,
  backgroundColor: "#dd00ee",
  borderRadius: "50%",
}