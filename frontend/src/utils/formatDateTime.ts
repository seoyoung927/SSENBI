export default function formatDateTime(dateTime: string | undefined): string {
  if (!dateTime) {
    return "";
  }
  const date = new Date(dateTime);

  if (isNaN(date.getTime())) {
    return "";
  }
  return date.toLocaleString();
}
