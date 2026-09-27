// Sanity "desc"/"content" fields have been observed as either a plain string
// or an array of portable text blocks depending on the document, so accept
// either shape rather than assuming one and crashing on the other.
export function portableTextToPlainText(value: unknown, maxLength = 155): string {
  let text = "";

  if (typeof value === "string") {
    text = value;
  } else if (Array.isArray(value)) {
    text = value
      .filter((block) => block?._type === "block" && block.children)
      .map((block: { children: { text?: string }[] }) =>
        block.children.map((child) => child?.text ?? "").join(""),
      )
      .join(" ");
  }

  text = text.trim();
  return text.length > maxLength ? `${text.slice(0, maxLength).trim()}...` : text;
}

// Sanity's priceVariants[].price has been observed as either a plain number
// or a formatted string (e.g. "Rp150.000") depending on how it was entered.
export function parsePrice(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const digits = value.replace(/[^0-9]/g, "");
    if (digits) return Number(digits);
  }
  return null;
}
