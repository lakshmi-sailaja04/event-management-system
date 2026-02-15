import { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import EventCard from "../components/Eventcard"

export default function Events() {
  const [events, setEvents] = useState([])
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("")

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BASE_URL}/api/events?search=${search}&category=${category}`)
      .then(res => res.json())
      .then(setEvents)
  }, [search, category])

  return (
    <>
      <Navbar />

      <div className="p-4 md:p-8">
        <h2 className="text-2xl font-bold mb-4">Discover Events</h2>

        <div className="flex flex-col md:flex-row gap-3 mb-6">
          <input placeholder="Search..." className="input" onChange={e=>setSearch(e.target.value)} />

          <select className="input" onChange={e=>setCategory(e.target.value)}>
            <option value="">All</option>
            <option>Tech</option>
            <option>Business</option>
            <option>Music</option>
          </select>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map(e => <EventCard key={e._id} event={e} />)}
        </div>
      </div>
    </>
  )
}
