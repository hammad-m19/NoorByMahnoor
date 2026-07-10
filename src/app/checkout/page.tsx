"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { useOrders, ShippingInfo, PaymentMethod } from "@/context/OrderContext";
import { formatPrice, getShippingCost } from "@/lib/utils";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionDivider from "@/components/ui/SectionDivider";

const PROVINCES = [
  "Punjab",
  "Sindh",
  "Khyber Pakhtunkhwa",
  "Balochistan",
  "Islamabad Capital Territory",
  "Azad Jammu & Kashmir",
  "Gilgit-Baltistan",
];

const PAYMENT_METHODS: {
  value: PaymentMethod;
  label: string;
  description: string;
  icon: React.ReactNode;
}[] = [
    {
      value: "cod",
      label: "Cash on Delivery",
      description: "Pay when your order arrives at your doorstep",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
          <line x1="1" y1="10" x2="23" y2="10" />
        </svg>
      ),
    },
    {
      value: "bank_transfer",
      label: "Bank Transfer",
      description: "Transfer to our bank account and upload receipt",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 14v3M12 14v3M16 14v3" />
        </svg>
      ),
    },
    {
      value: "jazzcash_easypaisa",
      label: "JazzCash / EasyPaisa",
      description: "Send payment via mobile wallet",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
          <line x1="12" y1="18" x2="12.01" y2="18" />
        </svg>
      ),
    },
  ];

// --- Step components ---

function StepIndicator({ currentStep }: { currentStep: number }) {
  const steps = ["Delivery", "Payment", "Review"];
  return (
    <div className="flex items-center justify-center gap-2 mb-10">
      {steps.map((label, i) => {
        const stepNum = i + 1;
        const isActive = stepNum === currentStep;
        const isCompleted = stepNum < currentStep;
        return (
          <div key={label} className="flex items-center gap-2">
            <div className="flex flex-col items-center gap-1">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all duration-300"
                style={{
                  background: isActive
                    ? "var(--color-gold)"
                    : isCompleted
                      ? "var(--color-gold-deep)"
                      : "transparent",
                  border: `1.5px solid ${isActive || isCompleted
                    ? "var(--color-gold)"
                    : "rgba(169, 121, 60, 0.3)"
                    }`,
                  color:
                    isActive || isCompleted
                      ? "var(--color-text-light)"
                      : "var(--color-text-secondary)",
                  fontFamily: "var(--font-sans)",
                }}
              >
                {isCompleted ? (
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : (
                  stepNum
                )}
              </div>
              <span
                className="text-xs hidden sm:block"
                style={{
                  fontFamily: "var(--font-sans)",
                  color: isActive
                    ? "var(--color-gold)"
                    : "var(--color-text-secondary)",
                  fontWeight: isActive ? 500 : 400,
                  letterSpacing: "0.05em",
                }}
              >
                {label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                className="w-12 sm:w-20 h-px mb-5 sm:mb-4"
                style={{
                  background:
                    stepNum < currentStep
                      ? "var(--color-gold)"
                      : "rgba(169, 121, 60, 0.2)",
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

function ShippingForm({
  data,
  errors,
  onChange,
  onSubmit,
}: {
  data: ShippingInfo;
  errors: Record<string, string>;
  onChange: (field: keyof ShippingInfo, value: string) => void;
  onSubmit: () => void;
}) {
  const inputStyle = (field: string) => ({
    background: "transparent",
    border: `1px solid ${errors[field] ? "var(--color-accent-burgundy)" : "rgba(169, 121, 60, 0.25)"
      }`,
    color: "var(--color-text-primary)",
    fontFamily: "var(--font-sans)",
    outline: "none",
    transition: "border-color 0.3s ease",
  });

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <h2
        className="heading-serif text-2xl mb-6"
        style={{ color: "var(--color-text-primary)" }}
      >
        Delivery Information
      </h2>
      <div className="space-y-4">
        {/* Full Name */}
        <div>
          <label
            htmlFor="checkout-name"
            className="text-small-caps block mb-2"
            style={{ color: "var(--color-text-primary)", fontSize: "0.65rem" }}
          >
            Full Name *
          </label>
          <input
            id="checkout-name"
            type="text"
            value={data.fullName}
            onChange={(e) => onChange("fullName", e.target.value)}
            className="w-full px-4 py-3 text-sm"
            style={inputStyle("fullName")}
            placeholder="Your full name"
          />
          {errors.fullName && (
            <p className="text-xs mt-1" style={{ color: "var(--color-accent-burgundy)" }}>
              {errors.fullName}
            </p>
          )}
        </div>

        {/* Phone & Email Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="checkout-phone"
              className="text-small-caps block mb-2"
              style={{ color: "var(--color-text-primary)", fontSize: "0.65rem" }}
            >
              Phone Number *
            </label>
            <input
              id="checkout-phone"
              type="tel"
              value={data.phone}
              onChange={(e) => onChange("phone", e.target.value)}
              className="w-full px-4 py-3 text-sm"
              style={inputStyle("phone")}
              placeholder="0333 4234282"
            />
            {errors.phone && (
              <p className="text-xs mt-1" style={{ color: "var(--color-accent-burgundy)" }}>
                {errors.phone}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="checkout-email"
              className="text-small-caps block mb-2"
              style={{ color: "var(--color-text-primary)", fontSize: "0.65rem" }}
            >
              Email *
            </label>
            <input
              id="checkout-email"
              type="email"
              value={data.email}
              onChange={(e) => onChange("email", e.target.value)}
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
        </div>

        {/* Address */}
        <div>
          <label
            htmlFor="checkout-address"
            className="text-small-caps block mb-2"
            style={{ color: "var(--color-text-primary)", fontSize: "0.65rem" }}
          >
            Full Address *
          </label>
          <textarea
            id="checkout-address"
            value={data.address}
            onChange={(e) => onChange("address", e.target.value)}
            rows={2}
            className="w-full px-4 py-3 text-sm resize-none"
            style={inputStyle("address")}
            placeholder="House/Flat No., Street, Area"
          />
          {errors.address && (
            <p className="text-xs mt-1" style={{ color: "var(--color-accent-burgundy)" }}>
              {errors.address}
            </p>
          )}
        </div>

        {/* City, Province, Postal */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label
              htmlFor="checkout-city"
              className="text-small-caps block mb-2"
              style={{ color: "var(--color-text-primary)", fontSize: "0.65rem" }}
            >
              City *
            </label>
            <input
              id="checkout-city"
              type="text"
              value={data.city}
              onChange={(e) => onChange("city", e.target.value)}
              className="w-full px-4 py-3 text-sm"
              style={inputStyle("city")}
              placeholder="Lahore"
            />
            {errors.city && (
              <p className="text-xs mt-1" style={{ color: "var(--color-accent-burgundy)" }}>
                {errors.city}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="checkout-province"
              className="text-small-caps block mb-2"
              style={{ color: "var(--color-text-primary)", fontSize: "0.65rem" }}
            >
              Province *
            </label>
            <select
              id="checkout-province"
              value={data.province}
              onChange={(e) => onChange("province", e.target.value)}
              className="w-full px-4 py-3 text-sm cursor-pointer"
              style={inputStyle("province")}
            >
              <option value="">Select</option>
              {PROVINCES.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
            {errors.province && (
              <p className="text-xs mt-1" style={{ color: "var(--color-accent-burgundy)" }}>
                {errors.province}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="checkout-postal"
              className="text-small-caps block mb-2"
              style={{ color: "var(--color-text-primary)", fontSize: "0.65rem" }}
            >
              Postal Code
            </label>
            <input
              id="checkout-postal"
              type="text"
              value={data.postalCode}
              onChange={(e) => onChange("postalCode", e.target.value)}
              className="w-full px-4 py-3 text-sm"
              style={inputStyle("postalCode")}
              placeholder="Optional"
            />
          </div>
        </div>

        {/* Notes */}
        <div>
          <label
            htmlFor="checkout-notes"
            className="text-small-caps block mb-2"
            style={{ color: "var(--color-text-primary)", fontSize: "0.65rem" }}
          >
            Order Notes
          </label>
          <textarea
            id="checkout-notes"
            value={data.notes}
            onChange={(e) => onChange("notes", e.target.value)}
            rows={2}
            className="w-full px-4 py-3 text-sm resize-none"
            style={inputStyle("notes")}
            placeholder="Any special instructions (optional)"
          />
        </div>

        <div className="pt-4">
          <motion.button
            type="button"
            className="btn-primary w-full sm:w-auto"
            whileTap={{ scale: 0.97 }}
            onClick={onSubmit}
          >
            Continue to Payment
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

function PaymentStep({
  selected,
  onSelect,
  screenshot,
  onScreenshot,
  onBack,
  onSubmit,
}: {
  selected: PaymentMethod | null;
  onSelect: (method: PaymentMethod) => void;
  screenshot: string | null;
  onScreenshot: (data: string | null) => void;
  onBack: () => void;
  onSubmit: () => void;
}) {
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      alert("File size must be less than 5MB");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      onScreenshot(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <h2
        className="heading-serif text-2xl mb-6"
        style={{ color: "var(--color-text-primary)" }}
      >
        Payment Method
      </h2>

      <div className="space-y-3 mb-6">
        {PAYMENT_METHODS.map((method) => (
          <div key={method.value} className="space-y-3">
            <button
              onClick={() => onSelect(method.value)}
              className="w-full text-left p-4 transition-all duration-300"
              style={{
                background:
                  selected === method.value
                    ? "rgba(169, 121, 60, 0.08)"
                    : "transparent",
                border: `1.5px solid ${selected === method.value
                  ? "var(--color-gold)"
                  : "rgba(169, 121, 60, 0.2)"
                  }`,
              }}
            >
              <div className="flex items-center gap-3">
                {/* Radio indicator */}
                <div
                  className="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center transition-all duration-300"
                  style={{
                    border: `2px solid ${selected === method.value
                      ? "var(--color-gold)"
                      : "rgba(169, 121, 60, 0.3)"
                      }`,
                  }}
                >
                  {selected === method.value && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ background: "var(--color-gold)" }}
                    />
                  )}
                </div>
                <span
                  style={{ color: "var(--color-gold)" }}
                  className="flex-shrink-0"
                >
                  {method.icon}
                </span>
                <div>
                  <span
                    className="text-sm font-medium block"
                    style={{
                      fontFamily: "var(--font-sans)",
                      color: "var(--color-text-primary)",
                    }}
                  >
                    {method.label}
                  </span>
                  <span
                    className="text-xs"
                    style={{
                      fontFamily: "var(--font-sans)",
                      color: "var(--color-text-secondary)",
                    }}
                  >
                    {method.description}
                  </span>
                </div>
              </div>
            </button>

            {/* Inline Payment Details Panel */}
            <AnimatePresence mode="wait">
              {selected === method.value && method.value === "bank_transfer" && (
                <motion.div
                  key="bank"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div
                    className="p-5 mb-2"
                    style={{
                      background: "rgba(169, 121, 60, 0.06)",
                      border: "1px solid rgba(169, 121, 60, 0.15)",
                    }}
                  >
                    <h4
                      className="text-small-caps mb-4"
                      style={{ color: "var(--color-gold)" }}
                    >
                      Bank Account Details
                    </h4>
                    <div className="space-y-2">
                      {[
                        { label: "Bank Name", value: "Your Bank Name" },
                        { label: "Account Title", value: "Noor by Mahnoor" },
                        { label: "Account / IBAN", value: "PK00XXXX0000000000000000" },
                      ].map((item) => (
                        <div
                          key={item.label}
                          className="flex justify-between text-sm"
                          style={{ fontFamily: "var(--font-sans)" }}
                        >
                          <span style={{ color: "var(--color-text-secondary)" }}>
                            {item.label}
                          </span>
                          <span
                            className="font-medium"
                            style={{ color: "var(--color-text-primary)" }}
                          >
                            {item.value}
                          </span>
                        </div>
                      ))}
                    </div>
                    <p
                      className="text-xs mt-4 italic"
                      style={{
                        color: "var(--color-text-secondary)",
                        fontFamily: "var(--font-sans)",
                      }}
                    >
                      Please transfer the exact amount and upload the screenshot below.
                    </p>

                    {/* Screenshot Upload */}
                    <div className="mt-4">
                      <label
                        className="text-small-caps block mb-2"
                        style={{
                          color: "var(--color-text-primary)",
                          fontSize: "0.65rem",
                        }}
                      >
                        Upload Payment Screenshot
                      </label>
                      <div
                        className="relative p-4 text-center cursor-pointer transition-all duration-300 hover:border-opacity-60"
                        style={{
                          border: "1.5px dashed rgba(169, 121, 60, 0.3)",
                          background: "rgba(169, 121, 60, 0.03)",
                        }}
                      >
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileUpload}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        {screenshot ? (
                          <div className="flex items-center justify-center gap-2">
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              style={{ color: "var(--color-accent-forest)" }}
                            >
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                            <span
                              className="text-sm"
                              style={{
                                color: "var(--color-accent-forest)",
                                fontFamily: "var(--font-sans)",
                              }}
                            >
                              Screenshot uploaded
                            </span>
                          </div>
                        ) : (
                          <div>
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              className="mx-auto mb-2"
                              style={{ color: "var(--color-text-secondary)" }}
                            >
                              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                              <polyline points="17 8 12 3 7 8" />
                              <line x1="12" y1="3" x2="12" y2="15" />
                            </svg>
                            <span
                              className="text-xs"
                              style={{
                                color: "var(--color-text-secondary)",
                                fontFamily: "var(--font-sans)",
                              }}
                            >
                              Click or drag to upload (max 5MB)
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {selected === method.value && method.value === "jazzcash_easypaisa" && (
                <motion.div
                  key="mobile"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div
                    className="p-5 mb-2"
                    style={{
                      background: "rgba(169, 121, 60, 0.06)",
                      border: "1px solid rgba(169, 121, 60, 0.15)",
                    }}
                  >
                    <h4
                      className="text-small-caps mb-4"
                      style={{ color: "var(--color-gold)" }}
                    >
                      Mobile Wallet Details
                    </h4>
                    <div className="space-y-2">
                      {[
                        { label: "Account Name", value: "Noor by Mahnoor" },
                        { label: "JazzCash / EasyPaisa", value: "0333 4234282" },
                      ].map((item) => (
                        <div
                          key={item.label}
                          className="flex justify-between text-sm"
                          style={{ fontFamily: "var(--font-sans)" }}
                        >
                          <span style={{ color: "var(--color-text-secondary)" }}>
                            {item.label}
                          </span>
                          <span
                            className="font-medium"
                            style={{ color: "var(--color-text-primary)" }}
                          >
                            {item.value}
                          </span>
                        </div>
                      ))}
                    </div>
                    <p
                      className="text-xs mt-4 italic"
                      style={{
                        color: "var(--color-text-secondary)",
                        fontFamily: "var(--font-sans)",
                      }}
                    >
                      Send the exact amount and upload the screenshot below.
                    </p>

                    {/* Screenshot Upload */}
                    <div className="mt-4">
                      <label
                        className="text-small-caps block mb-2"
                        style={{
                          color: "var(--color-text-primary)",
                          fontSize: "0.65rem",
                        }}
                      >
                        Upload Payment Screenshot
                      </label>
                      <div
                        className="relative p-4 text-center cursor-pointer transition-all duration-300"
                        style={{
                          border: "1.5px dashed rgba(169, 121, 60, 0.3)",
                          background: "rgba(169, 121, 60, 0.03)",
                        }}
                      >
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileUpload}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        {screenshot ? (
                          <div className="flex items-center justify-center gap-2">
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              style={{ color: "var(--color-accent-forest)" }}
                            >
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                            <span
                              className="text-sm"
                              style={{
                                color: "var(--color-accent-forest)",
                                fontFamily: "var(--font-sans)",
                              }}
                            >
                              Screenshot uploaded
                            </span>
                          </div>
                        ) : (
                          <div>
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              className="mx-auto mb-2"
                              style={{ color: "var(--color-text-secondary)" }}
                            >
                              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                              <polyline points="17 8 12 3 7 8" />
                              <line x1="12" y1="3" x2="12" y2="15" />
                            </svg>
                            <span
                              className="text-xs"
                              style={{
                                color: "var(--color-text-secondary)",
                                fontFamily: "var(--font-sans)",
                              }}
                            >
                              Click or drag to upload (max 5MB)
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {selected === method.value && method.value === "cod" && (
                <motion.div
                  key="cod"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div
                    className="p-5 mb-2"
                    style={{
                      background: "rgba(169, 121, 60, 0.06)",
                      border: "1px solid rgba(169, 121, 60, 0.15)",
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        className="mt-0.5 flex-shrink-0"
                        style={{ color: "var(--color-gold)" }}
                      >
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="16" x2="12" y2="12" />
                        <line x1="12" y1="8" x2="12.01" y2="8" />
                      </svg>
                      <p
                        className="text-sm"
                        style={{
                          color: "var(--color-text-secondary)",
                          fontFamily: "var(--font-sans)",
                          lineHeight: 1.6,
                        }}
                      >
                        Pay in cash when your order is delivered. Please keep the exact
                        amount ready for the delivery rider.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* Navigation */}
      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <button
          type="button"
          onClick={onBack}
          className="btn-outline order-2 sm:order-1"
        >
          ← Back
        </button>
        <motion.button
          type="button"
          className="btn-primary order-1 sm:order-2"
          whileTap={{ scale: 0.97 }}
          onClick={onSubmit}
          style={{
            opacity: selected ? 1 : 0.5,
            pointerEvents: selected ? "auto" : "none",
          }}
        >
          Review Order
        </motion.button>
      </div>
    </motion.div>
  );
}

function ReviewStep({
  items,
  shipping,
  paymentMethod,
  subtotal,
  shippingCost,
  isPlacing,
  onBack,
  onPlaceOrder,
}: {
  items: { product: { id: string; name: string; price: number; images: string[]; size: string; slug: string }; quantity: number }[];
  shipping: ShippingInfo;
  paymentMethod: PaymentMethod;
  subtotal: number;
  shippingCost: number;
  isPlacing: boolean;
  onBack: () => void;
  onPlaceOrder: () => void;
}) {
  const paymentLabels: Record<PaymentMethod, string> = {
    cod: "Cash on Delivery",
    bank_transfer: "Bank Transfer",
    jazzcash_easypaisa: "JazzCash / EasyPaisa",
  };

  const total = subtotal + shippingCost;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <h2
        className="heading-serif text-2xl mb-6"
        style={{ color: "var(--color-text-primary)" }}
      >
        Review Your Order
      </h2>

      {/* Items */}
      <div
        className="p-5 mb-4"
        style={{ background: "var(--color-bg-secondary)" }}
      >
        <h4
          className="text-small-caps mb-4"
          style={{ color: "var(--color-gold)", fontSize: "0.65rem" }}
        >
          Order Items
        </h4>
        <div className="space-y-3">
          {items.map((item) => (
            <div
              key={item.product.id}
              className="flex items-center gap-3"
            >
              <div
                className="relative w-12 h-14 flex-shrink-0 overflow-hidden"
                style={{ background: "var(--color-bg-primary)" }}
              >
                <Image
                  src={item.product.images[0]}
                  alt={item.product.name}
                  fill
                  className="object-cover"
                  sizes="48px"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p
                  className="text-sm truncate"
                  style={{
                    fontFamily: "var(--font-serif)",
                    color: "var(--color-text-primary)",
                  }}
                >
                  {item.product.name}
                </p>
                <p
                  className="text-xs"
                  style={{
                    fontFamily: "var(--font-sans)",
                    color: "var(--color-text-secondary)",
                  }}
                >
                  {item.product.size} × {item.quantity}
                </p>
              </div>
              <span
                className="text-sm font-medium"
                style={{
                  fontFamily: "var(--font-sans)",
                  color: "var(--color-text-primary)",
                }}
              >
                {formatPrice(item.product.price * item.quantity)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Shipping Details */}
      <div
        className="p-5 mb-4"
        style={{ background: "var(--color-bg-secondary)" }}
      >
        <h4
          className="text-small-caps mb-3"
          style={{ color: "var(--color-gold)", fontSize: "0.65rem" }}
        >
          Delivery To
        </h4>
        <div
          className="text-sm space-y-1"
          style={{
            fontFamily: "var(--font-sans)",
            color: "var(--color-text-primary)",
          }}
        >
          <p className="font-medium">{shipping.fullName}</p>
          <p style={{ color: "var(--color-text-secondary)" }}>
            {shipping.address}
          </p>
          <p style={{ color: "var(--color-text-secondary)" }}>
            {shipping.city}, {shipping.province}
            {shipping.postalCode ? ` - ${shipping.postalCode}` : ""}
          </p>
          <p style={{ color: "var(--color-text-secondary)" }}>
            {shipping.phone}
          </p>
          <p style={{ color: "var(--color-text-secondary)" }}>
            {shipping.email}
          </p>
        </div>
      </div>

      {/* Payment & Total */}
      <div
        className="p-5 mb-6"
        style={{ background: "var(--color-bg-secondary)" }}
      >
        <h4
          className="text-small-caps mb-3"
          style={{ color: "var(--color-gold)", fontSize: "0.65rem" }}
        >
          Payment & Total
        </h4>
        <div
          className="space-y-2 text-sm"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          <div className="flex justify-between">
            <span style={{ color: "var(--color-text-secondary)" }}>
              Payment Method
            </span>
            <span style={{ color: "var(--color-text-primary)" }}>
              {paymentLabels[paymentMethod]}
            </span>
          </div>
          <div className="flex justify-between">
            <span style={{ color: "var(--color-text-secondary)" }}>
              Subtotal
            </span>
            <span style={{ color: "var(--color-text-primary)" }}>
              {formatPrice(subtotal)}
            </span>
          </div>
          <div className="flex justify-between">
            <span style={{ color: "var(--color-text-secondary)" }}>
              Delivery
            </span>
            <span
              style={{
                color:
                  shippingCost === 0
                    ? "var(--color-accent-forest)"
                    : "var(--color-text-primary)",
              }}
            >
              {shippingCost === 0 ? "FREE" : formatPrice(shippingCost)}
            </span>
          </div>
          <div
            className="flex justify-between pt-3 mt-3"
            style={{ borderTop: "1px solid rgba(169, 121, 60, 0.15)" }}
          >
            <span
              className="text-small-caps"
              style={{ color: "var(--color-text-primary)" }}
            >
              Total
            </span>
            <span className="heading-serif text-xl gold-text">
              {formatPrice(total)}
            </span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          type="button"
          onClick={onBack}
          className="btn-outline order-2 sm:order-1"
          disabled={isPlacing}
        >
          ← Back
        </button>
        <motion.button
          type="button"
          className="btn-primary order-1 sm:order-2 flex-1 sm:flex-initial"
          whileTap={{ scale: 0.97 }}
          onClick={onPlaceOrder}
          disabled={isPlacing}
          style={{ opacity: isPlacing ? 0.7 : 1 }}
        >
          {isPlacing ? (
            <span className="flex items-center justify-center gap-2">
              <svg
                className="animate-spin"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M21 12a9 9 0 11-6.219-8.56" />
              </svg>
              Placing Order...
            </span>
          ) : (
            "Place Order"
          )}
        </motion.button>
      </div>
    </motion.div>
  );
}

function OrderConfirmation({
  orderId,
  total,
  paymentMethod,
}: {
  orderId: string;
  total: number;
  paymentMethod: PaymentMethod;
}) {
  const paymentLabels: Record<PaymentMethod, string> = {
    cod: "Cash on Delivery",
    bank_transfer: "Bank Transfer",
    jazzcash_easypaisa: "JazzCash / EasyPaisa",
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="text-center max-w-lg mx-auto"
    >
      {/* Success sparkle */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.6, delay: 0.2, type: "spring" }}
        className="mb-6"
      >
        <svg
          width="48"
          height="48"
          viewBox="0 0 16 16"
          fill="none"
          className="mx-auto animate-sparkle"
          aria-hidden="true"
        >
          <path
            d="M8 0L9.41 6.59L16 8L9.41 9.41L8 16L6.59 9.41L0 8L6.59 6.59L8 0Z"
            fill="#C8A66B"
          />
        </svg>
      </motion.div>

      <h2
        className="heading-serif text-3xl mb-3"
        style={{ color: "var(--color-text-primary)" }}
      >
        Order Confirmed!
      </h2>
      <p
        className="text-sm mb-8"
        style={{
          color: "var(--color-text-secondary)",
          fontFamily: "var(--font-sans)",
        }}
      >
        Thank you for your purchase. Your order has been placed successfully.
      </p>

      {/* Order Details Card */}
      <div
        className="p-6 mb-8 text-left"
        style={{ background: "var(--color-bg-secondary)" }}
      >
        <div className="space-y-3">
          <div className="flex justify-between text-sm" style={{ fontFamily: "var(--font-sans)" }}>
            <span style={{ color: "var(--color-text-secondary)" }}>
              Order Number
            </span>
            <span
              className="font-semibold"
              style={{ color: "var(--color-gold)", letterSpacing: "0.05em" }}
            >
              {orderId}
            </span>
          </div>
          <div className="flex justify-between text-sm" style={{ fontFamily: "var(--font-sans)" }}>
            <span style={{ color: "var(--color-text-secondary)" }}>
              Payment
            </span>
            <span style={{ color: "var(--color-text-primary)" }}>
              {paymentLabels[paymentMethod]}
            </span>
          </div>
          <div
            className="flex justify-between pt-3"
            style={{ borderTop: "1px solid rgba(169, 121, 60, 0.15)" }}
          >
            <span
              className="text-small-caps"
              style={{ color: "var(--color-text-primary)" }}
            >
              Total
            </span>
            <span className="heading-serif text-xl gold-text">
              {formatPrice(total)}
            </span>
          </div>
        </div>
      </div>

      {/* Info messages */}
      <div
        className="p-4 mb-8 text-left"
        style={{
          background: "rgba(169, 121, 60, 0.06)",
          border: "1px solid rgba(169, 121, 60, 0.15)",
        }}
      >
        <div className="flex items-start gap-3">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="flex-shrink-0 mt-0.5"
            style={{ color: "var(--color-gold)" }}
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
          <div>
            <p
              className="text-sm mb-1"
              style={{
                fontFamily: "var(--font-sans)",
                color: "var(--color-text-primary)",
              }}
            >
              {paymentMethod === "cod"
                ? "Please keep the exact amount ready for the delivery rider."
                : "We will verify your payment and process your order shortly."}
            </p>
            <p
              className="text-xs"
              style={{
                fontFamily: "var(--font-sans)",
                color: "var(--color-text-secondary)",
              }}
            >
              A confirmation email has been sent to the owner. For any queries, contact us at{" "}
              <a
                href="mailto:noorbymahnoor.pk@gmail.com"
                className="underline"
                style={{ color: "var(--color-gold)" }}
              >
                noorbymahnoor.pk@gmail.com
              </a>
            </p>
          </div>
        </div>
      </div>

      <Link href="/shop" className="btn-primary">
        Continue Shopping
      </Link>
    </motion.div>
  );
}

// --- Main Checkout Page ---

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clearCart } = useCart();
  const { placeOrder } = useOrders();

  const [step, setStep] = useState(1);
  const [isPlacing, setIsPlacing] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<{
    id: string;
    total: number;
    paymentMethod: PaymentMethod;
  } | null>(null);

  // Shipping
  const [shipping, setShipping] = useState<ShippingInfo>({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    province: "",
    postalCode: "",
    notes: "",
  });
  const [shippingErrors, setShippingErrors] = useState<Record<string, string>>({});

  // Payment
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(null);
  const [screenshot, setScreenshot] = useState<string | null>(null);

  const shippingCost = getShippingCost(subtotal);

  // Redirect if cart is empty and not on confirmation
  useEffect(() => {
    if (items.length === 0 && !completedOrder) {
      router.push("/cart");
    }
  }, [items.length, completedOrder, router]);

  const handleShippingChange = (field: keyof ShippingInfo, value: string) => {
    setShipping((prev) => ({ ...prev, [field]: value }));
    if (shippingErrors[field]) {
      setShippingErrors((prev) => {
        const updated = { ...prev };
        delete updated[field];
        return updated;
      });
    }
  };

  const validateShipping = (): boolean => {
    const errors: Record<string, string> = {};
    if (!shipping.fullName.trim()) errors.fullName = "Name is required";
    if (!shipping.phone.trim()) errors.phone = "Phone is required";
    else if (!/^0[3]\d{2}[-\s]?\d{7}$/.test(shipping.phone.replace(/\s/g, "")))
      errors.phone = "Enter a valid Pakistan mobile number";
    if (!shipping.email.trim()) errors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(shipping.email))
      errors.email = "Enter a valid email";
    if (!shipping.address.trim()) errors.address = "Address is required";
    if (!shipping.city.trim()) errors.city = "City is required";
    if (!shipping.province) errors.province = "Province is required";
    setShippingErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleShippingSubmit = () => {
    if (validateShipping()) {
      setStep(2);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePaymentSubmit = () => {
    if (!paymentMethod) return;
    setStep(3);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePlaceOrder = async () => {
    if (!paymentMethod) return;
    setIsPlacing(true);

    try {
      const order = await placeOrder(
        items,
        shipping,
        paymentMethod,
        subtotal,
        shippingCost,
        screenshot || undefined
      );

      setCompletedOrder({
        id: order.id,
        total: order.total,
        paymentMethod: order.paymentMethod,
      });
      clearCart();
      setStep(4);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      console.error("Failed to place order:", error);
      alert("Something went wrong. Your order could not be placed. Please try again.");
    } finally {
      setIsPlacing(false);
    }
  };

  // Don't render if empty and no completed order
  if (items.length === 0 && !completedOrder) {
    return null;
  }

  return (
    <div style={{ background: "var(--color-bg-primary)", minHeight: "60vh" }}>
      {/* Header */}
      <div className="pt-16 pb-8 px-6 lg:px-12 text-center">
        <ScrollReveal>
          <span
            className="text-small-caps block mb-4"
            style={{ color: "var(--color-gold)" }}
          >
            {step === 4 ? "Thank You" : "Checkout"}
          </span>
          <h1
            className="heading-serif text-4xl md:text-5xl mb-4"
            style={{ color: "var(--color-text-primary)" }}
          >
            {step === 4 ? "Order Placed" : "Complete Your Order"}
          </h1>
          <SectionDivider />
        </ScrollReveal>
      </div>

      <div className="px-6 lg:px-12 pb-20">
        <div
          className="mx-auto"
          style={{ maxWidth: step === 4 ? "600px" : "var(--content-max-width)" }}
        >
          {step < 4 && <StepIndicator currentStep={step} />}

          {step === 4 && completedOrder ? (
            <ScrollReveal>
              <OrderConfirmation
                orderId={completedOrder.id}
                total={completedOrder.total}
                paymentMethod={completedOrder.paymentMethod}
              />
            </ScrollReveal>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
              {/* Main form area */}
              <div className="lg:col-span-2">
                <ScrollReveal>
                  <AnimatePresence mode="wait">
                    {step === 1 && (
                      <ShippingForm
                        key="shipping"
                        data={shipping}
                        errors={shippingErrors}
                        onChange={handleShippingChange}
                        onSubmit={handleShippingSubmit}
                      />
                    )}
                    {step === 2 && (
                      <PaymentStep
                        key="payment"
                        selected={paymentMethod}
                        onSelect={setPaymentMethod}
                        screenshot={screenshot}
                        onScreenshot={setScreenshot}
                        onBack={() => {
                          setStep(1);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        onSubmit={handlePaymentSubmit}
                      />
                    )}
                    {step === 3 && (
                      <ReviewStep
                        key="review"
                        items={items}
                        shipping={shipping}
                        paymentMethod={paymentMethod!}
                        subtotal={subtotal}
                        shippingCost={shippingCost}
                        isPlacing={isPlacing}
                        onBack={() => {
                          setStep(2);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        onPlaceOrder={handlePlaceOrder}
                      />
                    )}
                  </AnimatePresence>
                </ScrollReveal>
              </div>

              {/* Sidebar — Order Summary */}
              <div className="lg:col-span-1">
                <ScrollReveal delay={0.15}>
                  <div
                    className="p-6 sticky top-24"
                    style={{ background: "var(--color-bg-secondary)" }}
                  >
                    <h3
                      className="text-small-caps mb-6"
                      style={{ color: "var(--color-text-primary)" }}
                    >
                      Order Summary
                    </h3>

                    {/* Items list */}
                    <div
                      className="space-y-3 pb-4 mb-4"
                      style={{
                        borderBottom: "1px solid rgba(169, 121, 60, 0.15)",
                      }}
                    >
                      {items.map((item) => (
                        <div
                          key={item.product.id}
                          className="flex justify-between text-sm"
                          style={{ fontFamily: "var(--font-sans)" }}
                        >
                          <span
                            className="truncate mr-2"
                            style={{ color: "var(--color-text-secondary)" }}
                          >
                            {item.product.name} × {item.quantity}
                          </span>
                          <span
                            className="flex-shrink-0"
                            style={{ color: "var(--color-text-primary)" }}
                          >
                            {formatPrice(item.product.price * item.quantity)}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Totals */}
                    <div className="space-y-2">
                      <div
                        className="flex justify-between text-sm"
                        style={{ fontFamily: "var(--font-sans)" }}
                      >
                        <span style={{ color: "var(--color-text-secondary)" }}>
                          Subtotal
                        </span>
                        <span style={{ color: "var(--color-text-primary)" }}>
                          {formatPrice(subtotal)}
                        </span>
                      </div>
                      <div
                        className="flex justify-between text-sm"
                        style={{ fontFamily: "var(--font-sans)" }}
                      >
                        <span style={{ color: "var(--color-text-secondary)" }}>
                          Delivery
                        </span>
                        <span
                          style={{
                            color:
                              shippingCost === 0
                                ? "var(--color-accent-forest)"
                                : "var(--color-text-primary)",
                            fontWeight: shippingCost === 0 ? 500 : 400,
                          }}
                        >
                          {shippingCost === 0
                            ? "FREE"
                            : formatPrice(shippingCost)}
                        </span>
                      </div>
                    </div>

                    <div
                      className="flex justify-between pt-4 mt-4"
                      style={{
                        borderTop: "1px solid rgba(169, 121, 60, 0.2)",
                      }}
                    >
                      <span
                        className="text-small-caps"
                        style={{ color: "var(--color-text-primary)" }}
                      >
                        Total
                      </span>
                      <span className="heading-serif text-xl gold-text">
                        {formatPrice(subtotal + shippingCost)}
                      </span>
                    </div>

                    {shippingCost === 0 && (
                      <div
                        className="mt-4 py-2 px-3 text-center text-xs"
                        style={{
                          background: "rgba(62, 74, 61, 0.08)",
                          color: "var(--color-accent-forest)",
                          fontFamily: "var(--font-sans)",
                          fontWeight: 500,
                        }}
                      >
                        ✓ Free delivery applied
                      </div>
                    )}

                    <p
                      className="text-xs text-center mt-4"
                      style={{
                        color: "var(--color-text-secondary)",
                        fontFamily: "var(--font-sans)",
                      }}
                    >
                      Secure checkout · Free delivery over Rs. 8,000
                    </p>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
