import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { order } = await request.json();

    if (!order) {
      return Response.json({ error: "Order data is required" }, { status: 400 });
    }

    const paymentMethodLabels: Record<string, string> = {
      cod: "Cash on Delivery",
      bank_transfer: "Bank Transfer",
      jazzcash_easypaisa: "JazzCash / EasyPaisa",
    };

    const itemsList = order.items
      .map(
        (item: { product: { name: string; price: number }; quantity: number }) =>
          `• ${item.product.name} × ${item.quantity} = Rs. ${(
            item.product.price * item.quantity
          ).toLocaleString("en-PK")}`
      )
      .join("\n");

    const emailBody = `
═══════════════════════════════════════
   🌟 NEW ORDER — NOOR BY MAHNOOR 🌟
═══════════════════════════════════════

Order Number: ${order.id}
Date: ${new Date(order.createdAt).toLocaleString("en-PK", {
      dateStyle: "full",
      timeStyle: "short",
    })}

───────── CUSTOMER DETAILS ─────────
Name:     ${order.shipping.fullName}
Phone:    ${order.shipping.phone}
Email:    ${order.shipping.email}
Address:  ${order.shipping.address}
City:     ${order.shipping.city}
Province: ${order.shipping.province}
${order.shipping.postalCode ? `Postal:   ${order.shipping.postalCode}` : ""}
${order.shipping.notes ? `Notes:    ${order.shipping.notes}` : ""}

────────── ORDER ITEMS ──────────
${itemsList}

────────── ORDER TOTAL ──────────
Subtotal:  Rs. ${order.subtotal.toLocaleString("en-PK")}
Delivery:  ${order.shippingCost === 0 ? "FREE" : `Rs. ${order.shippingCost.toLocaleString("en-PK")}`}
TOTAL:     Rs. ${order.total.toLocaleString("en-PK")}

────────── PAYMENT ──────────
Method: ${paymentMethodLabels[order.paymentMethod] || order.paymentMethod}
Status: ${order.paymentMethod === "cod" ? "Payment pending (COD)" : "Customer has been shown payment details"}
${order.paymentScreenshot ? "\n⚠️ Customer uploaded a payment screenshot (viewable in order system)" : ""}

═══════════════════════════════════════
    `.trim();

    // Use Nodemailer to send email
    // Dynamic import to avoid issues if nodemailer is not installed
    let nodemailer;
    try {
      nodemailer = await import("nodemailer");
    } catch {
      // If nodemailer is not installed, log the order and return success
      console.log("═══ ORDER NOTIFICATION (Nodemailer not configured) ═══");
      console.log(emailBody);
      console.log("═══════════════════════════════════════════════════════");
      return Response.json({
        success: true,
        message: "Order logged (email service not configured yet)",
      });
    }

    // Create transporter — uses environment variables
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER || "noorbymahnoor.pk@gmail.com",
        pass: process.env.EMAIL_PASS || "", // Gmail App Password
      },
    });

    // Only attempt to send if EMAIL_PASS is configured
    if (!process.env.EMAIL_PASS) {
      console.log("═══ ORDER NOTIFICATION (EMAIL_PASS not set) ═══");
      console.log(emailBody);
      console.log("════════════════════════════════════════════════");
      return Response.json({
        success: true,
        message: "Order logged (email password not configured)",
      });
    }

    await transporter.sendMail({
      from: `"Noor by Mahnoor" <${process.env.EMAIL_USER || "noorbymahnoor.pk@gmail.com"}>`,
      to: "noorbymahnoor.pk@gmail.com",
      subject: `🌟 New Order ${order.id} — ${order.shipping.fullName}`,
      text: emailBody,
    });

    return Response.json({ success: true, message: "Order notification sent" });
  } catch (error) {
    console.error("Error sending order email:", error);
    return Response.json(
      { error: "Failed to send notification", details: String(error) },
      { status: 500 }
    );
  }
}
