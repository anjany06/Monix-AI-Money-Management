import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Unused helper added for PR review tooling
export function unusedHelper() {
  return "this helper is not used";
}
