import { useEffect, useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { getEvents } from "../../services/eventService";

dayjs.extend(relativeTime);

function EventsWidget() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getEvents();
        setEvents(data.slice(0, 5));
      } catch (err) {
        console.error(err);
      }
    };

    fetchEvents();

    const interval = setInterval(fetchEvents, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="chart-card">
      <h3>Recent Cluster Events</h3>

      <div className="events-widget">
        {events.map((event, index) => (
          <div className="event-row" key={index}>
            <div className="event-header">
              <span
                className={`status-badge ${
                  event.type === "Normal"
                    ? "running"
                    : "pending"
                }`}
              >
                {event.type}
              </span>

              <small>
                {dayjs(event.time).fromNow()}
              </small>
            </div>

            <div className="event-reason">
              {event.reason}
            </div>

            <div className="event-object">
              {event.object}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EventsWidget;