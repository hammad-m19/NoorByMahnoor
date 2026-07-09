"use client";

import { useState } from "react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionDivider from "@/components/ui/SectionDivider";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Please enter your name";
    if (!formData.email.trim()) newErrors.email = "Please enter your email";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Please enter a valid email";
    if (!formData.message.trim()) newErrors.message = "Please enter a message";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const inputStyle = (field: string) => ({
    background: "transparent",
    border: `1px solid ${
      errors[field] ? "var(--color-accent-burgundy)" : "rgba(169, 121, 60, 0.25)"
    }`,
    color: "var(--color-text-primary)",
    fontFamily: "var(--font-sans)",
    outline: "none",
  });

  return (
    <div style={{ background: "var(--color-bg-primary)" }}>
      {/* Header */}
      <div className="pt-16 pb-12 px-6 lg:px-12 text-center">
        <ScrollReveal>
          <span
            className="text-small-caps block mb-4"
            style={{ color: "var(--color-gold)" }}
          >
            Get in Touch
          </span>
          <h1
            className="heading-serif text-4xl md:text-5xl lg:text-6xl mb-4"
            style={{ color: "var(--color-text-primary)" }}
          >
            Contact Us
          </h1>
          <SectionDivider />
          <p
            className="text-base mt-4 max-w-lg mx-auto"
            style={{
              color: "var(--color-text-secondary)",
              fontFamily: "var(--font-sans)",
            }}
          >
            We&apos;d love to hear from you. Whether you have a question about our
            fragrances, need help choosing a scent, or just want to say hello.
          </p>
        </ScrollReveal>
      </div>

      {/* Content */}
      <div className="px-6 lg:px-12 pb-20">
        <div
          className="mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20"
          style={{ maxWidth: "var(--content-max-width)" }}
        >
          {/* Form */}
          <ScrollReveal>
            <div>
              {submitted ? (
                <div
                  className="text-center py-16 px-6"
                  style={{
                    background: "var(--color-bg-secondary)",
                  }}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="mx-auto mb-4 animate-sparkle"
                    aria-hidden="true"
                  >
                    <path
                      d="M8 0L9.41 6.59L16 8L9.41 9.41L8 16L6.59 9.41L0 8L6.59 6.59L8 0Z"
                      fill="#C8A66B"
                    />
                  </svg>
                  <h3
                    className="heading-serif text-xl mb-2"
                    style={{ color: "var(--color-text-primary)" }}
                  >
                    Thank you for reaching out
                  </h3>
                  <p
                    className="text-sm"
                    style={{
                      color: "var(--color-text-secondary)",
                      fontFamily: "var(--font-sans)",
                    }}
                  >
                    We&apos;ll get back to you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="text-small-caps block mb-2"
                      style={{ color: "var(--color-text-primary)", fontSize: "0.65rem" }}
                    >
                      Name *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 text-sm"
                      style={inputStyle("name")}
                      placeholder="Your full name"
                    />
                    {errors.name && (
                      <p className="text-xs mt-1" style={{ color: "var(--color-accent-burgundy)" }}>
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="text-small-caps block mb-2"
                      style={{ color: "var(--color-text-primary)", fontSize: "0.65rem" }}
                    >
                      Email *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 text-sm"
                      style={inputStyle("email")}
                      placeholder="your@email.com"
                    />
                    {errors.email && (
                      <p className="text-xs mt-1" style={{ color: "var(--color-accent-burgundy)" }}>
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Subject */}
                  <div>
                    <label
                      htmlFor="contact-subject"
                      className="text-small-caps block mb-2"
                      style={{ color: "var(--color-text-primary)", fontSize: "0.65rem" }}
                    >
                      Subject
                    </label>
                    <select
                      id="contact-subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 text-sm cursor-pointer"
                      style={inputStyle("subject")}
                    >
                      <option value="">Select a topic</option>
                      <option value="general">General Inquiry</option>
                      <option value="order">Order Question</option>
                      <option value="fragrance">Fragrance Consultation</option>
                      <option value="wholesale">Wholesale & Stockist</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="contact-message"
                      className="text-small-caps block mb-2"
                      style={{ color: "var(--color-text-primary)", fontSize: "0.65rem" }}
                    >
                      Message *
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className="w-full px-4 py-3 text-sm resize-none"
                      style={inputStyle("message")}
                      placeholder="Tell us how we can help..."
                    />
                    {errors.message && (
                      <p className="text-xs mt-1" style={{ color: "var(--color-accent-burgundy)" }}>
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <button type="submit" className="btn-primary w-full sm:w-auto">
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </ScrollReveal>

          {/* Contact Info */}
          <ScrollReveal delay={0.15}>
            <div className="lg:pt-4">
              {/* Info Cards */}
              <div className="space-y-8">
                <div>
                  <h3
                    className="text-small-caps mb-2"
                    style={{ color: "var(--color-gold)" }}
                  >
                    Email
                  </h3>
                  <a
                    href="mailto:noorbymahnoor.pk@gmail.com"
                    className="text-base transition-opacity hover:opacity-70"
                    style={{
                      color: "var(--color-text-primary)",
                      fontFamily: "var(--font-sans)",
                    }}
                  >
                    noorbymahnoor.pk@gmail.com
                  </a>
                </div>

                <div>
                  <h3
                    className="text-small-caps mb-2"
                    style={{ color: "var(--color-gold)" }}
                  >
                    Follow Us
                  </h3>
                  <div className="flex flex-col gap-2">
                    {[
                      { name: "Instagram", url: "https://www.instagram.com/noorbymahnoorpk/" },
                      { name: "Facebook", url: "https://web.facebook.com/profile.php?id=61591638716076" }
                    ].map((platform) => (
                      <a
                        key={platform.name}
                        href={platform.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-base transition-opacity hover:opacity-70 flex items-center gap-2"
                        style={{
                          color: "var(--color-text-primary)",
                          fontFamily: "var(--font-sans)",
                        }}
                      >
                        <span className="w-1 h-1 rounded-full" style={{ background: "var(--color-gold)" }} />
                        {platform.name}
                      </a>
                    ))}
                  </div>
                </div>

                <div>
                  <h3
                    className="text-small-caps mb-2"
                    style={{ color: "var(--color-gold)" }}
                  >
                    Location
                  </h3>
                  <p
                    className="text-base"
                    style={{
                      color: "var(--color-text-secondary)",
                      fontFamily: "var(--font-sans)",
                      lineHeight: 1.7,
                    }}
                  >
                    Lahore, Pakistan
                    <br />
                    <span className="text-sm italic">
                      Online boutique — shipping nationwide
                    </span>
                  </p>
                </div>

                <div>
                  <h3
                    className="text-small-caps mb-2"
                    style={{ color: "var(--color-gold)" }}
                  >
                    Response Time
                  </h3>
                  <p
                    className="text-sm"
                    style={{
                      color: "var(--color-text-secondary)",
                      fontFamily: "var(--font-sans)",
                    }}
                  >
                    We typically respond within 24–48 hours during business days.
                  </p>
                </div>
              </div>

              {/* Decorative element */}
              <div className="mt-12 opacity-20" aria-hidden="true">
                <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
                  <path
                    d="M60 10C75 10 85 20 85 35C85 50 75 60 60 60C70 60 80 52 80 35C80 18 70 10 60 10Z"
                    stroke="#A9793C"
                    strokeWidth="0.8"
                  />
                  <path
                    d="M60 0L61 5L66 6L61 7L60 12L59 7L54 6L59 5L60 0Z"
                    fill="#A9793C"
                  />
                </svg>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}
