"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface ToastProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}

export default function Toast({
  message,
  isVisible,
  onClose,
  duration = 2500,
}: ToastProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose, duration]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          className="fixed bottom-8 left-1/2 z-[100] -translate-x-1/2"
        >
          <div
            className="flex items-center gap-3 px-6 py-3.5 shadow-lg"
            style={{
              background: "var(--color-bg-dark)",
              color: "var(--color-text-light)",
              fontFamily: "var(--font-sans)",
              fontSize: "0.85rem",
              letterSpacing: "0.05em",
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M8 0L9.41 6.59L16 8L9.41 9.41L8 16L6.59 9.41L0 8L6.59 6.59L8 0Z"
                fill="#C8A66B"
              />
            </svg>
            <span>{message}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Hook for easy toast usage
export function useToast() {
  const [toast, setToast] = useState({ isVisible: false, message: "" });

  const showToast = (message: string) => {
    setToast({ isVisible: true, message });
  };

  const hideToast = () => {
    setToast({ isVisible: false, message: "" });
  };

  return { toast, showToast, hideToast };
}
