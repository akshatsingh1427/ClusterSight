import { useEffect, useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { getEvents } from "../services/eventService";

dayjs.extend(relativeTime);

function Events() {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");

  const fetchEvents = async () => {
    try {
      const data = await getEvents();
      setEvents(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchEvents();

    const interval = setInterval(fetchEvents, 5000);

    return () => clearInterval(interval);
  }, []);

  const filteredEvents = events.filter((event) =>
    (
      event.reason +
      event.object +
      event.namespace +
      event.message
    )
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>Events</h1>
          <p>{filteredEvents.length} Events Found</p>
        </div>

        <input
          className="search-box"
          placeholder="Search Events..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="table-container">
        <table className="pods-table">
          <thead>
            <tr>
              <th>Type</th>
              <th>Reason</th>
              <th>Object</th>
              <th>Namespace</th>
              <th>Message</th>
              <th>Time</th>
            </tr>
          </thead>

          <tbody>
            {filteredEvents.map((event, index) => (
              <tr key={index}>
                <td>
                  <span
                    className={`status-badge ${
                      event.type === "Normal"
                        ? "running"
                        : "pending"
                    }`}
                  >
                    {event.type === "Normal"
                      ? "🟢 Normal"
                      : "🟡 Warning"}
                  </span>
                </td>

                <td>{event.reason}</td>

                <td>{event.object}</td>

                <td>{event.namespace}</td>

                <td>{event.message}</td>

                <td>{dayjs(event.time).fromNow()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Events;