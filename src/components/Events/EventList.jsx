import { Button } from "@/components/ui/button"; // Import button from ShadCN
import { Edit, Trash } from "lucide-react"; // Icons from lucide-react for edit and delete

const EventList = ({ selectedDate, events, onEdit, onDelete }) => {
  const isFiltered = Array.isArray(events);
  const eventsToRender = isFiltered ? events : events[selectedDate] || [];

  return (
    <div className="flex flex-col items-center">
      {/* <h3 className="text-lg font-bold mb-4">{`Events of ${selectedDate}`}</h3> */}
      <ul className="w-full max-w-md space-y-4">
        {eventsToRender.map((event, index) => (
          <li
            key={index}
            className="flex items-center justify-between p-4 bg-gray-100 rounded-lg shadow-md"
          >
            <div>
              <h4 className="text-sm font-semibold">{event.name}</h4>
              <p className="text-xs text-gray-500">{`${event.start} - ${event.end}`}</p>
              <p className="text-xs text-gray-600">{event.description}</p>
            </div>
            <div className="flex space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onEdit(index)}
                aria-label="Edit event"
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onDelete(index)}
                aria-label="Delete event"
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventList;
