import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

interface CalendarEvent {
  title: string;
  startDate: string; // Format: YYYYMMDDTHHMMSS
  endDate: string;   // Format: YYYYMMDDTHHMMSS
  location: string;
  description?: string;
}

export function generateGoogleCalendarUrl(event: CalendarEvent): string {
  const baseUrl = 'https://calendar.google.com/calendar/render';
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: event.title,
    dates: `${event.startDate}/${event.endDate}`,
    location: event.location,
    details: event.description || '',
  });
  
  return `${baseUrl}?${params.toString()}`;
}
