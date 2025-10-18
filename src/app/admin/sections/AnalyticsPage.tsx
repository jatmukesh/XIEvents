"use client";

import { motion } from "framer-motion";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
} from "recharts";
import { Users, Trophy, CalendarDays, Activity } from "lucide-react";

export default function AnalyticsPage() {
  // Dummy data
  const participantStats = [
    { title: "Total Participants", value: 824, icon: <Users size={22} />, color: "from-blue-500 to-indigo-600" },
    { title: "Total Events", value: 47, icon: <CalendarDays size={22} />, color: "from-green-500 to-emerald-600" },
    { title: "Total Winners", value: 156, icon: <Trophy size={22} />, color: "from-yellow-500 to-amber-600" },
    { title: "Active Departments", value: 8, icon: <Activity size={22} />, color: "from-pink-500 to-rose-600" },
  ];

  const participantsPerEvent = [
    { event: "Spandan", participants: 320 },
    { event: "Transmission", participants: 290 },
    { event: "Sparx", participants: 214 },
  ];

  const eventDistribution = [
    { name: "Cultural", value: 15 },
    { name: "Technical", value: 20 },
    { name: "Sports", value: 12 },
  ];
  const COLORS = ["#3b82f6", "#22c55e", "#f59e0b"];

  const deptWinnings = [
    { dept: "IT", wins: 18 },
    { dept: "CS", wins: 22 },
    { dept: "EXTC", wins: 14 },
    { dept: "MECH", wins: 9 },
    { dept: "CIVIL", wins: 11 },
  ];

  const classPerformance = [
    { class: "FE", score: 120 },
    { class: "SE", score: 170 },
    { class: "TE", score: 150 },
    { class: "BE", score: 190 },
  ];

  return (
    <main className="relative w-full h-screen flex flex-col bg-gray-50 text-gray-900 overflow-hidden">
      {/* Sticky Header */}
      <motion.header
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="sticky top-0 z-50 bg-gray-50 border-b border-gray-200 px-4 md:px-8 py-4 shadow-sm flex items-center justify-between"
      >
        <h1 className="text-2xl md:text-3xl font-bold text-blue-600">
          Analytics Dashboard
        </h1>
      </motion.header>

      {/* Scrollable Content */}
      <section className="flex-1 overflow-y-auto px-4 md:px-8 py-6 space-y-8">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {participantStats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`p-5 bg-gradient-to-br ${stat.color} rounded-xl text-white shadow-lg flex items-center justify-between`}
            >
              <div>
                <p className="text-sm opacity-80">{stat.title}</p>
                <h2 className="text-2xl font-bold">{stat.value}</h2>
              </div>
              <div className="opacity-90">{stat.icon}</div>
            </motion.div>
          ))}
        </div>

        {/* Row 1: Bar + Pie */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Bar Chart: Participants per Event */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white p-4 md:p-6 rounded-xl shadow-md border border-gray-100"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Participants Distribution (By Fest)
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={participantsPerEvent}>
                <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                <XAxis dataKey="event" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="participants" fill="#3b82f6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Pie Chart: Event Type Distribution */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white p-4 md:p-6 rounded-xl shadow-md border border-gray-100 flex flex-col items-center"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-3 text-center">
              Event Type Breakdown
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={eventDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {eventDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Row 2: Department and Class Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-8">
          {/* Department Wise Winnings */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white p-4 md:p-6 rounded-xl shadow-md border border-gray-100"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Department Wise Winnings
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={deptWinnings}>
                <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                <XAxis dataKey="dept" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="wins" fill="#22c55e" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Class Wise Performance (Line Chart) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white p-4 md:p-6 rounded-xl shadow-md border border-gray-100"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Class Wise Winnings
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={classPerformance}>
                <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                <XAxis dataKey="class" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="score" stroke="#f59e0b" strokeWidth={3} dot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
