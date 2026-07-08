"use client";

import { useState } from "react";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail("");
    }
  };

  return (
    <section
      className="relative py-16 md:py-20 px-6 lg:px-12 overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #A9793C, #C8A66B, #A9793C)",
      }}
    >
      {/* Decorative crescent line-art */}
      <div className="absolute top-0 right-0 opacity-10 pointer-events-none" aria-hidden="true">
        <svg width="200" height="200" viewBox="0 0 200 200" fill="none">
          <path
            d="M100 20C140 20 170 50 170 90C170 130 140 160 100 160C130 160 155 135 155 90C155 45 130 20 100 20Z"
            stroke="#F6EEE2"
            strokeWidth="1"
          />
        </svg>
      </div>

      <div className="mx-auto text-center relative z-10" style={{ maxWidth: "600px" }}>
        <ScrollReveal>
          <span
            className="text-small-caps block mb-4"
            style={{ color: "rgba(246, 238, 226, 0.7)", fontSize: "0.7rem" }}
          >
            Stay Connected
          </span>
          <h2
            className="heading-serif text-2xl md:text-3xl lg:text-4xl mb-3"
            style={{ color: "var(--color-bg-primary)" }}
          >
            Join the Noor Circle
          </h2>
          <p
            className="text-sm mb-8"
            style={{
              color: "rgba(246, 238, 226, 0.75)",
              fontFamily: "var(--font-sans)",
            }}
          >
            Be the first to discover new fragrances, exclusive offers, and stories from the atelier.
          </p>

          {submitted ? (
            <div className="flex items-center justify-center gap-2">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M8 0L9.41 6.59L16 8L9.41 9.41L8 16L6.59 9.41L0 8L6.59 6.59L8 0Z" fill="#F6EEE2" />
              </svg>
              <span className="text-sm" style={{ color: "var(--color-bg-primary)", fontFamily: "var(--font-sans)" }}>
                Welcome to the circle. We&apos;ll be in touch.
              </span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                className="flex-1 px-4 py-3 text-sm outline-none"
                style={{
                  background: "rgba(246, 238, 226, 0.15)",
                  border: "1px solid rgba(246, 238, 226, 0.3)",
                  color: "var(--color-bg-primary)",
                  fontFamily: "var(--font-sans)",
                }}
              />
              <button
                type="submit"
                className="px-6 py-3 text-small-caps transition-all duration-300"
                style={{
                  background: "var(--color-bg-primary)",
                  color: "var(--color-gold)",
                  fontSize: "0.7rem",
                }}
              >
                Subscribe
              </button>
            </form>
          )}
        </ScrollReveal>
      </div>
    </section>
  );
}
