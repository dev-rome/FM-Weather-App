/**
 * Utility functions for date formatting and parsing
 */

/**
 * Formats a date string (YYYY-MM-DD) to a formatted date string
 * @param dateString - Date string in YYYY-MM-DD format
 * @param options - Intl.DateTimeFormatOptions
 * @returns Formatted date string
 */
export function formatDate(
  dateString: string,
  options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  }
): string {
  const [year, month, day] = dateString.split("-").map(Number);
  const date = new Date(year, month - 1, day); // month is 0-indexed
  return date.toLocaleDateString("en-US", options);
}

/**
 * Formats a date string to a short day name (e.g., "Mon", "Tue")
 * @param dateString - Date string in YYYY-MM-DD format
 * @returns Short day name
 */
export function formatDayName(dateString: string): string {
  return formatDate(dateString, { weekday: "short" });
}

/**
 * Formats a date string to a full day name (e.g., "Monday", "Tuesday")
 * @param dateString - Date string in YYYY-MM-DD format
 * @returns Full day name
 */
export function formatFullDayName(dateString: string): string {
  return formatDate(dateString, { weekday: "long" });
}

/**
 * Formats a time string to a readable time format
 * @param timeString - ISO time string
 * @returns Formatted time string (e.g., "2 PM", "10:30 AM")
 */
export function formatTime(timeString: string): string {
  const time = new Date(timeString);
  return time.toLocaleTimeString("en-US", {
    hour: "numeric",
    hour12: true,
  });
}

/**
 * Extracts the date part (YYYY-MM-DD) from an ISO datetime string
 * @param dateTimeString - ISO datetime string
 * @returns Date string in YYYY-MM-DD format
 */
export function extractDate(dateTimeString: string): string {
  return dateTimeString.split("T")[0];
}

