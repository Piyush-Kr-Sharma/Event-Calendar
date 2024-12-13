import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const EventDetails = ({ onClose, onSave, initialData = {} }) => {
  const [event, setEvent] = useState(initialData);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(event);
    onClose();
  };

  return (
    <div className="p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Event Name */}
        <div>
          <label className="flex float-start text-sm font-medium text-gray-700">
            Event Name
          </label>
          <Input
            type="text"
            placeholder="Event Name"
            value={event.name || ""}
            onChange={(e) => setEvent({ ...event, name: e.target.value })}
          />
        </div>

        {/* Start Time */}
        <div>
          <label className="flex float-start text-sm font-medium text-gray-700">
            Start Time
          </label>
          <Input
            type="time"
            value={event.start || ""}
            onChange={(e) => setEvent({ ...event, start: e.target.value })}
          />
        </div>

        {/* End Time */}
        <div>
          <label className="flex float-start text-sm font-medium text-gray-700">
            End Time
          </label>
          <Input
            type="time"
            value={event.end || ""}
            onChange={(e) => setEvent({ ...event, end: e.target.value })}
          />
        </div>

        {/* Description */}
        <div>
          <label className="flex float-start text-sm font-medium text-gray-700">
            Description
          </label>
          <Textarea
            placeholder="Description"
            value={event.description || ""}
            onChange={(e) =>
              setEvent({ ...event, description: e.target.value })
            }
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-2">
          <Button variant="default" type="submit">
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EventDetails;
