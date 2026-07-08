"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { toggleCart, itemCount } = useCart();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          height: scrolled ? "var(--nav-height-scrolled)" : "var(--nav-height)",
          background: scrolled
            ? "rgba(246, 238, 226, 0.92)"
            : "rgba(246, 238, 226, 0.6)",
          backdropFilter: scrolled ? "blur(12px)" : "blur(4px)",
          borderBottom: scrolled ? "1px solid rgba(169, 121, 60, 0.12)" : "none",
        }}
      >
        <nav className="mx-auto flex h-full items-center justify-between px-6 lg:px-12" style={{ maxWidth: "var(--content-max-width)" }}>
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group" aria-label="Noor by Mahnoor — Home">
            <div className="flex flex-col items-center">
              <span
                className="heading-display text-xl lg:text-2xl tracking-[0.25em]"
                style={{ color: "var(--color-text-primary)" }}
              >
                NOOR
              </span>
              <span className="flex items-center gap-2">
                <span
                  className="block h-px w-4"
                  style={{ background: "var(--color-gold)" }}
                />
                <span
                  className="text-small-caps"
                  style={{
                    fontSize: "0.55rem",
                    letterSpacing: "0.25em",
                    color: "var(--color-gold)",
                  }}
                >
                  BY MAHNOOR
                </span>
                <span
                  className="block h-px w-4"
                  style={{ background: "var(--color-gold)" }}
                />
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-small-caps relative group py-1"
                style={{
                  color:
                    pathname === link.href
                      ? "var(--color-gold)"
                      : "var(--color-text-secondary)",
                }}
              >
                {link.label}
                <span
                  className="absolute bottom-0 left-0 h-px transition-all duration-300 ease-out"
                  style={{
                    width: pathname === link.href ? "100%" : "0%",
                    background: "var(--color-gold)",
                  }}
                />
                <span
                  className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full transition-all duration-300 ease-out"
                  style={{ background: "var(--color-gold-light)" }}
                />
              </Link>
            ))}
          </div>

          {/* Right side: Cart + Mobile menu */}
          <div className="flex items-center gap-4">
            {/* Cart Button */}
            <button
              onClick={toggleCart}
              className="relative p-2 transition-colors duration-200"
              style={{ color: "var(--color-text-primary)" }}
              aria-label={`Shopping cart with ${itemCount} items`}
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
              {itemCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-0.5 -right-0.5 flex h-4.5 w-4.5 items-center justify-center rounded-full text-[0.6rem] font-medium"
                  style={{
                    background: "var(--color-gold)",
                    color: "var(--color-text-light)",
                  }}
                >
                  {itemCount}
                </motion.span>
              )}
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2"
              aria-label="Toggle menu"
              style={{ color: "var(--color-text-primary)" }}
            >
              <div className="flex flex-col gap-1.5 w-5">
                <motion.span
                  animate={
                    mobileOpen
                      ? { rotate: 45, y: 6 }
                      : { rotate: 0, y: 0 }
                  }
                  className="block h-px w-full"
                  style={{ background: "var(--color-text-primary)" }}
                />
                <motion.span
                  animate={
                    mobileOpen ? { opacity: 0 } : { opacity: 1 }
                  }
                  className="block h-px w-full"
                  style={{ background: "var(--color-text-primary)" }}
                />
                <motion.span
                  animate={
                    mobileOpen
                      ? { rotate: -45, y: -6 }
                      : { rotate: 0, y: 0 }
                  }
                  className="block h-px w-full"
                  style={{ background: "var(--color-text-primary)" }}
                />
              </div>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden"
            style={{ background: "rgba(246, 238, 226, 0.98)" }}
          >
            <div className="flex flex-col items-center justify-center h-full gap-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    href={link.href}
                    className="heading-display text-2xl"
                    style={{
                      color:
                        pathname === link.href
                          ? "var(--color-gold)"
                          : "var(--color-text-primary)",
                    }}
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer for fixed navbar */}
      <div style={{ height: "var(--nav-height)" }} />
    </>
  );
}
