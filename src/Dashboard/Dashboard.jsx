import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Calendar, Clock, MapPin, DollarSign, Edit2, Trash2, User, LogOut, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card.tsx";
import { Alert, AlertDescription } from "../components/ui/alert.tsx";
import { Button } from "../components/ui/button.tsx";
const Dashboard = () => {
  const [userData, setUserData] = useState({});
  const [userEvents, setUserEvents] = useState([]);
  const [scheduledEvents, setScheduledEvents] = useState([]);
  const [showUserProfileModal, setShowUserProfileModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [editedFields, setEditedFields] = useState({});
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const token = localStorage.getItem("token");

  // Keeping your existing fetch functions and handlers
  const fetchUserData = async (token) => {
    try {
      const response = await fetch("https://event-booking-backend-ivh3.onrender.com/user", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        setUserData(data);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  const handleSaveClick = async () => {
    try {
      const response = await fetch(
        `https://event-booking-backend-ivh3.onrender.com/event/${editingEvent._id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editedFields),
        }
      );

      if (response.ok) {
        // Handle successful save
        setEditingEvent(null);
        setEditedFields({});
        window.location.reload();
      } else {
        console.error("Failed to save event.");
      }
    } catch (error) {
      console.error("Error during event save:", error);
    }
  };


  const fetchUserEvents = async (token) => {
    try {
      const response = await fetch("https://event-booking-backend-ivh3.onrender.com/event", {
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        setUserEvents(data.userEvents);
      }
    } catch (error) {
      console.error("Error fetching user events:", error);
    }
  };

  const fetchScheduledEvents = async (token) => {
    try {
      const response = await fetch("https://event-booking-backend-ivh3.onrender.com/ticket/user", {
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        setScheduledEvents(data.userTickets);
      }
    } catch (error) {
      console.error("Error fetching scheduled events:", error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchUserData(token);
      fetchUserEvents(token);
      fetchScheduledEvents(token);
    }
  }, [token]);

  const handleEditClick = (event) => {
    setEditingEvent(event);
    setEditedFields({
      title: event.title,
      description: event.description,
      date: event.date,
      venue: event.venue,
    });
  };

  const handleFieldChange = (field, value) => {
    setEditedFields(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  const handleDeleteClick = async (eventId) => {
    try {
      const response = await fetch(`https://event-booking-backend-ivh3.onrender.com/event/${eventId}`, {
        method: "DELETE",
        headers: {
          Authorization: `${token}`,
        },
      });

      if (response.ok) {
        setUserEvents((prevUserEvents) =>
          prevUserEvents.filter((event) => event.id !== eventId)
        );

        window.location.reload();
      } else {
        console.error("Failed to delete event.");
      }
    } catch (error) {
      console.error("Error during event deletion:", error);
    }
  };

  const handleCancelEventClick = async (eventId) => {
    try {
      const response = await fetch(`https://event-booking-backend-ivh3.onrender.com/ticket/${eventId}`, {
        method: "DELETE",
        headers: {
          Authorization: `${token}`,
        },
      });

      if (response.ok) {
        setScheduledEvents((prevScheduledEvents) =>
          prevScheduledEvents.filter((ticket) => ticket.event?.id !== eventId)
        );

        window.location.reload();
      } else {
        console.error("Failed to cancel event.");
      }
    } catch (error) {
      console.error("Error during event cancellation:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Modern Navbar */}
      <nav className="bg-white shadow-sm px-6 py-4 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/dashboard" className="flex items-center space-x-3">
            <div className="h-10 w-10 bg-blue-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">B</span>
            </div>
            <span className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              BookmyEvent
            </span>
          </Link>

          <div className="flex items-center space-x-6">
            <Link to="/events">
              <button className="px-4 py-2 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors duration-200">
                Browse Events
              </button>
            </Link>
            <Link to="/create">
              <button className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200">
                Create Event
              </button>
            </Link>
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center space-x-2 px-3 py-2 rounded-xl hover:bg-slate-50 transition-colors duration-200"
              >
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                  <span className="text-white font-medium">
                    {userData.name?.[0]?.toUpperCase() || 'U'}
                  </span>
                </div>
              </button>

              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-2 border border-slate-200">
                  <button
                    onClick={() => setShowUserProfileModal(true)}
                    className="flex items-center space-x-2 px-4 py-2 w-full text-left hover:bg-slate-50"
                  >
                    <User className="w-4 h-4 text-slate-500" />
                    <span>Profile</span>
                  </button>
                  <button
                    onClick={() => {/* handle logout */ }}
                    className="flex items-center space-x-2 px-4 py-2 w-full text-left text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* My Events Section */}
          <section>
            <h2 className="text-2xl font-semibold text-slate-800 mb-6 flex items-center">
              <Calendar className="w-6 h-6 mr-2 text-blue-600" />
              My Events
            </h2>
            <div className="space-y-6">
              {userEvents.length === 0 ? (
                <Card className="border-dashed">
                  <CardContent className="py-12">
                    <div className="text-center">
                      <Calendar className="w-12 h-12 mx-auto text-slate-400 mb-3" />
                      <p className="text-slate-500">No events created yet</p>
                      <Link to="/create">
                        <button className="mt-4 px-4 py-2 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors">
                          Create Your First Event
                        </button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                userEvents.map((event) => (
                  <EventCard
                    key={event.id}
                    event={event}
                    isEditing={event === editingEvent}
                    editedFields={editedFields}
                    onEdit={handleEditClick}
                    onFieldChange={handleFieldChange}
                    onDelete={() => handleDeleteClick(event._id)}
                    onSave={handleSaveClick}
                    formatDate={formatDate}
                  />
                ))
              )}
            </div>
          </section>

          {/* Scheduled Events Section */}
          <section>
            <h2 className="text-2xl font-semibold text-slate-800 mb-6 flex items-center">
              <Clock className="w-6 h-6 mr-2 text-blue-600" />
              Scheduled Events
            </h2>
            <div className="space-y-6">
              {scheduledEvents.length === 0 ? (
                <Card className="border-dashed">
                  <CardContent className="py-12">
                    <div className="text-center">
                      <Clock className="w-12 h-12 mx-auto text-slate-400 mb-3" />
                      <p className="text-slate-500">No scheduled events</p>
                      <Link to="/events">
                        <button className="mt-4 px-4 py-2 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors">
                          Browse Events
                        </button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                scheduledEvents.map((ticket) => (
                  <ScheduledEventCard
                    key={ticket.event?.id}
                    ticket={ticket}
                    onCancel={() => handleCancelEventClick(ticket._id)}
                    formatDate={formatDate}
                  />
                ))
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

// Helper component for event cards
const EventCard = ({ event, isEditing, editedFields, onEdit, onFieldChange, onDelete, onSave, formatDate }) => {
  if (isEditing) {
    return (
      <Card className="border-slate-200">
        <CardContent className="p-6 space-y-4">
          <input
            className="w-full p-3 border rounded-xl bg-slate-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            value={editedFields.title || ""}
            onChange={(e) => onFieldChange("title", e.target.value)}
            placeholder="Event Title"
          />
          <textarea
            className="w-full p-3 border rounded-xl bg-slate-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            value={editedFields.description || ""}
            onChange={(e) => onFieldChange("description", e.target.value)}
            placeholder="Event Description"
            rows={3}
          />
          <div className="grid grid-cols-2 gap-4">
            <input
              type="date"
              className="p-3 border rounded-xl bg-slate-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              value={editedFields.date || ""}
              onChange={(e) => onFieldChange("date", e.target.value)}
            />
            <input
              className="p-3 border rounded-xl bg-slate-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              value={editedFields.venue || ""}
              onChange={(e) => onFieldChange("venue", e.target.value)}
              placeholder="Venue"
            />
          </div>

          <button onClick={onSave} className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200">
            Save
          </button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-200">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-semibold text-slate-800">
            {event.title || "Untitled Event"}
          </h3>
          <div className="flex space-x-2">
            <button
              onClick={() => onEdit(event)}
              className="p-2 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors"
            >
              <Edit2 className="w-4 h-4" />
            </button>
            <button
              onClick={onDelete}
              className="p-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        <p className="text-slate-600 mb-4">
          {event.description || "No description available"}
        </p>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center text-slate-500 bg-slate-50 p-3 rounded-xl">
            <Calendar className="w-4 h-4 mr-2 text-blue-600" />
            <span>{event.date ? formatDate(event.date) : "Date not set"}</span>
          </div>
          <div className="flex items-center text-slate-500 bg-slate-50 p-3 rounded-xl">
            <MapPin className="w-4 h-4 mr-2 text-blue-600" />
            <span>{event.venue || "Venue not set"}</span>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between bg-blue-50 p-3 rounded-xl">
          <div className="flex items-center text-blue-600">
            <DollarSign className="w-4 h-4 mr-1" />
            <span className="font-medium">{event.price || "0"}</span>
          </div>
          <div className="text-sm text-blue-600">
            {event.ticketAvailable || 0} tickets available
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Helper component for scheduled event cards
const ScheduledEventCard = ({ ticket, onCancel, formatDate }) => (
  <Card className="overflow-hidden hover:shadow-lg transition-all duration-200">
    <CardContent className="p-6">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold text-slate-800">
          {ticket.event?.title || "Untitled Event"}
        </h3>
      </div>

      <p className="text-slate-600 mb-4">
        {ticket.event?.description || "No description available"}
      </p>

      <div className="flex items-center text-slate-500 bg-slate-50 p-3 rounded-xl mb-4">
        <Calendar className="w-4 h-4 mr-2 text-blue-600" />
        <span>
          {ticket.event?.date ? formatDate(ticket.event.date) : "Date not set"}
        </span>
      </div>

      <button
        onClick={onCancel}
        className="w-full px-4 py-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
      >
        Cancel Event
      </button>
    </CardContent>
  </Card>
);

export default Dashboard;
