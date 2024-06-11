import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function classnames(props) {
  const classes = [];

  for (const [key, value] of Object.entries(props)) {
    if (value) classes.push(key);
  }

  return classes.join(" ");
}
