import Image from "next/image";
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

        {/* Story Image */}
        <ScrollReveal delay={0.2} direction="right">
          <div className="flex items-center justify-center">
            <div 
              className="relative w-full max-w-[360px] aspect-[600/1024] overflow-hidden shadow-2xl border"
              style={{ 
                borderColor: "rgba(200, 166, 107, 0.15)",
                borderRadius: "var(--radius-lg)"
              }}
            >
              <Image
                src="/images/combo.jpeg"
                alt="Noor by Mahnoor Perfume Collection"
                fill
                sizes="(max-width: 768px) 100vw, 360px"
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
              <div 
                className="absolute inset-0 pointer-events-none" 
                style={{ 
                  boxShadow: "inset 0 0 40px rgba(0,0,0,0.1)"
                }}
              />
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
