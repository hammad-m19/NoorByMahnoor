"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { products } from "@/data/products";
import { formatPrice } from "@/lib/utils";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionDivider from "@/components/ui/SectionDivider";

export default function FeaturedFragrances() {
  return (
    <section
      className="py-20 md:py-28 px-6 lg:px-12"
      style={{ background: "var(--color-bg-secondary)" }}
    >
      <div className="mx-auto" style={{ maxWidth: "var(--content-max-width)" }}>
        {/* Section Header */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <span
              className="text-small-caps block mb-4"
              style={{ color: "var(--color-gold)" }}
            >
              The Collection
            </span>
            <h2
              className="heading-serif text-3xl md:text-4xl lg:text-5xl mb-4"
              style={{ color: "var(--color-text-primary)" }}
            >
              Our Fragrances
            </h2>
            <SectionDivider />
          </div>
        </ScrollReveal>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {products.slice(0, 2).map((product, i) => (
            <ScrollReveal key={product.id} delay={i * 0.15}>
              <Link href={`/product/${product.slug}`} className="group block">
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="overflow-hidden"
                  style={{ background: "var(--color-bg-primary)" }}
                >
                  {/* Image Container */}
                  <div className="relative aspect-[4/5] overflow-hidden">
                    {/* Primary image */}
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="object-cover transition-opacity duration-700 ease-out group-hover:opacity-0"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      loading="lazy"
                    />
                    {/* Secondary image (hover) */}
                    {product.images[1] && (
                      <Image
                        src={product.images[1]}
                        alt={`${product.name} detail`}
                        fill
                        className="object-cover opacity-0 transition-opacity duration-700 ease-out group-hover:opacity-100"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        loading="lazy"
                        fetchPriority="low"
                      />
                    )}

                    {/* Scent Family Badge */}
                    <div
                      className="absolute top-4 left-4"
                    >
                      <span
                        className="text-small-caps px-3 py-1.5"
                        style={{
                          fontSize: "0.6rem",
                          background: "rgba(246, 238, 226, 0.9)",
                          color: "var(--color-gold)",
                        }}
                      >
                        {product.category}
                      </span>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-6 text-center">
                    <h3
                      className="heading-serif text-xl md:text-2xl mb-1"
                      style={{ color: "var(--color-text-primary)" }}
                    >
                      {product.name}
                    </h3>
                    <p
                      className="text-sm italic mb-3 heading-serif"
                      style={{ color: "var(--color-text-secondary)" }}
                    >
                      {product.tagline}
                    </p>
                    <p
                      className="text-xs mb-4"
                      style={{
                        color: "var(--color-text-secondary)",
                        fontFamily: "var(--font-sans)",
                      }}
                    >
                      {product.notes.top.slice(0, 2).join(" · ")}{" "}
                      · {product.notes.heart.slice(0, 1).join("")}{" "}
                      · {product.notes.base.slice(0, 1).join("")}
                    </p>
                    <p
                      className="text-base mb-4 gold-text font-medium"
                      style={{ fontFamily: "var(--font-sans)" }}
                    >
                      {formatPrice(product.price)}
                    </p>

                    {/* View Details */}
                    <span
                      className="text-small-caps inline-block relative pb-0.5"
                      style={{
                        color: "var(--color-gold)",
                        fontSize: "0.7rem",
                      }}
                    >
                      View Details
                      <span
                        className="absolute bottom-0 left-0 h-px transition-all duration-300 ease-out"
                        style={{
                          width: "0%",
                          background: "var(--color-gold-light)",
                        }}
                      />
                      <span
                        className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full transition-all duration-300 ease-out"
                        style={{ background: "var(--color-gold)" }}
                      />
                    </span>
                  </div>
                </motion.div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
