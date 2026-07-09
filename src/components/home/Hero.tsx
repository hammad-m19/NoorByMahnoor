"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden" style={{ height: "100vh", minHeight: "600px" }}>
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero.png"
          alt="Noor by Mahnoor luxury fragrance collection"
          fill
          className="object-cover"
          priority
          fetchPriority="high"
          sizes="100vw"
        />
        {/* Overlay gradient */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(246, 238, 226, 0.3) 0%, rgba(246, 238, 226, 0.1) 40%, rgba(246, 238, 226, 0.6) 80%, rgba(246, 238, 226, 0.95) 100%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center">
        {/* Sparkle accent */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
          className="mb-6"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 16 16"
            fill="none"
            className="animate-sparkle"
            aria-hidden="true"
          >
            <path
              d="M8 0L9.41 6.59L16 8L9.41 9.41L8 16L6.59 9.41L0 8L6.59 6.59L8 0Z"
              fill="#C8A66B"
            />
          </svg>
        </motion.div>

        {/* Logo/Monogram */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-4"
        >
          <h1
            className="heading-display text-5xl md:text-7xl lg:text-8xl tracking-[0.3em]"
            style={{ color: "var(--color-text-primary)" }}
          >
            NOOR
          </h1>
          <div className="flex items-center justify-center gap-3 mt-2">
            <span className="block h-px w-8 md:w-12" style={{ background: "var(--color-gold)" }} />
            <span
              className="text-small-caps"
              style={{
                fontSize: "0.65rem",
                letterSpacing: "0.3em",
                color: "var(--color-gold)",
              }}
            >
              BY MAHNOOR
            </span>
            <span className="block h-px w-8 md:w-12" style={{ background: "var(--color-gold)" }} />
          </div>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="heading-serif text-lg md:text-xl lg:text-2xl max-w-lg mb-10 italic"
          style={{ color: "var(--color-text-secondary)" }}
        >
          Luxury in Every Drop
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <Link href="/shop" className="btn-primary">
            Discover the Collection
          </Link>
        </motion.div>
      </div>

    </section>
  );
}
