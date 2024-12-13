import { useState } from "react";
import EventList from "../Events/EventList";
import useEventManager from "@/hooks/useEventManager";
import { Modal } from "./Modal";
import EventDetails from "@/pages/EventDetails";
import { Input } from "../ui/input";
import { AiOutlineSearch } from "react-icons/ai";

const SidePanel = ({ isOpen, onClose, date, selectedDate }) => {
  if (!isOpen) return null;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { events, deleteEvent, editEvent, addEvent } = useEventManager();
  const [editIndex, setEditIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleEdit = (index) => {
    setEditIndex(index);
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);

  const handleSave = (event) => {
    const dateKey = selectedDate; // Format to "2024-12-13"
    if (editIndex !== null) {
      editEvent(dateKey, editIndex, event);
    } else {
      addEvent(dateKey, event);
    }
    setEditIndex(null);
  };

  const eventForDate = events[date] || [];
  // Filter events based on search query
  const filteredEvents = eventForDate.filter(
    (event) =>
      event.name && event.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchClick = () => {
    console.log(`Searching for: ${searchQuery}`);
  };

  return (
    <div className="fixed right-0 top-0 w-96 h-full bg-white shadow-lg p-4 z-50">
      <button
        className="absolute top-4 right-4 text-gray-600"
        onClick={onClose}
      >
        ✖
      </button>
      <h3 className="text-xl font-bold mb-4">
        {`Events on ${new Intl.DateTimeFormat("en-US", {
          dateStyle: "long",
        }).format(new Date(date))}`}
      </h3>

      {/* Search Bar */}
      <div className="relative mb-4">
        <Input
          type="text"
          placeholder="Search events..."
          className="w-full pr-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-600"
          onClick={handleSearchClick}
        >
          <AiOutlineSearch size={20} />
        </button>
      </div>
      <EventList
        selectedDate={selectedDate}
        events={searchQuery.length === 0 ? events : filteredEvents}
        onEdit={handleEdit}
        onDelete={(index) => deleteEvent(selectedDate, index)}
      />
      {isModalOpen && (
        <Modal
          onClose={closeModal}
          isOpen={isModalOpen}
          title={
            editIndex !== null
              ? `Edit Event for ${selectedDate || ""}`
              : `Add Event on ${selectedDate || ""}`
          }
        >
          <EventDetails
            onClose={() => setIsModalOpen(false)}
            onSave={handleSave}
            initialData={
              editIndex !== null ? events[selectedDate][editIndex] : {}
            }
          />
        </Modal>
      )}
    </div>
  );
};

export default SidePanel;
