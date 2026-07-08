"use client";

import Image from "next/image";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionDivider from "@/components/ui/SectionDivider";

const values = [
  {
    title: "Craftsmanship",
    description:
      "Every bottle is the result of months of careful formulation — balancing rare ingredients with precision and intuition until the scent feels inevitable.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#A9793C" strokeWidth="1" aria-hidden="true">
        <path d="M16 2L18 12L28 14L18 16L16 26L14 16L4 14L14 12L16 2Z" />
        <circle cx="16" cy="14" r="4" />
      </svg>
    ),
  },
  {
    title: "Heritage",
    description:
      "Rooted in the rich tradition of South Asian perfumery — attar, oud, rose — reimagined for the modern woman who honours her roots while forging her own path.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#A9793C" strokeWidth="1" aria-hidden="true">
        <path d="M16 4C20 4 24 8 24 12C24 16 20 20 16 20C18 20 22 17 22 12C22 7 18 4 16 4Z" />
        <path d="M16 20L16 28" />
        <path d="M12 28L20 28" />
      </svg>
    ),
  },
  {
    title: "Elegance",
    description:
      "We believe luxury whispers. Our fragrances are designed to be discovered, not announced — a quiet confidence that lingers in memory.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#A9793C" strokeWidth="1" aria-hidden="true">
        <path d="M8 24C8 18 12 14 16 10C20 14 24 18 24 24" />
        <path d="M12 24C12 20 14 17 16 14C18 17 20 20 20 24" />
        <line x1="16" y1="24" x2="16" y2="28" />
      </svg>
    ),
  },
];

export default function AboutPage() {
  return (
    <div style={{ background: "var(--color-bg-primary)" }}>
      {/* Hero Header */}
      <div className="pt-16 pb-12 px-6 lg:px-12 text-center">
        <ScrollReveal>
          <span
            className="text-small-caps block mb-4"
            style={{ color: "var(--color-gold)" }}
          >
            Our Story
          </span>
          <h1
            className="heading-serif text-4xl md:text-5xl lg:text-6xl mb-4"
            style={{ color: "var(--color-text-primary)" }}
          >
            The Art of Noor
          </h1>
          <SectionDivider />
        </ScrollReveal>
      </div>

      {/* Founder Story */}
      <section className="px-6 lg:px-12 pb-20">
        <div
          className="mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
          style={{ maxWidth: "var(--content-max-width)" }}
        >
          <ScrollReveal>
            <div className="relative aspect-[4/5] overflow-hidden" style={{ background: "var(--color-bg-secondary)" }}>
              <Image
                src="/images/about-founder.png"
                alt="The founder of Noor by Mahnoor at work in her atelier"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                loading="lazy"
              />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <div>
              <span
                className="text-small-caps block mb-4"
                style={{ color: "var(--color-gold)" }}
              >
                The Founder
              </span>
              <h2
                className="heading-serif text-2xl md:text-3xl lg:text-4xl mb-6"
                style={{ color: "var(--color-text-primary)" }}
              >
                A fragrance is a feeling you can carry with you
              </h2>
              <div className="space-y-4">
                <p
                  className="text-base leading-relaxed"
                  style={{
                    color: "var(--color-text-secondary)",
                    fontFamily: "var(--font-sans)",
                  }}
                >
                  Noor by Mahnoor was born from a deeply personal passion. Growing up
                  surrounded by the scents of her grandmother&apos;s garden — jasmine at
                  dusk, rose-water on warm skin, sandalwood in evening prayers — Mahnoor
                  learned that fragrance is the most intimate form of self-expression.
                </p>
                <p
                  className="text-base leading-relaxed"
                  style={{
                    color: "var(--color-text-secondary)",
                    fontFamily: "var(--font-sans)",
                  }}
                >
                  After years of studying perfumery and sourcing the finest ingredients
                  from around the world, she launched Noor with a clear vision: to create
                  fragrances that honour the rich heritage of South Asian perfumery while
                  speaking to the modern, independent woman.
                </p>
                <p
                  className="text-base leading-relaxed"
                  style={{
                    color: "var(--color-text-secondary)",
                    fontFamily: "var(--font-sans)",
                  }}
                >
                  Each scent in the collection is named for a moment of light —
                  &ldquo;Noor&rdquo; means radiance in Urdu — because we believe the right
                  fragrance doesn&apos;t just complement who you are; it illuminates you.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Full-width Mood Image */}
      <section className="relative h-64 md:h-80 lg:h-96 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(135deg, rgba(169, 121, 60, 0.15), rgba(200, 166, 107, 0.1))",
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <ScrollReveal>
            <blockquote className="text-center px-6 max-w-2xl">
              <p
                className="heading-serif text-2xl md:text-3xl lg:text-4xl italic"
                style={{ color: "var(--color-text-primary)" }}
              >
                &ldquo;The right scent doesn&apos;t just complement who you are — it illuminates you.&rdquo;
              </p>
              <footer className="mt-4">
                <span
                  className="text-small-caps"
                  style={{ color: "var(--color-gold)" }}
                >
                  — Mahnoor
                </span>
              </footer>
            </blockquote>
          </ScrollReveal>
        </div>
        {/* Botanical line-art background */}
        <svg
          className="absolute right-0 bottom-0 opacity-[0.06] pointer-events-none"
          width="300"
          height="300"
          viewBox="0 0 300 300"
          fill="none"
          aria-hidden="true"
        >
          <path d="M250 280C230 240 200 220 150 200C180 230 190 260 195 280" stroke="#A9793C" strokeWidth="1" />
          <path d="M250 280C230 250 190 230 140 225C175 245 195 270 200 280" stroke="#A9793C" strokeWidth="1" />
          <path d="M250 280C250 250 240 220 220 195C240 220 245 250 248 280" stroke="#A9793C" strokeWidth="1" />
        </svg>
      </section>

      {/* Brand Values */}
      <section
        className="py-20 md:py-28 px-6 lg:px-12"
        style={{ background: "var(--color-bg-secondary)" }}
      >
        <div className="mx-auto" style={{ maxWidth: "var(--content-max-width)" }}>
          <ScrollReveal>
            <div className="text-center mb-16">
              <span
                className="text-small-caps block mb-4"
                style={{ color: "var(--color-gold)" }}
              >
                What We Believe
              </span>
              <h2
                className="heading-serif text-3xl md:text-4xl mb-4"
                style={{ color: "var(--color-text-primary)" }}
              >
                Our Values
              </h2>
              <SectionDivider />
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16">
            {values.map((value, i) => (
              <ScrollReveal key={value.title} delay={i * 0.15}>
                <div className="text-center">
                  <div className="flex justify-center mb-5">{value.icon}</div>
                  <h3
                    className="heading-serif text-xl mb-3"
                    style={{ color: "var(--color-text-primary)" }}
                  >
                    {value.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{
                      color: "var(--color-text-secondary)",
                      fontFamily: "var(--font-sans)",
                    }}
                  >
                    {value.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
