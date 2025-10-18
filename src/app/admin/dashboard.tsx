"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  CalendarDays,
  Image as ImageIcon,
  Mail,
  BarChart3,
  User,
  LogOut,
  Menu,
  X,
} from "lucide-react";

// import your subpages
import EventsPage from "./sections/EventsPage";
import GalleryPage from "./sections/GalleryPage";
import SendMailPage from "./sections/SendMailPage";
import AnalyticsPage from "./sections/AnalyticsPage";
import ProfilePage from "./sections/ProfilePage";
import LogoutPage from "./sections/LogoutPage";

export default function DashboardClient({ session }: { session: any }) {
  const [active, setActive] = useState("Events");
  const [isOpen, setIsOpen] = useState(true);

  const menuItems = [
    { name: "Events", icon: <CalendarDays size={20} /> },
    { name: "Gallery", icon: <ImageIcon size={20} /> },
    { name: "Send Mail", icon: <Mail size={20} /> },
    { name: "Analytics", icon: <BarChart3 size={20} /> },
    { name: "Profile", icon: <User size={20} /> },
    { name: "Logout", icon: <LogOut size={20} /> },
  ];

  const renderContent = () => {
    switch (active) {
      case "Events":
        return <EventsPage />;
      case "Gallery":
        return <GalleryPage />;
      case "Send Mail":
        return <SendMailPage />;
      case "Analytics":
        return <AnalyticsPage />;
      case "Profile":
        return <ProfilePage />;
      case "Logout":
        return <LogoutPage />;
      default:
        return null;
    }
  };

  return (
    <main className="flex flex-col md:flex-row min-h-screen bg-gray-100 text-gray-900">
      {/* Sidebar */}
      <motion.aside
        animate={{ width: isOpen ? 240 : 80 }}
        transition={{ duration: 0.3 }}
        className="hidden md:flex bg-white border-r border-gray-200 shadow-sm p-4 flex-col items-center"
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="self-end mb-6 text-gray-500 hover:text-gray-800 transition"
        >
          {isOpen ? <X /> : <Menu />}
        </button>

        <div className="flex flex-col gap-2 w-full">
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => setActive(item.name)}
              className={`flex items-center gap-3 w-full px-3 py-2 rounded-md transition-all ${
                active === item.name
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <span>{item.icon}</span>
              {isOpen && (
                <span className="text-sm font-medium">{item.name}</span>
              )}
            </button>
          ))}
        </div>
      </motion.aside>

      {/* Main Content */}
      <section className="flex-1 overflow-y-auto h-full w-full bg-white">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full h-full"
        >
          {renderContent()}
        </motion.div>
      </section>

      {/* Mobile Bottom Navbar */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg md:hidden flex justify-around items-center py-3">
        {menuItems.map((item) => (
          <button
            key={item.name}
            onClick={() => setActive(item.name)}
            className={`flex flex-col items-center text-xs transition-all ${
              active === item.name
                ? "text-blue-600"
                : "text-gray-500 hover:text-blue-500"
            }`}
          >
            <div className="p-1">{item.icon}</div>
            <span className="text-[10px] mt-1">{item.name.split(" ")[0]}</span>
          </button>
        ))}
      </nav>
    </main>
  );
}
