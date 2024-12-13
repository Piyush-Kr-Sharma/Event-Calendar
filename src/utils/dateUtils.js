import { startOfMonth, endOfMonth, startOfWeek, addDays } from "date-fns";

export function generateCalendarGrid(currentMonth, currentYear) {
  // considering March and 2024
  const firstDayOfMonth = startOfMonth(new Date(currentYear, currentMonth)); // 2024-03-01 (Friday).
  const lastDayOfMonth = endOfMonth(firstDayOfMonth); // 2024-03-31 (Sunday).

  const startDate = startOfWeek(firstDayOfMonth); // 2024-02-25 (Sunday) first day of week containing 1st march
  const endDate = addDays(startOfWeek(lastDayOfMonth), 6); // last day of week containg the last day of month(31st march)

  const grid = [];
  let currentDate = startDate;
  console.log(currentDate);

  while (currentDate <= endDate) {
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const day = String(currentDate.getDate()).padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;
    grid.push(formattedDate);
    currentDate = addDays(currentDate, 1);
  }

  return grid;
}
