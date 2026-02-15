import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch("http://localhost:5000/api/registrations/my/events", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => setEvents(Array.isArray(data) ? data : []))
      .catch(() => setEvents([]));
  }, []);

  const today = new Date();

  const upcoming = events.filter(
    e => e.eventId && new Date(e.eventId.date) > today
  );

  const past = events.filter(
    e => e.eventId && new Date(e.eventId.date) <= today
  );

  const Card = ({ e }) => (
    <div className="bg-white shadow-md rounded-xl p-4 
hover:shadow-xl hover:-translate-y-1 transition duration-300">
      <div className="space-y-2">
        <p className="font-bold text-lg">{e.eventId.name}</p>
        <p className="text-gray-500">{e.eventId.location}</p>
        <p className="text-sm text-gray-400">
          📅 {new Date(e.eventId.date).toDateString()}
        </p>
      </div>
    </div>
  );

  return (
    <>
      <Navbar />

      <div className="p-6 max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">
          My Registered Events
        </h2>

        <h3 className="font-semibold text-green-600 mb-3">
          Upcoming
        </h3>
        {upcoming.length === 0 ? (
          <p className="text-gray-400 mb-6">No upcoming events</p>
        ) : (
          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            {upcoming.map(e => (
              <Card key={e._id} e={e} />
            ))}
          </div>
        )}

        <h3 className="font-semibold text-gray-600 mb-3">
          Past
        </h3>
        {past.length === 0 ? (
          <p className="text-gray-400">No past events</p>
        ) : (
          <div className="grid sm:grid-cols-2 gap-4">
            {past.map(e => (
              <Card key={e._id} e={e} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
