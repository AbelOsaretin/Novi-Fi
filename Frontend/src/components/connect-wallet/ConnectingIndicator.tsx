"use client";

import { Ellipsis } from "lucide-react";
import { motion } from "framer-motion";

function ConnectingIndicator() {
  return (
    <div className="flex flex-col items-center space-y-4">
      <h2 className="font-mono font-bold">Connecting</h2>
      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
        className="p-2 rounded-full bg-gray-100"
      >
        <Ellipsis className="w-6 h-6 text-black" />
      </motion.div>
      <p className="font-mono">Connecting Wallet</p>
      <p className="text-gray-500 text-sm text-center">
        Please connect metamask & approve transaction
      </p>
    </div>
  )
}

export default ConnectingIndicator