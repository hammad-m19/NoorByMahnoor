"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { formatPrice, getShippingCost } from "@/lib/utils";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionDivider from "@/components/ui/SectionDivider";

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, subtotal } = useCart();

  return (
    <div style={{ background: "var(--color-bg-primary)", minHeight: "60vh" }}>
      {/* Header */}
      <div className="pt-16 pb-8 px-6 lg:px-12 text-center">
        <ScrollReveal>
          <span
            className="text-small-caps block mb-4"
            style={{ color: "var(--color-gold)" }}
          >
            Review
          </span>
          <h1
            className="heading-serif text-4xl md:text-5xl mb-4"
            style={{ color: "var(--color-text-primary)" }}
          >
            Your Bag
          </h1>
          <SectionDivider />
        </ScrollReveal>
      </div>

      <div className="px-6 lg:px-12 pb-20">
        <div className="mx-auto" style={{ maxWidth: "var(--content-max-width)" }}>
          {items.length === 0 ? (
            /* Empty State */
            <ScrollReveal>
              <div className="text-center py-16">
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  className="mx-auto mb-6"
                  style={{ color: "var(--color-text-secondary)", opacity: 0.3 }}
                  aria-hidden="true"
                >
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 01-8 0" />
                </svg>
                <h2
                  className="heading-serif text-xl mb-3"
                  style={{ color: "var(--color-text-primary)" }}
                >
                  Your bag is empty
                </h2>
                <p
                  className="text-sm mb-8"
                  style={{
                    color: "var(--color-text-secondary)",
                    fontFamily: "var(--font-sans)",
                  }}
                >
                  Discover our collection and find your signature scent.
                </p>
                <Link href="/shop" className="btn-primary">
                  Browse Collection
                </Link>
              </div>
            </ScrollReveal>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                {/* Table Header (desktop) */}
                <div
                  className="hidden md:grid grid-cols-12 gap-4 pb-4 mb-4 text-small-caps"
                  style={{
                    borderBottom: "1px solid rgba(169, 121, 60, 0.15)",
                    color: "var(--color-text-secondary)",
                    fontSize: "0.6rem",
                  }}
                >
                  <div className="col-span-6">Product</div>
                  <div className="col-span-2 text-center">Quantity</div>
                  <div className="col-span-2 text-center">Price</div>
                  <div className="col-span-2 text-right">Total</div>
                </div>

                {/* Items */}
                {items.map((item, i) => (
                  <ScrollReveal key={item.product.id} delay={i * 0.05}>
                    <div
                      className="grid grid-cols-1 md:grid-cols-12 gap-4 py-6 items-center"
                      style={{
                        borderBottom: "1px solid rgba(169, 121, 60, 0.1)",
                      }}
                    >
                      {/* Product Info */}
                      <div className="md:col-span-6 flex gap-4">
                        <Link
                          href={`/product/${item.product.slug}`}
                          className="relative w-20 h-24 md:w-24 md:h-28 flex-shrink-0 overflow-hidden"
                          style={{ background: "var(--color-bg-secondary)" }}
                        >
                          <Image
                            src={item.product.images[0]}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                            sizes="96px"
                          />
                        </Link>
                        <div className="flex flex-col justify-center">
                          <Link
                            href={`/product/${item.product.slug}`}
                            className="heading-serif text-base md:text-lg hover:opacity-70 transition-opacity"
                            style={{ color: "var(--color-text-primary)" }}
                          >
                            {item.product.name}
                          </Link>
                          <p
                            className="text-xs mt-1"
                            style={{
                              color: "var(--color-text-secondary)",
                              fontFamily: "var(--font-sans)",
                            }}
                          >
                            {item.product.size}
                          </p>
                          <button
                            onClick={() => removeItem(item.product.id)}
                            className="text-xs mt-2 self-start transition-opacity hover:opacity-70"
                            style={{
                              color: "var(--color-accent-burgundy)",
                              fontFamily: "var(--font-sans)",
                            }}
                          >
                            Remove
                          </button>
                        </div>
                      </div>

                      {/* Quantity */}
                      <div className="md:col-span-2 flex items-center justify-start md:justify-center">
                        <div
                          className="flex items-center"
                          style={{ border: "1px solid rgba(169, 121, 60, 0.2)" }}
                        >
                          <button
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity - 1)
                            }
                            className="px-2.5 py-1.5 text-sm"
                            style={{ color: "var(--color-text-secondary)" }}
                            aria-label="Decrease quantity"
                          >
                            −
                          </button>
                          <span
                            className="px-3 py-1.5 text-sm text-center w-8"
                            style={{
                              fontFamily: "var(--font-sans)",
                              borderLeft: "1px solid rgba(169, 121, 60, 0.15)",
                              borderRight: "1px solid rgba(169, 121, 60, 0.15)",
                            }}
                          >
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity + 1)
                            }
                            className="px-2.5 py-1.5 text-sm"
                            style={{ color: "var(--color-text-secondary)" }}
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Unit Price */}
                      <div
                        className="md:col-span-2 text-left md:text-center text-sm"
                        style={{
                          color: "var(--color-text-secondary)",
                          fontFamily: "var(--font-sans)",
                        }}
                      >
                        <span className="md:hidden text-xs mr-1" style={{ color: "var(--color-text-secondary)" }}>
                          Price:{" "}
                        </span>
                        {formatPrice(item.product.price)}
                      </div>

                      {/* Line Total */}
                      <div
                        className="md:col-span-2 text-left md:text-right text-sm font-medium gold-text"
                        style={{ fontFamily: "var(--font-sans)" }}
                      >
                        <span className="md:hidden text-xs mr-1" style={{ color: "var(--color-text-secondary)", WebkitTextFillColor: "var(--color-text-secondary)" }}>
                          Total:{" "}
                        </span>
                        {formatPrice(item.product.price * item.quantity)}
                      </div>
                    </div>
                  </ScrollReveal>
                ))}

                {/* Clear cart */}
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={clearCart}
                    className="text-xs transition-opacity hover:opacity-70"
                    style={{
                      color: "var(--color-text-secondary)",
                      fontFamily: "var(--font-sans)",
                    }}
                  >
                    Clear Bag
                  </button>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <ScrollReveal delay={0.2}>
                  <div
                    className="p-6 sticky top-24"
                    style={{ background: "var(--color-bg-secondary)" }}
                  >
                    <h3
                      className="text-small-caps mb-6"
                      style={{ color: "var(--color-text-primary)" }}
                    >
                      Order Summary
                    </h3>

                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between text-sm" style={{ fontFamily: "var(--font-sans)" }}>
                        <span style={{ color: "var(--color-text-secondary)" }}>Subtotal</span>
                        <span style={{ color: "var(--color-text-primary)" }}>
                          {formatPrice(subtotal)}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm" style={{ fontFamily: "var(--font-sans)" }}>
                        <span style={{ color: "var(--color-text-secondary)" }}>Shipping</span>
                        <span
                          className="text-xs"
                          style={{
                            color: getShippingCost(subtotal) === 0
                              ? "var(--color-accent-forest)"
                              : "var(--color-text-secondary)",
                            fontWeight: getShippingCost(subtotal) === 0 ? 500 : 400,
                          }}
                        >
                          {getShippingCost(subtotal) === 0 ? "FREE" : formatPrice(getShippingCost(subtotal))}
                        </span>
                      </div>
                    </div>

                    <div
                      className="flex justify-between pt-4 mb-6"
                      style={{ borderTop: "1px solid rgba(169, 121, 60, 0.2)" }}
                    >
                      <span
                        className="text-small-caps"
                        style={{ color: "var(--color-text-primary)" }}
                      >
                        Total
                      </span>
                      <span
                        className="heading-serif text-xl gold-text"
                      >
                        {formatPrice(subtotal + getShippingCost(subtotal))}
                      </span>
                    </div>

                    <Link href="/checkout">
                      <motion.div
                        className="btn-primary w-full text-center"
                        whileTap={{ scale: 0.97 }}
                      >
                        Proceed to Checkout
                      </motion.div>
                    </Link>

                    <p
                      className="text-xs text-center mt-4"
                      style={{
                        color: "var(--color-text-secondary)",
                        fontFamily: "var(--font-sans)",
                      }}
                    >
                      Secure checkout · Free shipping over Rs. 8,000
                    </p>

                    <div className="mt-6 text-center">
                      <Link
                        href="/shop"
                        className="text-xs transition-opacity hover:opacity-70"
                        style={{
                          color: "var(--color-gold)",
                          fontFamily: "var(--font-sans)",
                        }}
                      >
                        ← Continue Shopping
                      </Link>
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
