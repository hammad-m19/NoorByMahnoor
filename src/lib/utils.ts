export function formatPrice(price: number, currency: string = "PKR"): string {
  return `Rs. ${price.toLocaleString("en-PK")}`;
}

export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(" ");
}

/**
 * Generate a unique order ID in format: NBM-YYMMDD-XXXX
 * e.g., NBM-260710-4827
 */
export function generateOrderId(): string {
  const now = new Date();
  const yy = String(now.getFullYear()).slice(2);
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  const rand = String(Math.floor(1000 + Math.random() * 9000)); // 4-digit
  return `NBM-${yy}${mm}${dd}-${rand}`;
}

/**
 * Calculate shipping cost.
 * Free for orders >= 8000, otherwise Rs. 300.
 */
export function getShippingCost(subtotal: number): number {
  return subtotal >= 8000 ? 0 : 300;
}
