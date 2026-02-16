import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="bg-blue-600 text-white px-4 md:px-8 py-4 flex flex-col md:flex-row justify-between items-center gap-3">
      <h1 className="font-bold text-xl">Event Management Application</h1>

      <div className="flex flex-wrap gap-3">
        <Link
          to="/events"
          className="px-3 py-1 rounded-md hover:bg-blue-500 transition"
        >
          Events
        </Link>

        <Link
          to="/create"
          className="px-3 py-1 rounded-md hover:bg-blue-500 transition"
        >
          Create Event
        </Link>

        <Link
          to="/dashboard"
          className="px-3 py-1 rounded-md hover:bg-blue-500 transition"
        >
          Dashboard
        </Link>

        <button onClick={logout} className="bg-red-500 px-3 py-1 rounded">
          Logout
        </button>
      </div>
    </div>
  );
}
