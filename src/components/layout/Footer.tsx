"use client";

import Link from "next/link";
import SectionDivider from "@/components/ui/SectionDivider";

const footerLinks = [
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/noorbymahnoorpk/",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://web.facebook.com/profile.php?id=61591638716076",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer
      style={{
        background: "var(--color-bg-dark)",
        color: "var(--color-text-light)",
      }}
    >
      <div
        className="mx-auto px-6 lg:px-12 pt-16 pb-8"
        style={{ maxWidth: "var(--content-max-width)" }}
      >
        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start">
            <div className="flex flex-col items-center md:items-start mb-4">
              <span
                className="heading-display text-xl tracking-[0.25em]"
                style={{ color: "var(--color-text-light)" }}
              >
                NOOR
              </span>
              <span className="flex items-center gap-2 mt-1">
                <span className="block h-px w-4" style={{ background: "var(--color-gold-light)" }} />
                <span className="text-small-caps" style={{ fontSize: "0.55rem", letterSpacing: "0.25em", color: "var(--color-gold-light)" }}>
                  BY MAHNOOR
                </span>
                <span className="block h-px w-4" style={{ background: "var(--color-gold-light)" }} />
              </span>
            </div>
            <p
              className="text-sm text-center md:text-left mt-2 max-w-xs"
              style={{
                fontFamily: "var(--font-sans)",
                color: "rgba(246, 238, 226, 0.6)",
                lineHeight: 1.7,
              }}
            >
              Crafting fragrances that capture moments of light — from the golden glow of dusk to the delicate bloom of dawn.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center">
            <h3
              className="text-small-caps mb-6"
              style={{ color: "var(--color-gold-light)" }}
            >
              Explore
            </h3>
            <div className="flex flex-col items-center gap-3">
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm transition-colors duration-200 hover:opacity-100"
                  style={{
                    fontFamily: "var(--font-sans)",
                    color: "rgba(246, 238, 226, 0.6)",
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Social & Contact */}
          <div className="flex flex-col items-center md:items-end">
            <h3
              className="text-small-caps mb-6"
              style={{ color: "var(--color-gold-light)" }}
            >
              Follow Us
            </h3>
            <div className="flex items-center gap-4 mb-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 transition-all duration-200"
                  style={{ color: "rgba(246, 238, 226, 0.6)" }}
                  aria-label={social.label}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#C8A66B")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "rgba(246, 238, 226, 0.6)")
                  }
                >
                  {social.icon}
                </a>
              ))}
            </div>
            <p
              className="text-sm text-center md:text-right"
              style={{
                fontFamily: "var(--font-sans)",
                color: "rgba(246, 238, 226, 0.6)",
              }}
            >
              noorbymahnoor.pk@gmail.com
            </p>
          </div>
        </div>

        {/* Divider */}
        <div
          className="h-px w-full mb-6"
          style={{ background: "rgba(200, 166, 107, 0.15)" }}
        />

        {/* Copyright */}
        <p
          className="text-center text-xs"
          style={{
            fontFamily: "var(--font-sans)",
            color: "rgba(246, 238, 226, 0.35)",
            letterSpacing: "0.1em",
          }}
        >
          © {new Date().getFullYear()} Noor by Mahnoor. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
