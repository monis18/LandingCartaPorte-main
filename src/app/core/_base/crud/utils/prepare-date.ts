export function prepareDate(date: Date) {
  const offset = new Date().getTimezoneOffset();
  const Fecha = date;
  const timeInMs = Fecha.getTime();
  const localEntryDate = new Date();
  localEntryDate.setTime(timeInMs - (60000 * offset));
  return localEntryDate;
}
