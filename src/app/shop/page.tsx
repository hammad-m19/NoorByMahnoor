"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { products, getCategories } from "@/data/products";
import { formatPrice } from "@/lib/utils";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionDivider from "@/components/ui/SectionDivider";

type SortOption = "default" | "price-asc" | "price-desc";

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [sortBy, setSortBy] = useState<SortOption>("default");

  const categories = useMemo(() => ["All", ...getCategories()], []);

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    if (selectedCategory !== "All") {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    switch (sortBy) {
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price);
        break;
    }

    return filtered;
  }, [selectedCategory, sortBy]);

  return (
    <div style={{ background: "var(--color-bg-primary)" }}>
      {/* Page Header */}
      <div className="pt-16 pb-12 px-6 lg:px-12 text-center">
        <ScrollReveal>
          <span
            className="text-small-caps block mb-4"
            style={{ color: "var(--color-gold)" }}
          >
            Explore
          </span>
          <h1
            className="heading-serif text-4xl md:text-5xl lg:text-6xl mb-4"
            style={{ color: "var(--color-text-primary)" }}
          >
            The Collection
          </h1>
          <SectionDivider />
        </ScrollReveal>
      </div>

      {/* Filters & Sort */}
      <div className="px-6 lg:px-12 mb-12">
        <div
          className="mx-auto flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ maxWidth: "var(--content-max-width)" }}
        >
          {/* Filter Pills */}
          <div className="flex items-center gap-2 flex-wrap justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className="text-small-caps px-4 py-2 transition-all duration-300"
                style={{
                  fontSize: "0.65rem",
                  background:
                    selectedCategory === category
                      ? "var(--color-gold)"
                      : "transparent",
                  color:
                    selectedCategory === category
                      ? "var(--color-bg-primary)"
                      : "var(--color-text-secondary)",
                  border: `1px solid ${
                    selectedCategory === category
                      ? "var(--color-gold)"
                      : "rgba(169, 121, 60, 0.25)"
                  }`,
                }}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="text-small-caps px-4 py-2 outline-none cursor-pointer"
            style={{
              fontSize: "0.65rem",
              background: "transparent",
              color: "var(--color-text-secondary)",
              border: "1px solid rgba(169, 121, 60, 0.25)",
              fontFamily: "var(--font-sans)",
            }}
          >
            <option value="default">Sort By</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Product Grid */}
      <div className="px-6 lg:px-12 pb-20">
        <div
          className="mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          style={{ maxWidth: "var(--content-max-width)" }}
        >
          {filteredProducts.map((product, i) => (
            <ScrollReveal key={product.id} delay={i * 0.1}>
              <Link href={`/product/${product.slug}`} className="group block">
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="overflow-hidden shadow-sm"
                  style={{ background: "var(--color-bg-secondary)" }}
                >
                  {/* Image */}
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="object-cover transition-opacity duration-700 ease-out group-hover:opacity-0"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      loading="lazy"
                    />
                    {product.images[1] && (
                      <Image
                        src={product.images[1]}
                        alt={`${product.name} detail`}
                        fill
                        className="object-cover opacity-0 transition-opacity duration-700 ease-out group-hover:opacity-100"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        loading="lazy"
                        fetchPriority="low"
                      />
                    )}

                    {!product.inStock && (
                      <div className="absolute top-4 right-4">
                        <span
                          className="text-small-caps px-3 py-1"
                          style={{
                            fontSize: "0.6rem",
                            background: "var(--color-accent-burgundy)",
                            color: "var(--color-text-light)",
                          }}
                        >
                          Sold Out
                        </span>
                      </div>
                    )}

                    <div className="absolute top-4 left-4">
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
                  <div className="p-5 text-center">
                    <h3
                      className="heading-serif text-lg md:text-xl mb-1"
                      style={{ color: "var(--color-text-primary)" }}
                    >
                      {product.name}
                    </h3>
                    <p
                      className="text-xs mb-3 italic heading-serif"
                      style={{ color: "var(--color-text-secondary)" }}
                    >
                      {product.tagline}
                    </p>
                    <p
                      className="text-xs mb-3"
                      style={{
                        color: "var(--color-text-secondary)",
                        fontFamily: "var(--font-sans)",
                      }}
                    >
                      {product.notes.top.slice(0, 2).join(", ")}{" "}
                      · {product.notes.heart[0]}{" "}
                      · {product.notes.base[0]}
                    </p>
                    <p
                      className="gold-text font-medium mb-3"
                      style={{ fontFamily: "var(--font-sans)" }}
                    >
                      {formatPrice(product.price)}
                    </p>
                    <span
                      className="text-small-caps inline-block relative pb-0.5"
                      style={{ color: "var(--color-gold)", fontSize: "0.65rem" }}
                    >
                      View Details
                      <span
                        className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full transition-all duration-300"
                        style={{ background: "var(--color-gold)" }}
                      />
                    </span>
                  </div>
                </motion.div>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="heading-serif text-lg" style={{ color: "var(--color-text-secondary)" }}>
              No fragrances found in this category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
