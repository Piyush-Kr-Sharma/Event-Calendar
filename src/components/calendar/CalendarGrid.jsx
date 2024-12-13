import SingleDayGrid from "@/components/calendar/SingleDayGrid";

const CalendarGrid = ({ grid, currentMonth, selectedDate, onDateClick }) => {
  return (
    <div className="grid grid-cols-7 gap-2">
      {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, index) => (
        <div
          key={day}
          className={`text-center font-medium bg-gray-300 h-8 ${
            index === 0 || index === 6 ? "bg-green-300" : "" // Highlight weekends
          }`}
        >
          {day}
        </div>
      ))}
      {grid.map((date, index) => (
        <SingleDayGrid
          key={index}
          date={date}
          currentMonth={currentMonth}
          selectedDate={selectedDate}
          onClick={() => onDateClick(date)}
        />
      ))}
    </div>
  );
};

export default CalendarGrid;
