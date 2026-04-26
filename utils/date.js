import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges Tailwind classes safely
 * (Prevents class conflicts when passing props to components)
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Increments a date by a set number of days
 */
export const incrementDate = (dateString, days = 1) => {
  if (!dateString) return null;

  const date = new Date(dateString);
  
  // Check if the date is actually valid before processing
  if (isNaN(date.getTime())) return null;

  date.setDate(date.getDate() + days);

  return date.toISOString().split("T")[0]; // Returns YYYY-MM-DD
};

/**
 * Formats a date for display (e.g., 16 Apr, 26 (Thu))
 */
export const formatDate = (dateString) => {
  if (!dateString) return "";

  const date = new Date(dateString);
  
  if (isNaN(date.getTime())) return "";

  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "short" });
  const year = date.getFullYear().toString().slice(-2);
  const weekday = date.toLocaleString("en-US", { weekday: "short" });

  return `${day} ${month}, ${year} (${weekday})`;
};

/**
 * Ensures a date string is in YYYY-MM-DD format for HTML inputs
 */
export const formatForInput = (dateString) => {
  if (!dateString) return "";

  // If it's a full ISO string (contains T), strip the time
  if (dateString.includes("T")) {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "";
    return date.toISOString().split("T")[0];
  }

  return dateString; // already correct format
};