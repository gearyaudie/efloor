import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { AUTH_COOKIE_NAME, isValidSessionToken } from "@/app/lib/adsDashboard/auth";
import { generateInvoicePdf } from "@/app/lib/invoice/generatePdf";
import type { InvoiceInput, InvoiceItem } from "@/app/lib/invoice/types";

function asString(v: unknown): string {
  return typeof v === "string" ? v.trim() : "";
}

function asNumber(v: unknown): number {
  const n = typeof v === "number" ? v : Number(v);
  return Number.isFinite(n) ? n : 0;
}

export async function POST(request: NextRequest) {
  const store = await cookies();
  if (!isValidSessionToken(store.get(AUTH_COOKIE_NAME)?.value)) {
    return NextResponse.json({ ok: false, error: "Not signed in" }, { status: 401 });
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const customerName = asString(body.customerName);
  const invoiceNo = asString(body.invoiceNo);
  const date = asString(body.date);
  const rawItems = Array.isArray(body.items) ? body.items : [];

  if (!customerName) {
    return NextResponse.json({ ok: false, error: "Customer name is required" }, { status: 400 });
  }
  if (!invoiceNo) {
    return NextResponse.json({ ok: false, error: "Invoice number is required" }, { status: 400 });
  }
  if (!date) {
    return NextResponse.json({ ok: false, error: "Date is required" }, { status: 400 });
  }
  if (rawItems.length === 0) {
    return NextResponse.json({ ok: false, error: "At least one item is required" }, { status: 400 });
  }

  const items: InvoiceItem[] = [];
  for (const raw of rawItems) {
    const r = (raw ?? {}) as Record<string, unknown>;
    const description = asString(r.description);
    const pricePerUnit = asNumber(r.pricePerUnit);
    const unitQty = asNumber(r.unitQty) || 1;
    if (!description || pricePerUnit <= 0) {
      return NextResponse.json(
        { ok: false, error: "Every item needs a description and a price per unit" },
        { status: 400 },
      );
    }
    items.push({
      type: asString(r.type),
      description,
      colour: asString(r.colour),
      unitQty,
      unitLabel: asString(r.unitLabel) || "PCS",
      pricePerUnit,
    });
  }

  const input: InvoiceInput = {
    customerName,
    customerCity: asString(body.customerCity) || "JAKARTA",
    invoiceNo,
    date,
    doNo: asString(body.doNo),
    sales: asString(body.sales),
    poNo: asString(body.poNo),
    deliveryDate: asString(body.deliveryDate),
    items,
    ongkir: Math.max(0, asNumber(body.ongkir)),
  };

  try {
    const pdfBytes = await generateInvoicePdf(input);
    const fileName = `Invoice-${invoiceNo.replace(/[^a-zA-Z0-9-]+/g, "_")}.pdf`;
    return new NextResponse(Buffer.from(pdfBytes), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${fileName}"`,
      },
    });
  } catch (error) {
    console.error("Failed to generate invoice PDF", error);
    return NextResponse.json({ ok: false, error: "Failed to generate PDF" }, { status: 500 });
  }
}
