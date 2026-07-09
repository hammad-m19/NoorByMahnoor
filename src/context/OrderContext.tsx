"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { CartItem } from "@/context/CartContext";
import { generateOrderId } from "@/lib/utils";

export type PaymentMethod = "cod" | "bank_transfer" | "jazzcash_easypaisa";

export interface ShippingInfo {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
  notes: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  shipping: ShippingInfo;
  paymentMethod: PaymentMethod;
  subtotal: number;
  shippingCost: number;
  total: number;
  status: "pending" | "confirmed" | "processing" | "shipped" | "delivered";
  createdAt: string;
  paymentScreenshot?: string; // base64 for online payments
}

interface OrderContextValue {
  orders: Order[];
  placeOrder: (
    items: CartItem[],
    shipping: ShippingInfo,
    paymentMethod: PaymentMethod,
    subtotal: number,
    shippingCost: number,
    paymentScreenshot?: string
  ) => Promise<Order>;
  getOrder: (orderId: string) => Order | undefined;
}

const OrderContext = createContext<OrderContextValue | undefined>(undefined);

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("noor-orders");
      if (saved) {
        setOrders(JSON.parse(saved));
      }
    } catch {
      // Silently fail
    }
  }, []);

  // Persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("noor-orders", JSON.stringify(orders));
    } catch {
      // Silently fail
    }
  }, [orders]);

  const placeOrder = useCallback(
    async (
      items: CartItem[],
      shipping: ShippingInfo,
      paymentMethod: PaymentMethod,
      subtotal: number,
      shippingCost: number,
      paymentScreenshot?: string
    ): Promise<Order> => {
      const order: Order = {
        id: generateOrderId(),
        items,
        shipping,
        paymentMethod,
        subtotal,
        shippingCost,
        total: subtotal + shippingCost,
        status: "pending",
        createdAt: new Date().toISOString(),
        paymentScreenshot,
      };

      // Save order locally
      setOrders((prev) => [order, ...prev]);

      // Send notification email to owner
      try {
        await fetch("/api/send-order-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            order: {
              ...order,
              // Don't send base64 screenshot in email body — too large
              paymentScreenshot: paymentScreenshot ? "[Screenshot Attached]" : undefined,
            },
          }),
        });
      } catch {
        // Order is still placed even if email fails
        console.error("Failed to send order notification email");
      }

      return order;
    },
    []
  );

  const getOrder = useCallback(
    (orderId: string) => orders.find((o) => o.id === orderId),
    [orders]
  );

  return (
    <OrderContext.Provider value={{ orders, placeOrder, getOrder }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrders must be used within an OrderProvider");
  }
  return context;
}
