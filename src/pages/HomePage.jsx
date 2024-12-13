import { useState } from "react";
import Calendar from "./Calendar";

const HomePage = () => {
  // Format the date
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const day = String(currentDate.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;

  const [selectedDate, setSelectedDate] = useState(formattedDate);

  return (
    <div className="flex flex-col my-2">
      <Calendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
    </div>
  );
};

export default HomePage;
