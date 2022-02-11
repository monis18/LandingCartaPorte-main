import { InvoiceWrapper } from '@models/invoice/invoice-wrapper';

export function getInvoiceWrappersByMonths(fromDate: Date, toDate: Date): InvoiceWrapper[] {
  const fromYear = fromDate.getFullYear();
  const fromMonth = fromDate.getMonth();
  const toYear = toDate.getFullYear();
  const toMonth = toDate.getMonth();
  const wrappers = [];
  for (let year = fromYear; year <= toYear; year++) {
    let month = year === fromYear ? fromMonth : 0;
    const monthLimit = year === toYear ? toMonth : 11;
    for (; month <= monthLimit; month++) {
      const wrapper = Object.assign(new InvoiceWrapper(), { year, month });
      wrapper.id = wrapper.getId();
      wrappers.push(wrapper);
    }
  }
  return wrappers;
}
