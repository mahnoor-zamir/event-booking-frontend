import React, { useState, useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./Events.css";
import { Link } from "react-router-dom";
import UserProfileModel from "./UserProfileModel";

function Events() {
  const [events, setEvents] = useState([]);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showAlreadyBookedPopup, setShowAlreadyBookedPopup] = useState(false);
  const [showUserProfileModal, setShowUserProfileModal] = useState(false);
  const [user, setUser] = useState();
  const [selectedEvent, setSelectedEvent] = useState(null);
  const mapRef = useRef(null);
  const mapInstance = useRef(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    if (events.length > 0 && mapRef.current && !mapInstance.current) {
      mapInstance.current = L.map(mapRef.current).setView([51.505, -0.09], 13);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapInstance.current);
    }

    if (mapInstance.current) {
      events.forEach((event) => {
        const marker = L.marker([event.latitude, event.longitude]).addTo(mapInstance.current);
        marker.on("click", () => {
          setSelectedEvent(event);
        });
      });
    }
  }, [events]);

  const openUserProfileModal = () => {
    const userData = JSON.parse(localStorage.getItem("user"));
    setUser(userData);
    setShowUserProfileModal(true);
  };

  const closeUserProfileModal = () => {
    setShowUserProfileModal(false);
  };

  function formatDate(dateString) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  const fetchEvents = async () => {
    try {
      const response = await fetch("https://event-booking-backend-ivh3.onrender.com/event/all", {
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setEvents(data);
      } else {
        console.error("Failed to fetch events.");
      }
    } catch (error) {
      console.error("Error during fetchEvents:", error);
    }
  };

  const handleBookEvent = async (eventId) => {
    try {
      const response = await fetch(`https://event-booking-backend-ivh3.onrender.com/ticket/user`, {
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        console.error("Failed to fetch user tickets.");
        return;
      }

      const data = await response.json();
      const userTickets = data.userTickets;

      const isAlreadyBooked = userTickets.some((ticket) => ticket.event._id === eventId);

      if (isAlreadyBooked) {
        setShowAlreadyBookedPopup(true);
      } else {
        const bookResponse = await fetch(`https://event-booking-backend-ivh3.onrender.com/ticket`, {
          method: "POST",
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ eventId }),
        });

        if (bookResponse.ok) {
          setShowSuccessPopup(true);
        } else {
          console.error("Failed to book event.");
        }
      }
    } catch (error) {
      console.error("Error during event booking:", error);
    }
  };

  return (
    <div className="events">
      {/* Navbar */}
      <nav className="navbar">
        {/* Left side */}
        <div className="left">
          <Link to={"/dashboard"}><img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw0NDQ0NDw0ODQ8PDg0NDQ0NDQ8QDQ0NFREYFhURGBUYHSogGBsnGxgWITItMSorMDAuFyszODMtQyotLisBCgoKDg0OGBAQGC0dHyUtKy0tKzAtLS0uLy8tLS0tLS0tLS0tLSsvLS0tLSsrLS0tLS0tLi0vLS8tLSstLS0tK//AABEIAOEA4QMBIgACEQEDEQH/xAAbAAADAAMBAQAAAAAAAAAAAAAAAQIEBQYDB//EAEgQAAICAgECBAIGBQUNCQAAAAECAAMEEQUSIQYTMUFRYRQiMnGBkQczQlKhFSNyc6IlQ1RigoOSlLHBwtLTJjREU1VjZXSj/8QAGQEBAQEBAQEAAAAAAAAAAAAAAAECAwQF/8QAMxEAAgIBAgQDBwIGAwAAAAAAAAECEQMhMRJBUYEEYdETInGRscHwoeEFFDJCYrIkM1L/2gAMAwEAAhEDEQA/APq8cI5AEcI4ARwlQBRwjlAo4RwBRxwgC1DUcNQBahqPUIAopUIBMUqKQCilyYBMUqKATCOKATFKigChHCAOOEYgBHCOAEcJUoFHCOAEI44AoRx6gExxwgChHCATCVqKATCVFAJhHFAJhHFAEZMqKQExSojAFCEIBUcUoQAjhKgBCEcoCOEcAI4RwBRxw1AFHHNL4n8QJgJWq1tk5eQxqwcKs/zmRd/wovqzHsBANzFOf8Mc/Ze9mDm1rjcljqGvpQnyb6j2XJpJ+1WfT4qexnRQ1QJhHqEAmKVFAJilRQCYRxGATFLkyAmKUZMAUI4QBxiIShACVEIxAHHFKlARwEcAI4RwAjhOf5pvMt8k8ucI+oow1x/pJX4sbFdvyVfxhFSb2Og/h858+wOQIpyPEDILsnOt+hcPS50tWIbClK7/AGVYhrnP7o+UzW47kWS6vB51cx/LZTjcjVS7AMCN+ZSFdD39SD901/Pcdfj8XweMydNlNN+M6qQQMr+SchF7jsdtsD5sJpIqi+JRegXZN2fgtlIyNyvEEZNN9SlUzcdk8waX1CXVhlK+zqR7Tu+Nza8rHoya+9d9Vd1fx6HUMP8AbOE/RlW3m2bUkDjMcP8"></img></Link>
        </div>
        {/* Right side */}
        <div className="right">
          <button className="events-button">Events</button>
          <Link to="/create"> <button className="events-button">Create Events</button></Link>
          <button onClick={openUserProfileModal} className="profile-button">My Profile</button>
        </div>
      </nav>

      {/* Map */}
      <div id="map" ref={mapRef} style={{ height: "500px", width: "100%" }}></div>

      {/* Booking window */}
      {selectedEvent && (
        <div className="booking-window">
          <h2>{selectedEvent.title}</h2>
          <p>{selectedEvent.description}</p>
          <p>Date: {formatDate(selectedEvent.date)}</p>
          <p>Venue: {selectedEvent.venue}</p>
          <p>Price: ${selectedEvent.price}</p>
          <button
            className="book-button"
            onClick={() => handleBookEvent(selectedEvent._id)}
          >
            Book
          </button>
          <button onClick={() => setSelectedEvent(null)}>Close</button>
        </div>
      )}

      {/* Success Pop-up */}
      {showSuccessPopup && (
        <div className="popup success-popup">
          <p>Event booked successfully!</p>
          <button onClick={() => setShowSuccessPopup(false)}>Close</button>
        </div>
      )}

      {/* Already Booked Pop-up */}
      {showAlreadyBookedPopup && (
        <div className="popup error-popup">
          <p>Event is already booked!</p>
          <button onClick={() => setShowAlreadyBookedPopup(false)}>Close</button>
        </div>
      )}

      {showUserProfileModal && (
        <UserProfileModel
          user={user}
          onClose={closeUserProfileModal}
        />
      )}
    </div>
  );
}

export default Events;
