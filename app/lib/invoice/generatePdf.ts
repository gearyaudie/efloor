import { PDFDocument, PDFFont, PDFPage, StandardFonts, rgb } from "pdf-lib";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { BANK_ACCOUNT_LINE, InvoiceInput } from "./types";
import { formatIdrAmount, terbilangRupiah } from "./terbilang";

const MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEPT", "OCT", "NOV", "DEC"];

function formatInvoiceDate(iso: string): string {
  if (!iso) return "";
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return "";
  return `${d} ${MONTHS[m - 1]} ${y}`;
}

const BLACK = rgb(0, 0, 0);
const PAGE_WIDTH = 595.28;
const MARGIN = 34;
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2;

// TYPE | DESCRIPTION | COLOUR | UNIT | PRICE/UNIT | TOTAL
const COL_WIDTHS = [58, 195, 58, 40, 88, CONTENT_WIDTH - (58 + 195 + 58 + 40 + 88)];
const COL_X: number[] = [];
{
  let x = MARGIN;
  for (const w of COL_WIDTHS) {
    COL_X.push(x);
    x += w;
  }
}

function drawText(
  page: PDFPage,
  text: string,
  x: number,
  y: number,
  font: PDFFont,
  size = 8,
  options?: { align?: "left" | "right" | "center"; maxWidth?: number },
) {
  const width = font.widthOfTextAtSize(text, size);
  let drawX = x;
  if (options?.align === "right" && options.maxWidth !== undefined) {
    drawX = x + options.maxWidth - width;
  } else if (options?.align === "center" && options.maxWidth !== undefined) {
    drawX = x + (options.maxWidth - width) / 2;
  }
  page.drawText(text, { x: drawX, y, size, font, color: BLACK });
}

/** Wraps text to fit within maxWidth, returning each line. Simple greedy word-wrap. */
function wrapText(text: string, font: PDFFont, size: number, maxWidth: number): string[] {
  const words = text.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (font.widthOfTextAtSize(candidate, size) > maxWidth && current) {
      lines.push(current);
      current = word;
    } else {
      current = candidate;
    }
  }
  if (current) lines.push(current);
  return lines.length ? lines : [""];
}

export async function generateInvoicePdf(input: InvoiceInput): Promise<Uint8Array> {
  const doc = await PDFDocument.create();
  const page = doc.addPage([PAGE_WIDTH, 841.89]);
  const font = await doc.embedFont(StandardFonts.Helvetica);
  const bold = await doc.embedFont(StandardFonts.HelveticaBold);

  const logoBytes = await readFile(path.join(process.cwd(), "public", "img", "header-logo.png"));
  const logo = await doc.embedPng(logoBytes);
  const logoDims = logo.scale(0.24);

  let y = 800;

  // Logo + INVOICE title
  page.drawImage(logo, { x: MARGIN, y: y - logoDims.height, width: logoDims.width, height: logoDims.height });
  drawText(page, "INVOICE", MARGIN, y - logoDims.height - 4, bold, 20, { align: "right", maxWidth: CONTENT_WIDTH });
  y -= logoDims.height + 20;

  // ---- Header info box ----
  const headerTop = y;
  const headerLeftWidth = 300;
  const headerRightX = MARGIN + headerLeftWidth;
  const headerRightWidth = CONTENT_WIDTH - headerLeftWidth;
  const rowHeights = [24, 20, 28];
  const headerHeight = rowHeights.reduce((a, b) => a + b, 0);

  // Outer box + vertical dividers
  page.drawRectangle({ x: MARGIN, y: headerTop - headerHeight, width: CONTENT_WIDTH, height: headerHeight, borderColor: BLACK, borderWidth: 1 });
  page.drawLine({ start: { x: headerRightX, y: headerTop }, end: { x: headerRightX, y: headerTop - headerHeight }, thickness: 1, color: BLACK });
  const rightMidX = headerRightX + headerRightWidth / 2;
  page.drawLine({ start: { x: rightMidX, y: headerTop }, end: { x: rightMidX, y: headerTop - headerHeight }, thickness: 1, color: BLACK });

  // Horizontal dividers
  let rowY = headerTop;
  for (const h of rowHeights.slice(0, -1)) {
    rowY -= h;
    page.drawLine({ start: { x: MARGIN, y: rowY }, end: { x: MARGIN + CONTENT_WIDTH, y: rowY }, thickness: 1, color: BLACK });
  }
  // split right column into invoice-no / date on row 1, do-no / sales on row 2, po-no / delivery on row 3
  const rowTops = [headerTop, headerTop - rowHeights[0], headerTop - rowHeights[0] - rowHeights[1]];

  drawText(page, "CUSTOMER :", MARGIN + 6, rowTops[0] - 14, bold, 9);
  drawText(page, input.customerName, MARGIN + 66, rowTops[0] - 14, font, 9);
  drawText(page, input.customerCity, MARGIN + 66, rowTops[1] - 13, font, 9);

  drawText(page, "INVOICE NO:", headerRightX + 6, rowTops[0] - 12, bold, 8.5);
  drawText(page, input.invoiceNo, headerRightX + 6, rowTops[0] - 22, font, 9);
  drawText(page, "DO NO :", headerRightX + 6, rowTops[1] - 13, bold, 8.5);
  drawText(page, input.doNo, headerRightX + 55, rowTops[1] - 13, font, 8.5);
  drawText(page, "PO NO :", headerRightX + 6, rowTops[2] - 15, bold, 8.5);
  drawText(page, input.poNo, headerRightX + 55, rowTops[2] - 15, font, 8.5);

  drawText(page, "DATE :", rightMidX + 6, rowTops[0] - 12, bold, 8.5);
  drawText(page, formatInvoiceDate(input.date), rightMidX + 6, rowTops[0] - 22, font, 9);
  drawText(page, "SALES :", rightMidX + 6, rowTops[1] - 13, bold, 8.5);
  drawText(page, input.sales, rightMidX + 55, rowTops[1] - 13, font, 8.5);
  drawText(page, "DELIVERY DATE :", rightMidX + 6, rowTops[2] - 13, bold, 8.5);
  if (input.deliveryDate) {
    drawText(page, formatInvoiceDate(input.deliveryDate), rightMidX + 6, rowTops[2] - 23, font, 8.5);
  }

  y = headerTop - headerHeight;

  // ---- Item table header ----
  const tableHeaderHeight = 16;
  const headers = ["TYPE", "DESCRIPTION", "COLOUR", "UNIT", "PRICE/UNIT", "TOTAL"];
  page.drawRectangle({ x: MARGIN, y: y - tableHeaderHeight, width: CONTENT_WIDTH, height: tableHeaderHeight, borderColor: BLACK, borderWidth: 1 });
  headers.forEach((h, i) => {
    drawText(page, h, COL_X[i] + 2, y - 11, bold, 8, { align: i === headers.length - 1 || i === 4 ? "center" : "left", maxWidth: COL_WIDTHS[i] - 4 });
  });
  y -= tableHeaderHeight;

  // ---- Item rows ----
  const descMaxWidth = COL_WIDTHS[1] - 6;
  const itemLineHeight = 10;
  const rowPadding = 6;
  const itemRowHeights = input.items.map((item) => {
    const lines = wrapText(item.description, font, 8, descMaxWidth);
    return Math.max(20, lines.length * itemLineHeight + rowPadding);
  });
  const itemsHeight = Math.max(200, itemRowHeights.reduce((a, b) => a + b, 0));
  const tableTop = y;

  page.drawRectangle({ x: MARGIN, y: tableTop - itemsHeight, width: CONTENT_WIDTH, height: itemsHeight, borderColor: BLACK, borderWidth: 1 });
  // column dividers spanning the whole items area
  let colX = MARGIN;
  for (let i = 0; i < COL_WIDTHS.length - 1; i++) {
    colX += COL_WIDTHS[i];
    page.drawLine({ start: { x: colX, y: tableTop }, end: { x: colX, y: tableTop - itemsHeight }, thickness: 1, color: BLACK });
  }

  let cursorY = tableTop;
  let subtotal = 0;
  input.items.forEach((item, idx) => {
    const rowH = itemRowHeights[idx];
    const total = item.unitQty * item.pricePerUnit;
    subtotal += total;
    const textTop = cursorY - 11;

    drawText(page, item.type, COL_X[0] + 3, textTop, font, 8);
    const lines = wrapText(item.description, font, 8, descMaxWidth);
    lines.forEach((line, li) => drawText(page, line, COL_X[1] + 3, textTop - li * itemLineHeight, font, 8));
    drawText(page, item.colour, COL_X[2] + 3, textTop, font, 8);
    drawText(page, `${item.unitQty} ${item.unitLabel}`, COL_X[3] + 2, textTop, font, 7.5);
    drawText(page, `Rp. ${formatIdrAmount(item.pricePerUnit)}`, COL_X[4] + 3, textTop, font, 8);
    drawText(page, `Rp ${formatIdrAmount(total)}`, COL_X[5] + 3, textTop, font, 8, { align: "right", maxWidth: COL_WIDTHS[5] - 6 });

    if (idx < input.items.length - 1) {
      page.drawLine({ start: { x: MARGIN, y: cursorY - rowH }, end: { x: MARGIN + CONTENT_WIDTH, y: cursorY - rowH }, thickness: 0.5, color: BLACK });
    }
    cursorY -= rowH;
  });

  y = tableTop - itemsHeight;

  // ---- SAY / totals footer ----
  const hasOngkir = input.ongkir > 0;
  const totalsRows = hasOngkir ? 3 : 1;
  const footerRowHeight = 16;
  const footerHeight = footerRowHeight * 3;
  const footerLeftWidth = CONTENT_WIDTH * 0.62;
  const footerRightX = MARGIN + footerLeftWidth;

  page.drawRectangle({ x: MARGIN, y: y - footerHeight, width: CONTENT_WIDTH, height: footerHeight, borderColor: BLACK, borderWidth: 1 });
  page.drawLine({ start: { x: footerRightX, y }, end: { x: footerRightX, y: y - footerHeight }, thickness: 1, color: BLACK });
  const totalsLabelX = footerRightX + 6;
  const totalsAmountX = footerRightX + 70;
  const totalsAmountWidth = CONTENT_WIDTH - footerLeftWidth - 76;

  const grandTotal = subtotal + input.ongkir;

  drawText(page, "SAY :", MARGIN + 6, y - 12, bold, 8.5);
  const sayLines = wrapText(terbilangRupiah(grandTotal), font, 8.5, footerLeftWidth - 40);
  sayLines.forEach((line, i) => drawText(page, line, MARGIN + 42, y - 12 - i * 10, font, 8.5));

  if (hasOngkir) {
    page.drawLine({ start: { x: footerRightX, y: y - footerRowHeight }, end: { x: MARGIN + CONTENT_WIDTH, y: y - footerRowHeight }, thickness: 0.5, color: BLACK });
    page.drawLine({ start: { x: footerRightX, y: y - footerRowHeight * 2 }, end: { x: MARGIN + CONTENT_WIDTH, y: y - footerRowHeight * 2 }, thickness: 0.5, color: BLACK });
    drawText(page, "SUBTOTAL", totalsLabelX, y - 12, bold, 8);
    drawText(page, `Rp ${formatIdrAmount(subtotal)}`, totalsAmountX, y - 12, font, 8, { align: "right", maxWidth: totalsAmountWidth });
    drawText(page, "ONGKIR", totalsLabelX, y - footerRowHeight - 12, bold, 8);
    drawText(page, `Rp ${formatIdrAmount(input.ongkir)}`, totalsAmountX, y - footerRowHeight - 12, font, 8, { align: "right", maxWidth: totalsAmountWidth });
    drawText(page, "TOTAL", totalsLabelX, y - footerRowHeight * 2 - 12, bold, 8.5);
    drawText(page, `Rp ${formatIdrAmount(grandTotal)}`, totalsAmountX, y - footerRowHeight * 2 - 12, bold, 8.5, { align: "right", maxWidth: totalsAmountWidth });
  } else {
    drawText(page, "TOTAL", totalsLabelX, y - footerRowHeight * 2 - 12, bold, 8.5);
    drawText(page, `Rp ${formatIdrAmount(grandTotal)}`, totalsAmountX, y - footerRowHeight * 2 - 12, bold, 8.5, { align: "right", maxWidth: totalsAmountWidth });
  }

  y -= footerHeight;

  // ---- Bank account line ----
  const bankRowHeight = 20;
  page.drawRectangle({ x: MARGIN, y: y - bankRowHeight, width: CONTENT_WIDTH, height: bankRowHeight, borderColor: BLACK, borderWidth: 1 });
  drawText(page, BANK_ACCOUNT_LINE, MARGIN + 6, y - 13, font, 8.5);
  y -= bankRowHeight;

  // ---- Signature row ----
  const sigRowHeight = 50;
  const sigColWidth = CONTENT_WIDTH / 3;
  page.drawRectangle({ x: MARGIN, y: y - sigRowHeight, width: CONTENT_WIDTH, height: sigRowHeight, borderColor: BLACK, borderWidth: 1 });
  page.drawLine({ start: { x: MARGIN + sigColWidth, y }, end: { x: MARGIN + sigColWidth, y: y - sigRowHeight }, thickness: 1, color: BLACK });
  page.drawLine({ start: { x: MARGIN + sigColWidth * 2, y }, end: { x: MARGIN + sigColWidth * 2, y: y - sigRowHeight }, thickness: 1, color: BLACK });
  drawText(page, "PREPARED :", MARGIN + 6, y - 12, bold, 8.5);
  drawText(page, "APPROVED BY :", MARGIN + sigColWidth + 6, y - 12, bold, 8.5);
  drawText(page, "CUSTOMER :", MARGIN + sigColWidth * 2 + 6, y - 12, bold, 8.5);

  return doc.save();
}
