"use client";

import React, { useState, useEffect } from "react";
import { MONTHS } from "@/utils/calendarEventsData";
import {
  Calendar,
  Plus,
  Edit3,
  Trash2,
  Lock,
  Unlock,
  Check,
  X,
  ExternalLink,
  RefreshCw,
  Search,
  Link as LinkIcon,
  CheckCircle2,
  AlertCircle,
  Clock,
  Sparkles,
} from "lucide-react";

export default function UpcdAdminPage() {
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [authError, setAuthError] = useState("");

  // Data state
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMonthFilter, setSelectedMonthFilter] = useState("ALL");

  // Toast feedback state
  const [toast, setToast] = useState(null);

  // Modal State for Add / Edit
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    month: "JAN",
    date: "",
    color: "#0251c1",
    image: "",
    link: "",
    description: "",
    isClosed: false,
  });

  // Check auth session
  useEffect(() => {
    const savedAuth = sessionStorage.getItem("csi_upcd_auth");
    if (savedAuth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  // Fetch events
  const fetchEvents = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/events");
      const data = await res.json();
      if (data.success && Array.isArray(data.events)) {
        setEvents(data.events);
      }
    } catch (err) {
      showToast("Failed to fetch events from server", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchEvents();
    }
  }, [isAuthenticated]);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (
      passcode.trim() === "Csi@2026" ||
      passcode.trim() === "--csi--" ||
      passcode.trim() === "upcd"
    ) {
      setIsAuthenticated(true);
      sessionStorage.setItem("csi_upcd_auth", "true");
      setAuthError("");
    } else {
      setAuthError("Incorrect Passcode. Please try again.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("csi_upcd_auth");
  };

  // Open modal for Create
  const handleOpenAddModal = () => {
    setEditingEvent(null);
    setFormData({
      id: "",
      name: "",
      month: "JAN",
      date: "",
      color: "#0251c1",
      image: "",
      link: "",
      description: "",
      isClosed: false,
    });
    setIsModalOpen(true);
  };

  // Open modal for Edit
  const handleOpenEditModal = (event) => {
    setEditingEvent(event);
    setFormData({
      id: event.id,
      name: event.name || "",
      month: event.month || "JAN",
      date: event.date || "",
      color: event.color || "#0251c1",
      image: event.image || "",
      link: event.link || "",
      description: event.description || "",
      isClosed: Boolean(event.isClosed),
    });
    setIsModalOpen(true);
  };

  // Quick Toggle Registration Status (isClosed)
  const handleToggleStatus = async (event) => {
    const updatedStatus = !event.isClosed;
    try {
      const res = await fetch("/api/events", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: event.id, isClosed: updatedStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setEvents(data.events);
        showToast(
          `Registration ${updatedStatus ? "Closed" : "Opened"} for ${event.name}`
        );
      } else {
        showToast(data.message || "Failed to update status", "error");
      }
    } catch (err) {
      showToast("Error updating event status", "error");
    }
  };

  // Delete Event
  const handleDeleteEvent = async (event) => {
    if (!window.confirm(`Are you sure you want to delete "${event.name}"?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/events?id=${encodeURIComponent(event.id)}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setEvents(data.events);
        showToast(`Event "${event.name}" deleted`);
      } else {
        showToast(data.message || "Failed to delete event", "error");
      }
    } catch (err) {
      showToast("Error deleting event", "error");
    }
  };

  // Submit Form (Save Add or Edit)
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      showToast("Event title is required", "error");
      return;
    }

    const payload = {
      ...formData,
      month: formData.month.toUpperCase(),
      link: formData.link.trim() ? formData.link.trim() : null,
    };

    const isEdit = Boolean(editingEvent);
    const method = isEdit ? "PUT" : "POST";

    try {
      const res = await fetch("/api/events", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success) {
        setEvents(data.events);
        setIsModalOpen(false);
        showToast(
          isEdit
            ? `Event "${formData.name}" updated!`
            : `Event "${formData.name}" added!`
        );
      } else {
        showToast(data.message || "Failed to save event", "error");
      }
    } catch (err) {
      showToast("Error saving event details", "error");
    }
  };

  // Filtered list logic
  const filteredEvents = events.filter((e) => {
    const matchesSearch =
      e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (e.description &&
        e.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (e.date && e.date.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesMonth =
      selectedMonthFilter === "ALL" || e.month === selectedMonthFilter;
    return matchesSearch && matchesMonth;
  });

  // Calculate metrics
  const totalEvents = events.length;
  const openEvents = events.filter((e) => !e.isClosed).length;
  const closedEvents = events.filter((e) => e.isClosed).length;

  // Minimalist Login / Lock Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 font-dm-sans">
        <div className="max-w-md w-full bg-white border border-slate-200/80 rounded-2xl p-8 shadow-xs">
          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-slate-100 text-slate-800 rounded-xl flex items-center justify-center mx-auto mb-4 border border-slate-200">
              <Lock className="w-5 h-5" />
            </div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">
              UPCD Admin
            </h1>
            <p className="text-slate-500 text-xs sm:text-sm mt-1">
              CSI TSDC Event Management
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                Admin Passcode
              </label>
              <input
                type="password"
                placeholder="Enter passcode"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 transition"
                autoFocus
              />
              {authError && (
                <p className="text-rose-600 text-xs mt-2 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{authError}</span>
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-medium text-sm transition duration-150 cursor-pointer shadow-xs active:scale-[0.99]"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Minimalist Admin Dashboard (Light Theme)
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-dm-sans pt-20 pb-16 px-4 sm:px-6 lg:px-8">
      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed top-5 right-5 z-50 px-4 py-2.5 rounded-xl shadow-lg border text-xs sm:text-sm font-medium flex items-center gap-2 transition-all ${
            toast.type === "error"
              ? "bg-rose-50 border-rose-200 text-rose-800"
              : "bg-emerald-50 border-emerald-200 text-emerald-800"
          }`}
        >
          {toast.type === "error" ? (
            <AlertCircle className="w-4 h-4 text-rose-600" />
          ) : (
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          )}
          <span>{toast.message}</span>
        </div>
      )}

      <div className="max-w-6xl mx-auto space-y-6">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-slate-200/80 p-6 rounded-2xl shadow-xs">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Dashboard
              </span>
              <span className="text-slate-300">•</span>
              <span className="inline-flex items-center gap-1 text-xs text-emerald-600 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                Connected
              </span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Event Management
            </h1>
            <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
              Control calendar event listings and registration statuses.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={fetchEvents}
              className="p-2.5 bg-slate-100 hover:bg-slate-200/80 text-slate-600 rounded-xl transition cursor-pointer"
              title="Refresh"
            >
              <RefreshCw
                className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
              />
            </button>

            <button
              onClick={handleOpenAddModal}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs sm:text-sm font-medium shadow-xs transition active:scale-[0.98] cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Event</span>
            </button>

            <button
              onClick={handleLogout}
              className="p-2.5 bg-slate-100 hover:bg-rose-50 hover:text-rose-600 text-slate-600 rounded-xl transition cursor-pointer"
              title="Sign Out"
            >
              <Unlock className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Minimalist Stats */}
        <div className="grid grid-cols-3 gap-3 sm:gap-4">
          <div className="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-5 shadow-xs">
            <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-slate-400">
              Total
            </span>
            <p className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
              {totalEvents}
            </p>
          </div>

          <div className="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-5 shadow-xs">
            <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-emerald-600">
              Open
            </span>
            <p className="text-2xl sm:text-3xl font-bold text-emerald-600 mt-1">
              {openEvents}
            </p>
          </div>

          <div className="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-5 shadow-xs">
            <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-slate-500">
              Closed
            </span>
            <p className="text-2xl sm:text-3xl font-bold text-slate-700 mt-1">
              {closedEvents}
            </p>
          </div>
        </div>

        {/* Search & Month Filter */}
        <div className="bg-white border border-slate-200/80 p-3 sm:p-4 rounded-2xl shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3.5 py-2 bg-slate-50 border border-slate-200/80 rounded-xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 transition"
            />
          </div>

          {/* Month Filter Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
            <button
              onClick={() => setSelectedMonthFilter("ALL")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer shrink-0 ${
                selectedMonthFilter === "ALL"
                  ? "bg-slate-900 text-white"
                  : "bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200/60"
              }`}
            >
              ALL
            </button>
            {MONTHS.map((m) => (
              <button
                key={m}
                onClick={() => setSelectedMonthFilter(m)}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer shrink-0 ${
                  selectedMonthFilter === m
                    ? "bg-slate-900 text-white"
                    : "bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200/60"
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        {/* Content Section (Responsive Table on Desktop / Cards on Mobile) */}
        <div className="bg-white border border-slate-200/80 rounded-2xl shadow-xs overflow-hidden">
          {loading ? (
            <div className="p-12 text-center text-slate-400">
              <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-slate-400" />
              <p className="text-sm">Loading events...</p>
            </div>
          ) : filteredEvents.length === 0 ? (
            <div className="p-12 text-center text-slate-400">
              <Calendar className="w-10 h-10 mx-auto mb-2 text-slate-300 stroke-1" />
              <p className="text-sm font-medium text-slate-600">
                No events match your criteria
              </p>
              <p className="text-xs text-slate-400 mt-0.5">
                Try searching for something else or add a new event.
              </p>
            </div>
          ) : (
            <>
              {/* Desktop Table View */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 text-slate-400 text-[11px] font-semibold uppercase tracking-wider bg-slate-50/50">
                      <th className="py-3.5 px-5">Month</th>
                      <th className="py-3.5 px-5">Event</th>
                      <th className="py-3.5 px-5">Date</th>
                      <th className="py-3.5 px-5">Registration</th>
                      <th className="py-3.5 px-5">Status</th>
                      <th className="py-3.5 px-5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm">
                    {filteredEvents.map((evt) => (
                      <tr
                        key={evt.id}
                        className="hover:bg-slate-50/70 transition duration-150"
                      >
                        {/* Month Pill */}
                        <td className="py-3.5 px-5">
                          <span
                            className="inline-block px-2.5 py-1 rounded-md text-[11px] font-bold text-white shadow-xs"
                            style={{ backgroundColor: evt.color || "#0251c1" }}
                          >
                            {evt.month}
                          </span>
                        </td>

                        {/* Title & Description */}
                        <td className="py-3.5 px-5 max-w-xs">
                          <p className="font-semibold text-slate-900 leading-tight">
                            {evt.name}
                          </p>
                          {evt.description && (
                            <p className="text-xs text-slate-500 truncate mt-0.5 max-w-xs">
                              {evt.description}
                            </p>
                          )}
                        </td>

                        {/* Date */}
                        <td className="py-3.5 px-5 text-xs text-slate-600 font-medium whitespace-nowrap">
                          {evt.date || "—"}
                        </td>

                        {/* Link */}
                        <td className="py-3.5 px-5">
                          {evt.link ? (
                            <a
                              href={evt.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-xs text-slate-700 hover:text-slate-900 underline underline-offset-2 max-w-[180px] truncate"
                            >
                              <span className="truncate">{evt.link}</span>
                              <ExternalLink className="w-3 h-3 shrink-0 text-slate-400" />
                            </a>
                          ) : (
                            <span className="text-xs text-slate-400 italic">
                              Coming Soon
                            </span>
                          )}
                        </td>

                        {/* Status Toggle Pill */}
                        <td className="py-3.5 px-5">
                          <button
                            onClick={() => handleToggleStatus(evt)}
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold transition cursor-pointer border ${
                              evt.isClosed
                                ? "bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200/80"
                                : "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
                            }`}
                            title="Click to toggle status"
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                evt.isClosed ? "bg-slate-400" : "bg-emerald-500"
                              }`}
                            />
                            <span>{evt.isClosed ? "Closed" : "Open"}</span>
                          </button>
                        </td>

                        {/* Actions */}
                        <td className="py-3.5 px-5 text-right space-x-1 whitespace-nowrap">
                          <button
                            onClick={() => handleOpenEditModal(evt)}
                            className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition cursor-pointer"
                            title="Edit"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteEvent(evt)}
                            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition cursor-pointer"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card List View */}
              <div className="md:hidden divide-y divide-slate-100">
                {filteredEvents.map((evt) => (
                  <div key={evt.id} className="p-4 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span
                          className="px-2 py-0.5 rounded text-[10px] font-bold text-white"
                          style={{ backgroundColor: evt.color || "#0251c1" }}
                        >
                          {evt.month}
                        </span>
                        <h3 className="font-semibold text-slate-900 text-sm leading-snug">
                          {evt.name}
                        </h3>
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleOpenEditModal(evt)}
                          className="p-1 text-slate-500 hover:bg-slate-100 rounded"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteEvent(evt)}
                          className="p-1 text-rose-500 hover:bg-rose-50 rounded"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>{evt.date || "Date TBA"}</span>
                      </div>

                      <button
                        onClick={() => handleToggleStatus(evt)}
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium border ${
                          evt.isClosed
                            ? "bg-slate-100 text-slate-600 border-slate-200"
                            : "bg-emerald-50 text-emerald-700 border-emerald-200"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            evt.isClosed ? "bg-slate-400" : "bg-emerald-500"
                          }`}
                        />
                        <span>{evt.isClosed ? "Closed" : "Open"}</span>
                      </button>
                    </div>

                    {evt.link && (
                      <div className="text-xs text-slate-600 pt-1 flex items-center gap-1 truncate">
                        <LinkIcon className="w-3 h-3 text-slate-400 shrink-0" />
                        <a
                          href={evt.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="truncate underline text-slate-700"
                        >
                          {evt.link}
                        </a>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Minimalist Add / Edit Modal (Compact & Responsive) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-xl w-full shadow-2xl max-h-[90vh] flex flex-col overflow-hidden">
            {/* Modal Header */}
            <div className="shrink-0 px-5 sm:px-6 py-3.5 border-b border-slate-100 flex items-center justify-between bg-white">
              <div>
                <h2 className="text-base sm:text-lg font-bold text-slate-900">
                  {editingEvent ? "Edit Event" : "New Event"}
                </h2>
                <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">
                  {editingEvent
                    ? "Update calendar event specifications."
                    : "Fill in event details to add to calendar."}
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable Form Body */}
            <form
              id="event-form"
              onSubmit={handleFormSubmit}
              className="flex-1 overflow-y-auto px-5 sm:px-6 py-3.5 space-y-3 text-xs"
            >
              {/* Row 1: Title & Month */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block font-semibold text-slate-700 mb-1">
                    Event Title *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. HackVision 3.0"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs sm:text-sm focus:bg-white focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 focus:outline-none transition"
                    required
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Month *
                  </label>
                  <select
                    value={formData.month}
                    onChange={(e) =>
                      setFormData({ ...formData, month: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs sm:text-sm focus:bg-white focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 focus:outline-none transition"
                  >
                    {MONTHS.map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Row 2: Display Date & Color */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Display Date String
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 22–23 Jan 2026"
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs sm:text-sm focus:bg-white focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 focus:outline-none transition"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Accent Color
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={formData.color}
                      onChange={(e) =>
                        setFormData({ ...formData, color: e.target.value })
                      }
                      className="w-9 h-9 rounded-lg border border-slate-200 cursor-pointer p-0.5 bg-white shrink-0"
                    />
                    <input
                      type="text"
                      value={formData.color}
                      onChange={(e) =>
                        setFormData({ ...formData, color: e.target.value })
                      }
                      className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:bg-white focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Row 3: Registration Link & Image Path */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Registration Link
                  </label>
                  <input
                    type="url"
                    placeholder="Leave blank for 'Coming Soon'"
                    value={formData.link}
                    onChange={(e) =>
                      setFormData({ ...formData, link: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs sm:text-sm focus:bg-white focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 focus:outline-none transition"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Banner / Image Path
                  </label>
                  <input
                    type="text"
                    placeholder="/assets/... or Cloudinary URL"
                    value={formData.image}
                    onChange={(e) =>
                      setFormData({ ...formData, image: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs sm:text-sm focus:bg-white focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 focus:outline-none transition"
                  />
                </div>
              </div>

              {/* Row 4: Description */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Description
                </label>
                <textarea
                  rows="2"
                  placeholder="Brief event description for detail popup..."
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs sm:text-sm focus:bg-white focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 focus:outline-none resize-none transition"
                ></textarea>
              </div>

              {/* Row 5: Registration Status */}
              <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl border border-slate-200/80">
                <div>
                  <span className="block font-semibold text-slate-800">
                    Registration Status
                  </span>
                  <span className="text-[11px] text-slate-500">
                    {formData.isClosed
                      ? "Marked as Registration Closed"
                      : "Marked as Registration Open"}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setFormData({ ...formData, isClosed: !formData.isClosed })
                  }
                  className={`px-3 py-1 rounded-full text-xs font-semibold border transition cursor-pointer ${
                    formData.isClosed
                      ? "bg-slate-200/80 text-slate-700 border-slate-300"
                      : "bg-emerald-100 text-emerald-800 border-emerald-200"
                  }`}
                >
                  {formData.isClosed ? "Closed" : "Open"}
                </button>
              </div>
            </form>

            {/* Modal Sticky Footer */}
            <div className="shrink-0 px-5 sm:px-6 py-3 border-t border-slate-100 bg-slate-50/80 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                form="event-form"
                className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs sm:text-sm font-medium shadow-xs transition cursor-pointer active:scale-[0.98]"
              >
                {editingEvent ? "Save Changes" : "Create Event"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
