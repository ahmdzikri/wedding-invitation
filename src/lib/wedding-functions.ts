import type { WeddingData } from "~/types/wedding";
import { weddingDataConfig } from "./wedding-data";

/**
 * Get the wedding data from JSON file
 * @returns WeddingData object with all wedding information
 */
export function getWeddingData(): WeddingData {
  return weddingDataConfig;
}

/**
 * Get couple information
 * @returns Couple data with bride and groom details
 */
export function getCoupleData() {
  const data = getWeddingData();
  return data.couple;
}

/**
 * Get event information (akad and resepsi)
 * @returns Events data with akad and resepsi details
 */
export function getEventsData() {
  const data = getWeddingData();
  return data.events;
}

/**
 * Get countdown target information
 * @returns Countdown configuration for timer
 */
export function getCountdownData() {
  const data = getWeddingData();
  return data.countdown;
}

/**
 * Get gallery photos
 * @returns Array of photo objects
 */
export function getGalleryData() {
  const data = getWeddingData();
  return data.gallery;
}

/**
 * Get Quran verse information
 * @returns Quran verse with Arabic text, translation, and source
 */
export function getQuranVerseData() {
  const data = getWeddingData();
  return data.quranVerse;
}

/**
 * Get music configuration
 * @returns Music file source and title
 */
export function getMusicData() {
  const data = getWeddingData();
  return data.music;
}

/**
 * Get contact information
 * @returns Contact details including WhatsApp numbers
 */
export function getContactData() {
  const data = getWeddingData();
  return data.contact;
}

/**
 * Get theme configuration
 * @returns Theme colors and styling configuration
 */
export function getThemeData() {
  const data = getWeddingData();
  return data.theme;
}

/**
 * Format date for display (DD • MM • YYYY)
 */
export function formatHeaderDate() {
  const data = getEventsData();
  const date = new Date(data.akad.date);
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
