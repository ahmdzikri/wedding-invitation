import config from "~/config/config";

/**
 * Format date for display (DD • MM • YYYY)
 */
export function formatHeaderDate() {
  const date = new Date(config.event.date);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${day} • ${month} • ${year}`;
}
/**
 * Format date for display
 * @param dateString - Date string in YYYY-MM-DD format
 * @returns Formatted date string in Indonesian format
 */
export function formatWeddingDate(dateString: string): string {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return date.toLocaleDateString("id-ID", options);
}

/**
 * Format time for display
 * @param timeString - Time string in HH:MM format
 * @returns Formatted time string
 */
export function formatWeddingTime(timeString: string): string {
  const [hours, minutes] = timeString.split(":");
  return `${hours}:${minutes} WIB`;
}

/**
 * Get full event datetime string for countdown
 * @param event - Event object with date and time
 * @returns ISO datetime string for countdown timer
 */
export function getEventDateTime(event: {
  date: string;
  time: string;
}): string {
  return `${event.date}T${event.time}`;
}
