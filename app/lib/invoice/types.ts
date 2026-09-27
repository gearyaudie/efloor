export type InvoiceItem = {
  type: string;
  description: string;
  colour: string;
  unitQty: number;
  unitLabel: string;
  pricePerUnit: number;
};

export type InvoiceInput = {
  customerName: string;
  customerCity: string;
  invoiceNo: string;
  date: string; // ISO yyyy-mm-dd
  doNo: string;
  sales: string;
  poNo: string;
  deliveryDate: string; // ISO yyyy-mm-dd, optional
  items: InvoiceItem[];
  ongkir: number;
};

/** Fixed for every invoice issued from this tool — see /internal/issue-invoice. */
export const BANK_ACCOUNT_LINE = "NO REK :BCA 588 0018100,A/N : RACHMAN SALEH";
