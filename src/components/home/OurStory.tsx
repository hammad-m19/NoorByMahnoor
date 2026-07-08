"use client";

import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionDivider from "@/components/ui/SectionDivider";

export default function OurStory() {
  return (
    <section
      className="py-20 md:py-28 px-6 lg:px-12"
      style={{ background: "var(--color-bg-primary)" }}
    >
      <div
        className="mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
        style={{ maxWidth: "var(--content-max-width)" }}
      >
        {/* Text */}
        <ScrollReveal>
          <div className="max-w-lg mx-auto lg:mx-0">
            <span
              className="text-small-caps block mb-4"
              style={{ color: "var(--color-gold)" }}
            >
              Our Story
            </span>
            <h2
              className="heading-serif text-3xl md:text-4xl lg:text-5xl mb-6"
              style={{ color: "var(--color-text-primary)" }}
            >
              Born from a love of light and scent
            </h2>
            <p
              className="text-base mb-4 leading-relaxed"
              style={{
                color: "var(--color-text-secondary)",
                fontFamily: "var(--font-sans)",
              }}
            >
              Noor by Mahnoor began with a simple belief: that a fragrance should feel
              as personal as a memory. Each scent in our collection is handcrafted to
              capture a moment of radiance — the amber glow of a setting sun, the quiet
              beauty of a garden at dawn.
            </p>
            <p
              className="text-base leading-relaxed mb-8"
              style={{
                color: "var(--color-text-secondary)",
                fontFamily: "var(--font-sans)",
              }}
            >
              We blend the finest ingredients with centuries-old perfumery traditions
              to create fragrances that are warm, layered, and unmistakably elegant.
              Because true luxury is not about being noticed — it&apos;s about being remembered.
            </p>
            <SectionDivider />
          </div>
        </ScrollReveal>

        {/* Botanical Line Art */}
        <ScrollReveal delay={0.2} direction="right">
          <div className="flex items-center justify-center">
            <svg
              width="280"
              height="380"
              viewBox="0 0 280 380"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="opacity-30"
              aria-hidden="true"
            >
              {/* Crescent moon */}
              <path
                d="M140 40C165 40 185 60 185 85C185 110 165 130 140 130C155 130 170 115 170 85C170 55 155 40 140 40Z"
                stroke="#A9793C"
                strokeWidth="1"
                fill="none"
              />
              {/* Main stem */}
              <path
                d="M140 130L140 340"
                stroke="#A9793C"
                strokeWidth="0.8"
              />
              {/* Left leaves */}
              <path
                d="M140 180C120 160 90 165 85 180C80 195 100 210 140 200"
                stroke="#A9793C"
                strokeWidth="0.8"
                fill="none"
              />
              <path
                d="M140 230C115 215 80 225 78 245C76 265 110 270 140 255"
                stroke="#A9793C"
                strokeWidth="0.8"
                fill="none"
              />
              {/* Right leaves */}
              <path
                d="M140 200C160 185 190 190 193 205C196 220 175 230 140 225"
                stroke="#A9793C"
                strokeWidth="0.8"
                fill="none"
              />
              <path
                d="M140 270C165 255 195 260 198 278C201 296 170 305 140 290"
                stroke="#A9793C"
                strokeWidth="0.8"
                fill="none"
              />
              {/* Small leaf sprigs */}
              <path
                d="M140 155C128 148 118 152 116 160"
                stroke="#A9793C"
                strokeWidth="0.6"
                fill="none"
              />
              <path
                d="M140 155C152 148 162 152 164 160"
                stroke="#A9793C"
                strokeWidth="0.6"
                fill="none"
              />
              {/* Sparkle accent */}
              <path
                d="M140 95L141.5 100L147 102L141.5 104L140 109L138.5 104L133 102L138.5 100L140 95Z"
                fill="#C8A66B"
              />
              {/* Small dots */}
              <circle cx="140" cy="340" r="2" fill="#C8A66B" />
            </svg>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
