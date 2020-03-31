import { addDays, format, parseISO, subDays } from "date-fns"

// Helpers
export const getFiveDaysAgo = () => subDays(new Date(), 5)

export const parseHumanDate = currentDisplay =>
  format(parseISO(currentDisplay.date), "iii, MMMM do, yyyy")

export const getNYTShortDate = dateToFormat =>
  format(addDays(parseISO(dateToFormat), 1), "yyyy-MM-dd")
