import { useEffect, useState } from "react";

const useEventManager = () => {
  const [events, setEvents] = useState({}); // array of events of a particular day

  // Load events from localstorage on initial render
  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem("events")) || {};
    console.log("Loaded events:", storedEvents);
    setEvents(storedEvents);
  }, []);

  // Save events to localStorage on state update
  useEffect(() => {
    if (Object.keys(events).length > 0) {
      localStorage.setItem("events", JSON.stringify(events));
      console.log("Saved events to localStorage:", events);
    }
  }, [events]);

  // validate an event(overlapping and empty events)
  const validateEvent = (event, eventsDate = [], curInddex = -1) => {
    // eventsDate is an array of other events scheduled for the same date
    // index of the current event in eventsForDate
    if (!event.name || !event.start || !event.end) {
      return false;
    }
    const startTime = new Date(`1970-01-01T${event.start}`); // start and end are in format: HH:mm(hrs and minutes only)
    const endTime = new Date(`1970-01-01T${event.end}`);
    if (startTime >= endTime) {
      return false;
    }

    // Check for overlapping events
    for (let i = 0; i < eventsDate.length; i++) {
      if (i === curInddex) continue; // skip the current event
      const eventStart = new Date(`1970-01-01T${eventsDate[i].start}`);
      const eventEnd = new Date(`1970-01-01T${eventsDate[i].end}`);
      if (startTime < eventEnd && endTime > eventStart) {
        // other event is within the range of current event start and end
        return false;
      }
    }

    return true;
  };

  // Add a new event
  const addEvent = (date, event) => {
    if (!validateEvent(event, events[date])) {
      alert("Invalid or Overlapping Event!!");
      return;
    }

    setEvents((prev) => ({
      ...prev,
      [date]: [...(prev[date] || []), event], // [date]: Dynamically sets the key in the object to the value of date (e.g., "2024-12-12").
      // prev[date]: Accesses the array of events for the given date
      // [...(prev[date] || []), event]: Combines the existing events (if any) with the new event using the spread operator
    }));
  };

  // Edit an Existing Event
  const editEvent = (date, index, updatedEvent) => {
    if (!validateEvent(updatedEvent, events[date], index)) {
      alert("Invalid or overlapping event!");
      return;
    }
    setEvents((prev) => {
      const eventList = [...(prev[date] || [])];
      eventList[index] = updatedEvent;
      return { ...prev, [date]: eventList };
    });
  };

  // Delete an event
  const deleteEvent = (date, index) => {
    setEvents((prev) => {
      const eventList = [...(prev[date] || [])];
      eventList.splice(index, 1);
      return { ...prev, [date]: eventList };
    });
  };

  const moveEvent = (sourceDate, targetDate, index) => {
    const eventToMove = events[sourceDate][index];
    deleteEvent(sourceDate, index);
    addEvent(targetDate, eventToMove);
  };

  return { events, addEvent, editEvent, deleteEvent, moveEvent };
};

export default useEventManager;
