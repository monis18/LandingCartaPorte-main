// tslint:disable: variable-name
export class DGariInvoiceItem {
  po_number: string;
  po_item: string;
  tax_code: 'V2' | 'V0' | 'V1';
  item_amount: number;
  quantity: number;
  po_unit: string;
  item_text: string;
}
