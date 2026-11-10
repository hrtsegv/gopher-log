import { format, parseISO } from "date-fns";

export function formatDate(dateString: string): string {
  try {
    return format(parseISO(dateString), "MMMM d, yyyy");
  } catch {
    return dateString;
  }
}
