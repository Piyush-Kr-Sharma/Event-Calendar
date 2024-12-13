import { format, isSameMonth, isToday } from "date-fns";
import { Modal } from "../Modal/Modal";
import EventDetails from "@/pages/EventDetails";
import { useState } from "react";
import useEventManager from "@/hooks/useEventManager";
import SidePanel from "../Modal/SidePanel";

const SingleDayGrid = ({ date, currentMonth, selectedDate, onClick }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { events, addEvent } = useEventManager();
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const isCurrentMonth = isSameMonth(
    date,
    new Date(new Date().getFullYear(), currentMonth)
  );
  const isCurrentDay = isToday(date);
  const isSelectedDay = selectedDate && date === selectedDate; // // Compare with selected date

  const closePanel = () => setIsPanelOpen(false);
  const closeModal = () => setIsModalOpen(false);
  const handleSave = (event) => {
    const dateKey = selectedDate; // Format to "2024-12-13"
    addEvent(dateKey, event);
  };
  const eventsForSelectedDate = events[selectedDate] || [];
  // console.log("Event for selected date:", eventsForSelectedDate);
  const firstEvent = eventsForSelectedDate[0];
  // console.log("First event:", firstEvent);

  const dateObj = new Date(date);
  const isWeekend = dateObj.getDay() === 0 || dateObj.getDay() === 6;

  return (
    <div
      className={`p-2 text-center rounded h-20 cursor-pointer ${
        isCurrentMonth ? "bg-white" : "bg-gray-100"
      } ${isCurrentDay ? "border border-blue-500 bg-cyan-100" : ""} ${
        isSelectedDay ? "border-2 border-blue-500" : ""
      } ${isWeekend ? "bg-green-200" : ""}`}
      onClick={onClick}
    >
      <span
        className="block text-lg font-medium"
        onClick={() => setIsModalOpen(true)}
      >
        {format(date, "d")}
      </span>
      {isSelectedDay && (
        <div
          className={`flex ${
            firstEvent ? "justify-between" : "justify-center"
          }`}
        >
          <div className="flex flex-col">
            {firstEvent && (
              <div>
                <h4 className="text-sm font-semibold">
                  {firstEvent?.name.substr(0, 20)}...
                </h4>
                <p className="text-xs text-gray-500">{`${firstEvent?.start} - ${firstEvent?.end}`}</p>
              </div>
            )}
          </div>
          <button
            className="text-sm border-2 border-green-300 bg-blue-100 h-8"
            onClick={() => setIsPanelOpen(true)}
          >
            {firstEvent ? "View All" : "No Events"}
          </button>
        </div>
      )}

      {isPanelOpen && (
        <SidePanel
          onClose={closePanel}
          isOpen={isPanelOpen}
          events={eventsForSelectedDate}
          date={date}
          selectedDate={selectedDate}
        />
      )}
      {isModalOpen && (
        <Modal
          onClose={closeModal}
          isOpen={isModalOpen}
          title={`Add Event on ${selectedDate || ""}`}
        >
          <EventDetails
            onClose={() => setIsModalOpen(false)}
            onSave={handleSave}
            initialData={{}}
          />
        </Modal>
      )}
    </div>
  );
};

export default SingleDayGrid;
