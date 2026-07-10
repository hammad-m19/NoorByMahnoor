import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { OrderProvider } from "@/context/OrderContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/layout/CartDrawer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";

export const metadata: Metadata = {
  title: "Noor by Mahnoor — Luxury Artisan Perfumes",
  description:
    "Discover the exquisite fragrance collection from Noor by Mahnoor. Handcrafted luxury perfumes inspired by the golden glow of dusk and the delicate bloom of dawn.",
  keywords: [
    "perfume",
    "luxury fragrance",
    "artisan perfume",
    "Noor by Mahnoor",
    "Pakistani perfume",
    "oud",
    "rose fragrance",
  ],
  openGraph: {
    title: "Noor by Mahnoor — Luxury Artisan Perfumes",
    description:
      "Handcrafted luxury perfumes inspired by light, nature, and heritage.",
    siteName: "Noor by Mahnoor",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <OrderProvider>
            <Navbar />
            <CartDrawer />
            <main className="flex-1">{children}</main>
            <Footer />
            <WhatsAppButton />
          </OrderProvider>
        </CartProvider>
      </body>
    </html>
  );
}

