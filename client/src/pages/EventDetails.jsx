import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

export default function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [registered, setRegistered] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:5000/api/events/${id}`)
      .then(res => res.json())
      .then(setEvent)
      .catch(() => setEvent(null));
  }, [id]);

  const handleRegister = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        `http://localhost:5000/api/registrations/${id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      );

      const data = await res.json();

      if (res.ok) {
        alert("Registered Successfully ✅");
        setRegistered(true);
      } else {
        alert(data.msg || "Error");
      }
    } catch (err) {
      alert("Server error");
    }

    setLoading(false);
  };

  if (!event) return <p className="p-6 text-red-500">Event not found</p>;

  return (
    <>
      <Navbar />

      <div className="p-6 max-w-xl mx-auto bg-white shadow rounded">
        <h2 className="text-3xl font-bold">{event.name}</h2>
        <p className="text-gray-600">{event.organizer}</p>

        <p className="mt-2">📍 {event.location}</p>
        <p>📅 {new Date(event.date).toDateString()}</p>

        <p className="mt-4">{event.description}</p>

        <button
          onClick={handleRegister}
          disabled={registered || loading}
          className={`mt-6 w-full py-2 rounded text-white ${
            registered
              ? "bg-gray-400"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {loading
            ? "Registering..."
            : registered
            ? "Registered"
            : "Register Now"}
        </button>
      </div>
    </>
  );
}
