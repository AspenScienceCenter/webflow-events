import { useEffect, useState } from "react";

type EventItem = {
  id: string;
  fieldData: {
    name: string;
    date: string;
    time: string;
    venue: string;
    address: string;
    community: string;
  };
};

export default function App() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetch("/api/events");
        const data = await res.json();

        console.log("API DATA:", data);

        setEvents(data.items || []);
      } catch (err) {
        console.error("Error fetching events:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, []);

  if (loading) {
    return <div style={{ padding: 20 }}>Loading events...</div>;
  }

  return (
    <div style={{ padding: 20 }}>
      <h1 style={{ fontSize: 24, marginBottom: 20 }}>Events</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: 16,
        }}
      >
        {events.map((event) => (
          <div
            key={event.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: 12,
              padding: 16,
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            }}
          >
            <h2 style={{ fontSize: 18, marginBottom: 8 }}>
              {event.fieldData.name}
            </h2>

            <p><strong>Date:</strong> {event.fieldData.date}</p>
            <p><strong>Time:</strong> {event.fieldData.time}</p>
            <p><strong>Venue:</strong> {event.fieldData.venue}</p>
            <p><strong>Address:</strong> {event.fieldData.address}</p>
            <p><strong>Community:</strong> {event.fieldData.community}</p>
          </div>
        ))}
      </div>
    </div>
  );
}