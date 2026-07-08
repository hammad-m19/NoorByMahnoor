"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { notFound } from "next/navigation";
import { use } from "react";
import { getProductBySlug, getOtherProducts } from "@/data/products";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionDivider from "@/components/ui/SectionDivider";
import Toast, { useToast } from "@/components/ui/Toast";

export default function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return <ProductDetail slug={slug} />;
}

function ProductDetail({ slug }: { slug: string }) {
  const product = getProductBySlug(slug)!;
  const otherProducts = getOtherProducts(slug);
  const { addItem } = useCart();
  const { toast, showToast, hideToast } = useToast();

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [openAccordion, setOpenAccordion] = useState<string | null>("description");

  const handleAddToCart = () => {
    addItem(product, quantity);
    showToast(`${product.name} added to your bag ✨`);
    setQuantity(1);
  };

  const toggleAccordion = (key: string) => {
    setOpenAccordion(openAccordion === key ? null : key);
  };

  return (
    <div style={{ background: "var(--color-bg-primary)" }}>
      <Toast message={toast.message} isVisible={toast.isVisible} onClose={hideToast} />

      {/* Breadcrumb */}
      <div className="px-6 lg:px-12 pt-6 pb-4">
        <div className="mx-auto" style={{ maxWidth: "var(--content-max-width)" }}>
          <nav className="flex items-center gap-2 text-xs" style={{ fontFamily: "var(--font-sans)", color: "var(--color-text-secondary)" }}>
            <Link href="/" className="hover:opacity-70 transition-opacity">Home</Link>
            <span>/</span>
            <Link href="/shop" className="hover:opacity-70 transition-opacity">Shop</Link>
            <span>/</span>
            <span style={{ color: "var(--color-gold)" }}>{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Main Product Section */}
      <div className="px-6 lg:px-12 pb-16">
        <div
          className="mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16"
          style={{ maxWidth: "var(--content-max-width)" }}
        >
          {/* Image Gallery */}
          <ScrollReveal>
            <div>
              {/* Main Image */}
              <div
                className="relative aspect-[4/5] mb-4 overflow-hidden image-zoom-container"
                style={{ background: "var(--color-bg-secondary)" }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedImage}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="relative w-full h-full"
                  >
                    <Image
                      src={product.images[selectedImage]}
                      alt={`${product.name} - Image ${selectedImage + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Thumbnails */}
              <div className="flex gap-3">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className="relative w-20 h-24 overflow-hidden transition-all duration-200"
                    style={{
                      border: i === selectedImage ? "2px solid var(--color-gold)" : "2px solid transparent",
                      opacity: i === selectedImage ? 1 : 0.6,
                    }}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} thumbnail ${i + 1}`}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </button>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Product Info */}
          <ScrollReveal delay={0.15}>
            <div className="lg:py-4">
              {/* Scent Family */}
              <span
                className="text-small-caps inline-block mb-4"
                style={{ color: "var(--color-gold)", fontSize: "0.65rem" }}
              >
                {product.scentFamily}
              </span>

              {/* Name */}
              <h1
                className="heading-serif text-3xl md:text-4xl lg:text-5xl mb-2"
                style={{ color: "var(--color-text-primary)" }}
              >
                {product.name}
              </h1>

              {/* Tagline */}
              <p
                className="heading-serif text-base italic mb-4"
                style={{ color: "var(--color-text-secondary)" }}
              >
                {product.tagline}
              </p>

              {/* Price */}
              <p
                className="gold-text text-2xl font-medium mb-6"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                {formatPrice(product.price)}
              </p>

              {/* Size */}
              <p
                className="text-xs mb-6"
                style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-sans)" }}
              >
                {product.size}
              </p>

              {/* Scent Notes Pyramid */}
              <div className="mb-8">
                <h3
                  className="text-small-caps mb-4"
                  style={{ color: "var(--color-text-primary)" }}
                >
                  Scent Notes
                </h3>
                <div className="space-y-3">
                  {(["top", "heart", "base"] as const).map((tier, i) => (
                    <motion.div
                      key={tier}
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + i * 0.15, duration: 0.5 }}
                      className="flex items-start gap-4"
                    >
                      <span
                        className="text-small-caps w-12 flex-shrink-0 pt-0.5"
                        style={{
                          color: "var(--color-gold)",
                          fontSize: "0.6rem",
                        }}
                      >
                        {tier}
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {product.notes[tier].map((note) => (
                          <span
                            key={note}
                            className="text-xs px-3 py-1"
                            style={{
                              fontFamily: "var(--font-sans)",
                              color: "var(--color-text-secondary)",
                              border: "1px solid rgba(169, 121, 60, 0.2)",
                            }}
                          >
                            {note}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Quantity & Add to Cart */}
              <div className="flex items-center gap-4 mb-8">
                {/* Quantity */}
                <div
                  className="flex items-center"
                  style={{ border: "1px solid rgba(169, 121, 60, 0.25)" }}
                >
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2.5 text-sm transition-colors"
                    style={{ color: "var(--color-text-secondary)" }}
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <span
                    className="px-4 py-2.5 text-sm"
                    style={{
                      fontFamily: "var(--font-sans)",
                      color: "var(--color-text-primary)",
                      borderLeft: "1px solid rgba(169, 121, 60, 0.15)",
                      borderRight: "1px solid rgba(169, 121, 60, 0.15)",
                    }}
                  >
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2.5 text-sm transition-colors"
                    style={{ color: "var(--color-text-secondary)" }}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart */}
                <motion.button
                  onClick={handleAddToCart}
                  className="btn-primary flex-1"
                  whileTap={{ scale: 0.97 }}
                  disabled={!product.inStock}
                  style={{
                    opacity: product.inStock ? 1 : 0.5,
                    cursor: product.inStock ? "pointer" : "not-allowed",
                  }}
                >
                  {product.inStock ? "Add to Bag" : "Sold Out"}
                </motion.button>
              </div>

              {/* Accordion Details */}
              <div style={{ borderTop: "1px solid rgba(169, 121, 60, 0.15)" }}>
                {[
                  { key: "description", label: "Description", content: product.description },
                  { key: "ingredients", label: "Ingredients", content: product.ingredients },
                  { key: "longevity", label: "Longevity & Sillage", content: product.longevity },
                ].map((item) => (
                  <div
                    key={item.key}
                    style={{ borderBottom: "1px solid rgba(169, 121, 60, 0.15)" }}
                  >
                    <button
                      onClick={() => toggleAccordion(item.key)}
                      className="flex items-center justify-between w-full py-4 text-left"
                    >
                      <span
                        className="text-small-caps"
                        style={{
                          color: openAccordion === item.key
                            ? "var(--color-gold)"
                            : "var(--color-text-primary)",
                        }}
                      >
                        {item.label}
                      </span>
                      <motion.span
                        animate={{ rotate: openAccordion === item.key ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        style={{ color: "var(--color-gold)" }}
                      >
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M2 4l4 4 4-4" />
                        </svg>
                      </motion.span>
                    </button>
                    <AnimatePresence>
                      {openAccordion === item.key && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <p
                            className="text-sm pb-4 leading-relaxed"
                            style={{
                              color: "var(--color-text-secondary)",
                              fontFamily: "var(--font-sans)",
                            }}
                          >
                            {item.content}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* You May Also Like */}
      {otherProducts.length > 0 && (
        <section
          className="py-16 px-6 lg:px-12"
          style={{ background: "var(--color-bg-secondary)" }}
        >
          <div className="mx-auto" style={{ maxWidth: "var(--content-max-width)" }}>
            <ScrollReveal>
              <div className="text-center mb-12">
                <h2
                  className="heading-serif text-2xl md:text-3xl mb-4"
                  style={{ color: "var(--color-text-primary)" }}
                >
                  You May Also Like
                </h2>
                <SectionDivider />
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {otherProducts.map((p, i) => (
                <ScrollReveal key={p.id} delay={i * 0.1}>
                  <Link href={`/product/${p.slug}`} className="group block">
                    <motion.div
                      whileHover={{ y: -4 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="overflow-hidden"
                      style={{ background: "var(--color-bg-primary)" }}
                    >
                      <div className="relative aspect-[4/5] overflow-hidden">
                        <Image
                          src={p.images[0]}
                          alt={p.name}
                          fill
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          loading="lazy"
                        />
                      </div>
                      <div className="p-5 text-center">
                        <h3
                          className="heading-serif text-lg mb-1"
                          style={{ color: "var(--color-text-primary)" }}
                        >
                          {p.name}
                        </h3>
                        <p
                          className="gold-text font-medium text-sm"
                          style={{ fontFamily: "var(--font-sans)" }}
                        >
                          {formatPrice(p.price)}
                        </p>
                      </div>
                    </motion.div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
