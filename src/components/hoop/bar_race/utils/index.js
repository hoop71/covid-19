import { format, parseISO } from "date-fns"

// Consts
const fiveDaysInMillisecons = 4.32e8

// Helpers
export const fiveDaysAgo = new Date(new Date() - fiveDaysInMillisecons)

export const parseHumanDate = currentDisplay =>
  format(parseISO(currentDisplay.date), "iiii, MMMM do, yyyy")

export const getNTYShortDate = dateToFormat =>
  format(parseISO(dateToFormat), "yyyy-MM-dd")
