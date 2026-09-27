"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

const TEXT_PRIMARY = "#0b0b0b";
const TEXT_SECONDARY = "#52514e";
const TEXT_MUTED = "#898781";
const BORDER = "#c3c2b7";
const BAD = "#d03b3b";

type ItemRow = {
  id: number;
  type: string;
  description: string;
  colour: string;
  unitQty: string;
  unitLabel: string;
  pricePerUnit: string;
};

function emptyItem(id: number): ItemRow {
  return { id, type: "", description: "", colour: "", unitQty: "1", unitLabel: "PCS", pricePerUnit: "" };
}

function todayIso(): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Jakarta" }).format(new Date());
}

function formatIdr(n: number): string {
  return new Intl.NumberFormat("id-ID", { maximumFractionDigits: 0 }).format(n);
}

const inputClass =
  "w-full rounded-lg border px-3 py-2 text-sm outline-none focus:border-[#2a78d6]";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-xs font-medium" style={{ color: TEXT_SECONDARY }}>
        {label}
      </span>
      {children}
    </label>
  );
}

export default function InvoiceForm() {
  const router = useRouter();
  const [customerName, setCustomerName] = useState("");
  const [customerCity, setCustomerCity] = useState("JAKARTA");
  const [invoiceNo, setInvoiceNo] = useState("");
  const [date, setDate] = useState(todayIso());
  const [doNo, setDoNo] = useState("");
  const [sales, setSales] = useState("");
  const [poNo, setPoNo] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [items, setItems] = useState<ItemRow[]>([emptyItem(1)]);
  const [nextId, setNextId] = useState(2);
  const [ongkir, setOngkir] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const subtotal = useMemo(
    () => items.reduce((sum, it) => sum + (Number(it.unitQty) || 0) * (Number(it.pricePerUnit) || 0), 0),
    [items],
  );
  const ongkirValue = Number(ongkir) || 0;
  const total = subtotal + ongkirValue;

  function updateItem(id: number, patch: Partial<ItemRow>) {
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, ...patch } : it)));
  }

  function addItem() {
    setItems((prev) => [...prev, emptyItem(nextId)]);
    setNextId((n) => n + 1);
  }

  function removeItem(id: number) {
    setItems((prev) => (prev.length > 1 ? prev.filter((it) => it.id !== id) : prev));
  }

  async function handleLogout() {
    await fetch("/api/ads-dashboard/logout", { method: "POST" });
    router.refresh();
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/issue-invoice/generate", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          customerName,
          customerCity,
          invoiceNo,
          date,
          doNo,
          sales,
          poNo,
          deliveryDate,
          ongkir: ongkirValue,
          items: items.map((it) => ({
            type: it.type,
            description: it.description,
            colour: it.colour,
            unitQty: Number(it.unitQty) || 1,
            unitLabel: it.unitLabel,
            pricePerUnit: Number(it.pricePerUnit) || 0,
          })),
        }),
      });

      if (res.status === 401) {
        router.refresh();
        return;
      }
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        setError(body?.error ?? `Failed to generate invoice (HTTP ${res.status}).`);
        return;
      }

      const blob = await res.blob();
      const disposition = res.headers.get("content-disposition") ?? "";
      const match = disposition.match(/filename="?([^"]+)"?/);
      const fileName = match?.[1] ?? `Invoice-${invoiceNo || "draft"}.pdf`;

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-[1.5rem] font-semibold" style={{ color: TEXT_PRIMARY }}>
            Issue invoice
          </h1>
          <p className="text-sm" style={{ color: TEXT_SECONDARY }}>
            Fill in the details below and download a ready-to-send PDF invoice.
          </p>
        </div>
        <button onClick={handleLogout} className="text-sm underline" style={{ color: TEXT_MUTED }}>
          Sign out
        </button>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-6">
        <div className="rounded-xl border border-[rgba(11,11,11,0.10)] bg-[#fcfcfb] p-4">
          <h2 className="text-sm font-semibold" style={{ color: TEXT_PRIMARY }}>
            Customer &amp; invoice info
          </h2>
          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Field label="Customer name">
              <input
                className={inputClass}
                style={{ borderColor: BORDER }}
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="BP Jason Santoso"
                required
              />
            </Field>
            <Field label="Customer city">
              <input
                className={inputClass}
                style={{ borderColor: BORDER }}
                value={customerCity}
                onChange={(e) => setCustomerCity(e.target.value)}
              />
            </Field>
            <Field label="Invoice no.">
              <input
                className={inputClass}
                style={{ borderColor: BORDER }}
                value={invoiceNo}
                onChange={(e) => setInvoiceNo(e.target.value)}
                placeholder="QA 009 - 201"
                required
              />
            </Field>
            <Field label="Date">
              <input
                type="date"
                className={inputClass}
                style={{ borderColor: BORDER }}
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </Field>
            <Field label="DO no. (optional)">
              <input
                className={inputClass}
                style={{ borderColor: BORDER }}
                value={doNo}
                onChange={(e) => setDoNo(e.target.value)}
              />
            </Field>
            <Field label="Sales (optional)">
              <input
                className={inputClass}
                style={{ borderColor: BORDER }}
                value={sales}
                onChange={(e) => setSales(e.target.value)}
              />
            </Field>
            <Field label="PO no. (optional)">
              <input
                className={inputClass}
                style={{ borderColor: BORDER }}
                value={poNo}
                onChange={(e) => setPoNo(e.target.value)}
              />
            </Field>
            <Field label="Delivery date (optional)">
              <input
                type="date"
                className={inputClass}
                style={{ borderColor: BORDER }}
                value={deliveryDate}
                onChange={(e) => setDeliveryDate(e.target.value)}
              />
            </Field>
          </div>
        </div>

        <div className="rounded-xl border border-[rgba(11,11,11,0.10)] bg-[#fcfcfb] p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold" style={{ color: TEXT_PRIMARY }}>
              Items
            </h2>
            <button
              type="button"
              onClick={addItem}
              className="text-sm font-medium underline"
              style={{ color: "#2a78d6" }}
            >
              + Add item
            </button>
          </div>

          <div className="mt-3 flex flex-col gap-4">
            {items.map((item, idx) => {
              const lineTotal = (Number(item.unitQty) || 0) * (Number(item.pricePerUnit) || 0);
              return (
                <div key={item.id} className="rounded-lg border p-3" style={{ borderColor: BORDER }}>
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-medium" style={{ color: TEXT_MUTED }}>
                      Item {idx + 1}
                    </p>
                    {items.length > 1 ? (
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="text-xs underline"
                        style={{ color: BAD }}
                      >
                        Remove
                      </button>
                    ) : null}
                  </div>
                  <div className="mt-2 grid grid-cols-2 gap-3 sm:grid-cols-6">
                    <div className="col-span-2 sm:col-span-1">
                      <Field label="Type / weight">
                        <input
                          className={inputClass}
                          style={{ borderColor: BORDER }}
                          value={item.type}
                          onChange={(e) => updateItem(item.id, { type: e.target.value })}
                          placeholder="33 KG"
                        />
                      </Field>
                    </div>
                    <div className="col-span-2 sm:col-span-2">
                      <Field label="Description">
                        <input
                          className={inputClass}
                          style={{ borderColor: BORDER }}
                          value={item.description}
                          onChange={(e) => updateItem(item.id, { description: e.target.value })}
                          placeholder="Lem Polyurethane Rumput Sintetis EFLOOR"
                          required
                        />
                      </Field>
                    </div>
                    <div className="col-span-1">
                      <Field label="Colour">
                        <input
                          className={inputClass}
                          style={{ borderColor: BORDER }}
                          value={item.colour}
                          onChange={(e) => updateItem(item.id, { colour: e.target.value })}
                        />
                      </Field>
                    </div>
                    <div className="col-span-1">
                      <Field label="Qty">
                        <input
                          type="number"
                          min="0"
                          step="any"
                          className={inputClass}
                          style={{ borderColor: BORDER }}
                          value={item.unitQty}
                          onChange={(e) => updateItem(item.id, { unitQty: e.target.value })}
                        />
                      </Field>
                    </div>
                    <div className="col-span-1">
                      <Field label="Unit">
                        <input
                          className={inputClass}
                          style={{ borderColor: BORDER }}
                          value={item.unitLabel}
                          onChange={(e) => updateItem(item.id, { unitLabel: e.target.value })}
                          placeholder="PCS"
                        />
                      </Field>
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <Field label="Price/unit (Rp)">
                        <input
                          type="number"
                          min="0"
                          step="any"
                          className={inputClass}
                          style={{ borderColor: BORDER }}
                          value={item.pricePerUnit}
                          onChange={(e) => updateItem(item.id, { pricePerUnit: e.target.value })}
                          required
                        />
                      </Field>
                    </div>
                  </div>
                  <p className="mt-2 text-right text-xs" style={{ color: TEXT_MUTED }}>
                    Line total: Rp {formatIdr(lineTotal)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-xl border border-[rgba(11,11,11,0.10)] bg-[#fcfcfb] p-4">
          <h2 className="text-sm font-semibold" style={{ color: TEXT_PRIMARY }}>
            Shipping &amp; total
          </h2>
          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Field label="Ongkir / shipping (Rp, optional)">
              <input
                type="number"
                min="0"
                step="any"
                className={inputClass}
                style={{ borderColor: BORDER }}
                value={ongkir}
                onChange={(e) => setOngkir(e.target.value)}
                placeholder="Leave blank if none"
              />
            </Field>
          </div>
          <div className="mt-3 flex flex-col items-end gap-0.5 text-sm" style={{ color: TEXT_SECONDARY }}>
            {ongkirValue > 0 ? (
              <>
                <p>Subtotal: Rp {formatIdr(subtotal)}</p>
                <p>Ongkir: Rp {formatIdr(ongkirValue)}</p>
              </>
            ) : null}
            <p className="text-base font-semibold" style={{ color: TEXT_PRIMARY }}>
              Total: Rp {formatIdr(total)}
            </p>
          </div>
        </div>

        <p className="text-xs" style={{ color: TEXT_MUTED }}>
          Bank account is fixed to BCA 588 0018100, A/N: Rachman Saleh. The &quot;SAY&quot; amount in words is
          filled in automatically from the total.
        </p>

        {error ? <p className="text-sm" style={{ color: BAD }}>{error}</p> : null}

        <button
          type="submit"
          disabled={submitting}
          className="self-start rounded-lg bg-[#2a78d6] px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
        >
          {submitting ? "Generating…" : "Download invoice PDF"}
        </button>
      </form>
    </div>
  );
}
