import MonthNavigation from "@/components/calendar/MonthNavigation";
import CalendarGrid from "@/components/calendar/CalendarGrid";
import { generateCalendarGrid } from "@/utils/dateUtils";
import useCalendar from "@/hooks/useCalendar"; // Custom hook for calendar logic

const Calendar = ({ selectedDate, setSelectedDate }) => {
  const { currentMonth, currentYear, handlePreviousMonth, handleNextMonth } =
    useCalendar(); // Using custom hook

  const calendarGrid = generateCalendarGrid(currentMonth, currentYear);

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  // console.log("Selected Date in Calendar:", selectedDate);

  return (
    <div>
      <MonthNavigation
        currentMonth={currentMonth}
        currentYear={currentYear}
        onNext={handleNextMonth}
        onPrevious={handlePreviousMonth}
      />
      <CalendarGrid
        grid={calendarGrid}
        currentMonth={currentMonth}
        onDateClick={handleDateClick}
        selectedDate={selectedDate}
      />
    </div>
  );
};

export default Calendar;
