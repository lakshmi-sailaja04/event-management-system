import { Link } from "react-router-dom";

export default function EventCard({ event }) {
  return (
    <div
      className="bg-white rounded-xl shadow-md p-4 
hover:shadow-xl hover:-translate-y-1 transition duration-300"
    >
      <h3 className="text-lg font-bold">{event.name}</h3>
      <p className="text-gray-500">{event.location}</p>

      <p className="text-sm">📅 {new Date(event.date).toDateString()}</p>

      {event.category && (
        <span className="inline-block mt-2 text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
          {event.category}
        </span>
      )}

      <p className="text-green-600 mt-2">Seats: {event.capacity}</p>


      <Link
        to={`/event/${event._id}`}
        className="block mt-3 bg-blue-600 text-white py-2 text-center rounded hover:bg-blue-700"
      >
        View Details
      </Link>
    </div>
  );
}
