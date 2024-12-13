import { format } from "date-fns";

const MonthNavigation = ({ currentMonth, currentYear, onNext, onPrevious }) => {
  const monthName = format(new Date(currentYear, currentMonth), "MMMM yyyy");

  return (
    <div className="flex items-center justify-center mb-4">
      <button className="px-4 py-2 bg-blue-200 rounded" onClick={onPrevious}>
        Previous
      </button>
      <h2 className="text-xl font-bold px-6">{monthName}</h2>
      <button className="px-4 py-2 bg-blue-200 rounded" onClick={onNext}>
        Next
      </button>
    </div>
  );
};

export default MonthNavigation;
