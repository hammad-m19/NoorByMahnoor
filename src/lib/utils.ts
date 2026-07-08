export function formatPrice(price: number, currency: string = "PKR"): string {
  return `Rs. ${price.toLocaleString("en-PK")}`;
}

export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(" ");
}
