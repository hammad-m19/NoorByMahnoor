"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";

export default function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    removeItem,
    updateQuantity,
    itemCount,
    subtotal,
  } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60]"
            style={{ background: "rgba(30, 26, 22, 0.4)" }}
            onClick={closeCart}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 h-full z-[70] w-full max-w-md flex flex-col shadow-2xl"
            style={{ background: "var(--color-bg-primary)" }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-6 py-5"
              style={{
                borderBottom: "1px solid rgba(169, 121, 60, 0.15)",
              }}
            >
              <h2 className="text-small-caps" style={{ color: "var(--color-text-primary)" }}>
                Your Bag ({itemCount})
              </h2>
              <button
                onClick={closeCart}
                className="p-1 transition-colors duration-200"
                style={{ color: "var(--color-text-secondary)" }}
                aria-label="Close cart"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--color-text-secondary)", opacity: 0.4 }}>
                    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <path d="M16 10a4 4 0 01-8 0" />
                  </svg>
                  <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
                    Your bag is empty
                  </p>
                  <Link
                    href="/shop"
                    className="btn-primary mt-2"
                    onClick={closeCart}
                  >
                    Shop Now
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col gap-6">
                  {items.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex gap-4"
                      style={{
                        paddingBottom: "1.5rem",
                        borderBottom: "1px solid rgba(169, 121, 60, 0.1)",
                      }}
                    >
                      {/* Image */}
                      <div
                        className="relative w-20 h-24 flex-shrink-0 overflow-hidden"
                        style={{ background: "var(--color-bg-secondary)" }}
                      >
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </div>

                      {/* Details */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <h3
                            className="heading-serif text-sm font-medium"
                            style={{ color: "var(--color-text-primary)" }}
                          >
                            {item.product.name}
                          </h3>
                          <p
                            className="text-xs mt-0.5"
                            style={{ color: "var(--color-text-secondary)" }}
                          >
                            {item.product.size}
                          </p>
                        </div>

                        <div className="flex items-center justify-between mt-2">
                          {/* Quantity */}
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.product.id,
                                  item.quantity - 1
                                )
                              }
                              className="w-6 h-6 flex items-center justify-center text-xs"
                              style={{
                                border: "1px solid rgba(169, 121, 60, 0.2)",
                                color: "var(--color-text-secondary)",
                              }}
                              aria-label="Decrease quantity"
                            >
                              −
                            </button>
                            <span className="text-xs w-4 text-center" style={{ fontFamily: "var(--font-sans)" }}>
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.product.id,
                                  item.quantity + 1
                                )
                              }
                              className="w-6 h-6 flex items-center justify-center text-xs"
                              style={{
                                border: "1px solid rgba(169, 121, 60, 0.2)",
                                color: "var(--color-text-secondary)",
                              }}
                              aria-label="Increase quantity"
                            >
                              +
                            </button>
                          </div>

                          {/* Price */}
                          <span className="text-sm" style={{ color: "var(--color-gold)", fontFamily: "var(--font-sans)" }}>
                            {formatPrice(item.product.price * item.quantity)}
                          </span>
                        </div>
                      </div>

                      {/* Remove */}
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="self-start p-1"
                        style={{ color: "var(--color-text-secondary)" }}
                        aria-label={`Remove ${item.product.name}`}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="18" y1="6" x2="6" y2="18" />
                          <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div
                className="px-6 py-5"
                style={{
                  borderTop: "1px solid rgba(169, 121, 60, 0.15)",
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-small-caps">Subtotal</span>
                  <span
                    className="heading-serif text-lg"
                    style={{ color: "var(--color-gold)" }}
                  >
                    {formatPrice(subtotal)}
                  </span>
                </div>
                <p
                  className="text-xs mb-4 text-center"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  Shipping calculated at checkout
                </p>
                <Link
                  href="/cart"
                  className="btn-primary w-full text-center block"
                  onClick={closeCart}
                >
                  View Bag & Checkout
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
