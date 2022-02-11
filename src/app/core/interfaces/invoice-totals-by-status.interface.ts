export interface InvoiceTotalsByStatus {
  Status: {
    0: { // Sin Pagar/Cobrar
      I: number, // Ingreso
      E: number, // Egresos
    },
    1: { // Pagado/Cobrado
      I: number, // Ingresos
      E: number, // Egresos
    }
  };
}
