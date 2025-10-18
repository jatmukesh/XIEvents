"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Search,
  Eye,
  Edit3,
  Trash2,
  CalendarDays,
  MapPin,
  User,
} from "lucide-react";

interface Event {
  id: number;
  name: string;
  description: string;
  date: string;
  venue: string;
  created_by: { name: string | null };
  fest: { name: string };
}

export default function EventsPage() {
  const [search, setSearch] = useState("");
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetch("/api/events");
        const data = await res.json();

        if (!Array.isArray(data)) {
          console.error("API did not return an array:", data);
          setEvents([]);
        } else {
          setEvents(data);
        }
      } catch (error) {
        console.error("Failed to fetch events:", error);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, []);

  const filteredEvents = events.filter((event) =>
    event.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] text-gray-500">
        Loading events...
      </div>
    );
  }

  if (!events.length) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] text-gray-500">
        No events found.
      </div>
    );
  }

  return (
    <div className="relative flex flex-col w-full h-[calc(100vh-1rem)] bg-white text-gray-900 rounded-lg shadow-md border border-gray-200 overflow-hidden">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="p-4 md:p-6 border-b border-gray-200 bg-gray-50 sticky top-0 z-20 flex flex-col md:flex-row md:items-center md:justify-between gap-3"
      >
        <div className="hidden md:block">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
            Events Management
          </h2>
          <p className="text-gray-500 text-sm">
            Manage, view, and explore all registered events.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search events..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-3 py-2 bg-white border border-gray-300 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </motion.div>

      {/* Desktop Table View */}
      <div className="hidden md:block flex-1 overflow-auto">
        <div className="min-w-full overflow-x-auto">
          <table className="w-full text-sm text-gray-800 border-t border-gray-200">
            <thead className="bg-gray-100 text-gray-700 uppercase text-xs sticky top-0 z-10">
              <tr>
                <th className="px-6 py-3 text-left">Event ID</th>
                <th className="px-6 py-3 text-left">Event Name</th>
                <th className="px-6 py-3 text-left">Type</th>
                <th className="px-6 py-3 text-left">Date</th>
                <th className="px-6 py-3 text-left">Venue</th>
                <th className="px-6 py-3 text-left">Created By</th>
                <th className="px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredEvents.map((event) => (
                <tr
                  key={event.id}
                  className="border-b border-gray-200 hover:bg-gray-50 transition-transform duration-150 ease-in-out hover:scale-[1.01]"
                >
                  <td className="px-6 py-4">{event.id}</td>
                  <td className="px-6 py-4 font-medium">{event.name}</td>
                  <td className="px-6 py-4">
                    {new Date(event.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">{event.venue}</td>
                  <td className="px-6 py-4">
                    {event.created_by.name || "Unknown"}
                  </td>
                  <td className="px-6 py-4 text-center flex items-center justify-center gap-3 flex-wrap">
                    <Link
                      href={`/admin/events/${event.id}`}
                      className="p-2 rounded-full hover:bg-blue-100 transition-colors"
                      title="View Details"
                    >
                      <Eye className="text-blue-600" size={18} />
                    </Link>
                    <button
                      onClick={() => alert(`Update Event ${event.id}`)}
                      className="p-2 rounded-full hover:bg-yellow-100 transition-colors"
                      title="Edit Event"
                    >
                      <Edit3 className="text-yellow-600" size={18} />
                    </button>
                    <button
                      onClick={() => alert(`Delete Event ${event.id}`)}
                      className="p-2 rounded-full hover:bg-red-100 transition-colors"
                      title="Delete Event"
                    >
                      <Trash2 className="text-red-600" size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="block md:hidden flex-1 overflow-y-auto p-4 space-y-4">
        {filteredEvents.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="border border-gray-200 rounded-lg p-4 bg-gray-50 shadow-sm hover:shadow-md transition-transform transform hover:scale-[1.02]"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold text-lg text-gray-800">
                {event.name}
              </h3>
              <span className="text-xs text-gray-500">#{event.id}</span>
            </div>

            <div className="flex flex-col gap-1 text-sm text-gray-600 mb-3">
              <div className="flex items-center gap-2">
                <CalendarDays size={15} className="text-blue-500" />
                <span>{new Date(event.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={15} className="text-green-500" />
                <span>{event.venue}</span>
              </div>
              <div className="flex items-center gap-2">
                <User size={15} className="text-purple-500" />
                <span>{event.created_by.name || "Unknown"}</span>
              </div>
            </div>

            <p className="text-gray-500 text-sm mb-3 line-clamp-2">
              {event.description}
            </p>

            <div className="flex justify-end gap-3">
              <Link
                href={`/admin/events/${event.id}`}
                className="p-2 rounded-full hover:bg-blue-100 transition-colors"
                title="View"
              >
                <Eye className="text-blue-600" size={18} />
              </Link>
              <button
                onClick={() => alert(`Update Event ${event.id}`)}
                className="p-2 rounded-full hover:bg-yellow-100 transition-colors"
                title="Edit"
              >
                <Edit3 className="text-yellow-600" size={18} />
              </button>
              <button
                onClick={() => alert(`Delete Event ${event.id}`)}
                className="p-2 rounded-full hover:bg-red-100 transition-colors"
                title="Delete"
              >
                <Trash2 className="text-red-600" size={18} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
