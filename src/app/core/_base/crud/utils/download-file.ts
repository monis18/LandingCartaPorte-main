export function dowloadFile(blob: any, filename: string) {
  const downloadURL = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = downloadURL;
  link.download = filename;
  link.click();
}
