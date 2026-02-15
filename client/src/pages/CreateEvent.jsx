import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function CreateEvent() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    organizer: "",
    location: "",
    date: "",
    description: "",
    capacity: "",
    category: "Tech",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Login required");
      return;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/events`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Event Created ✅");
        navigate("/events");
      } else {
        alert(data.msg || "Failed to create");
      }
    } catch (err) {
      alert("Server error");
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-50 p-6 flex justify-center">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg space-y-4"
        >
          <h2 className="text-2xl font-bold text-center">Create Event</h2>

          <input
            name="name"
            placeholder="Event Name"
            className="input"
            onChange={handleChange}
            required
          />

          <input
            name="organizer"
            placeholder="Organizer"
            className="input"
            onChange={handleChange}
            required
          />

          <input
            name="location"
            placeholder="Location"
            className="input"
            onChange={handleChange}
            required
          />

          <input
            type="date"
            name="date"
            className="input"
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Event Description"
            className="input"
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="capacity"
            placeholder="Capacity"
            className="input"
            onChange={handleChange}
            required
          />

          <select name="category" className="input" onChange={handleChange}>
            <option>Tech</option>
            <option>Business</option>
            <option>Music</option>
          </select>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded 
hover:bg-blue-700 hover:scale-105 transition duration-200"
          >
            Create Event
          </button>
        </form>
      </div>
    </>
  );
}
