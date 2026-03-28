import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const incrementDate = (dateString, days = 1) => {
  if (!dateString) return null;

  const date = new Date(dateString);
  date.setDate(date.getDate() + days);

  return date.toISOString().split("T")[0]; // YYYY-MM-DD
};

export const formatDate = (dateString) => {
  if (!dateString) return "";

  const date = new Date(dateString);

  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "short" });
  const year = date.getFullYear().toString().slice(-2);
  const weekday = date.toLocaleString("en-US", { weekday: "short" });

  return `${day} ${month}, ${year} (${weekday})`;
};

export const formatForInput = (dateString) => {
  if (!dateString) return "";

  if (dateString.includes("T")) {
    return new Date(dateString).toISOString().split("T")[0];
  }

  return dateString; // already correct format
};