export interface InvoiceTotals {
  Iva: number;
  Ieps: number;
  RetIeps: number;
  RetIva: number;
  RetIsr: number;
  Descuento?: number;
  Subtotal?: number;
  Total?: number;
  TrasladosLocales: number;
  RetencionesLocales: number;
}
