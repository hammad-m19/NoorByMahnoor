"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionDivider from "@/components/ui/SectionDivider";

const testimonials = [
  {
    id: 1,
    quote:
      "Midnight Blue is unlike anything I've worn before. It's warm, complex, and absolutely captivating. I receive compliments every time.",
    name: "Ayesha K.",
    location: "Lahore",
  },
  {
    id: 2,
    quote:
      "Pink Passion is my signature scent now. It's delicate without being faint — the rose lasts beautifully all day. A true gem.",
    name: "Fatima S.",
    location: "Islamabad",
  },
  {
    id: 3,
    quote:
      "The attention to detail in these fragrances is remarkable. You can tell they're crafted with genuine passion and the finest ingredients.",
    name: "Sara M.",
    location: "Karachi",
  },
  {
    id: 4,
    quote:
      "I bought both as gifts and now I need them for myself! The packaging is gorgeous and the scents are pure luxury.",
    name: "Hira R.",
    location: "Dubai",
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section
      className="py-20 md:py-28 px-6 lg:px-12"
      style={{ background: "var(--color-bg-primary)" }}
    >
      <div className="mx-auto" style={{ maxWidth: "800px" }}>
        <ScrollReveal>
          <div className="text-center mb-12">
            <span
              className="text-small-caps block mb-4"
              style={{ color: "var(--color-gold)" }}
            >
              Testimonials
            </span>
            <h2
              className="heading-serif text-3xl md:text-4xl mb-4"
              style={{ color: "var(--color-text-primary)" }}
            >
              Voices of Noor
            </h2>
            <SectionDivider />
          </div>
        </ScrollReveal>

        {/* Carousel */}
        <div className="relative min-h-[200px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-center"
            >
              {/* Gold quotation mark */}
              <div className="mb-6">
                <span
                  className="heading-serif text-5xl"
                  style={{ color: "var(--color-gold-light)", opacity: 0.5 }}
                >
                  &ldquo;
                </span>
              </div>

              <blockquote
                className="heading-serif text-lg md:text-xl lg:text-2xl italic mb-8 leading-relaxed"
                style={{ color: "var(--color-text-primary)" }}
              >
                {testimonials[current].quote}
              </blockquote>

              <div>
                <p
                  className="text-small-caps mb-1"
                  style={{ color: "var(--color-gold)" }}
                >
                  {testimonials[current].name}
                </p>
                <p
                  className="text-xs"
                  style={{
                    color: "var(--color-text-secondary)",
                    fontFamily: "var(--font-sans)",
                  }}
                >
                  {testimonials[current].location}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className="w-2 h-2 rounded-full transition-all duration-300"
              style={{
                background:
                  i === current
                    ? "var(--color-gold)"
                    : "var(--color-gold-light)",
                opacity: i === current ? 1 : 0.3,
                transform: i === current ? "scale(1.3)" : "scale(1)",
              }}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
