// import React, { useState, useEffect, useRef } from "react";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";
// import "./Events.css";
// import { Link } from "react-router-dom";
// import UserProfileModel from "./UserProfileModel";

// function Events() {
//   const [events, setEvents] = useState([]);
//   const [showSuccessPopup, setShowSuccessPopup] = useState(false);
//   const [showAlreadyBookedPopup, setShowAlreadyBookedPopup] = useState(false);
//   const [showUserProfileModal, setShowUserProfileModal] = useState(false);
//   const [user, setUser] = useState();
//   const [selectedEvent, setSelectedEvent] = useState(null);
//   const mapRef = useRef(null);
//   const mapInstance = useRef(null);

//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     fetchEvents();
//   }, []);

//   useEffect(() => {
//     if (events.length > 0 && mapRef.current && !mapInstance.current) {
//       mapInstance.current = L.map(mapRef.current).setView([51.505, -0.09], 13);

//       L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
//         attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
//       }).addTo(mapInstance.current);
//     }

//     if (mapInstance.current) {
//       events.forEach((event) => {
//         const marker = L.marker([event.latitude, event.longitude]).addTo(mapInstance.current);
//         marker.on("click", () => {
//           setSelectedEvent(event);
//         });
//       });
//     }
//   }, [events]);

//   const openUserProfileModal = () => {
//     const userData = JSON.parse(localStorage.getItem("user"));
//     setUser(userData);
//     setShowUserProfileModal(true);
//   };

//   const closeUserProfileModal = () => {
//     setShowUserProfileModal(false);
//   };

//   function formatDate(dateString) {
//     const options = { year: "numeric", month: "long", day: "numeric" };
//     return new Date(dateString).toLocaleDateString(undefined, options);
//   }

//   const fetchEvents = async () => {
//     try {
//       const response = await fetch("https://event-booking-backend-ivh3.onrender.com/event/all", {
//         headers: {
//           Authorization: `${token}`,
//           "Content-Type": "application/json",
//         },
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setEvents(data);
//       } else {
//         console.error("Failed to fetch events.");
//       }
//     } catch (error) {
//       console.error("Error during fetchEvents:", error);
//     }
//   };

//   const handleBookEvent = async (eventId) => {
//     try {
//       const response = await fetch(`https://event-booking-backend-ivh3.onrender.com/ticket/user`, {
//         headers: {
//           Authorization: `${token}`,
//           "Content-Type": "application/json",
//         },
//       });

//       if (!response.ok) {
//         console.error("Failed to fetch user tickets.");
//         return;
//       }

//       const data = await response.json();
//       const userTickets = data.userTickets;

//       const isAlreadyBooked = userTickets.some((ticket) => ticket.event._id === eventId);

//       if (isAlreadyBooked) {
//         setShowAlreadyBookedPopup(true);
//       } else {
//         const bookResponse = await fetch(`https://event-booking-backend-ivh3.onrender.com/ticket`, {
//           method: "POST",
//           headers: {
//             Authorization: `${token}`,
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ eventId }),
//         });

//         if (bookResponse.ok) {
//           setShowSuccessPopup(true);
//         } else {
//           console.error("Failed to book event.");
//         }
//       }
//     } catch (error) {
//       console.error("Error during event booking:", error);
//     }
//   };

//   return (
//     <div className="events">
//       {/* Navbar */}
//       <nav className="navbar">
//         {/* Left side */}
//         <div className="left">
//           <Link to={"/dashboard"}><img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw0NDQ0NDw0ODQ8PDg0NDQ0NDQ8QDQ0NFREYFhURGBUYHSogGBsnGxgWITItMSorMDAuFyszODMtQyotLisBCgoKDg0OGBAQGC0dHyUtKy0tKzAtLS0uLy8tLS0tLS0tLS0tLSsvLS0tLSsrLS0tLS0tLi0vLS8tLSstLS0tK//AABEIAOEA4QMBIgACEQEDEQH/xAAbAAADAAMBAQAAAAAAAAAAAAAAAQIEBQYDB//EAEgQAAICAgECBAIGBQUNCQAAAAECAAMEEQUSIQYTMUFRYRQiMnGBkQczQlKhFSNyc6IlQ1RigoOSlLHBwtLTJjREU1VjZXSj/8QAGQEBAQEBAQEAAAAAAAAAAAAAAAECAwQF/8QAMxEAAgIBAgQDBwIGAwAAAAAAAAECEQMhMRJBUYEEYdETInGRscHwoeEFFDJCYrIkM1L/2gAMAwEAAhEDEQA/APq8cI5AEcI4ARwlQBRwjlAo4RwBRxwgC1DUcNQBahqPUIAopUIBMUqKQCilyYBMUqKATCOKATFKigChHCAOOEYgBHCOAEcJUoFHCOAEI44AoRx6gExxwgChHCATCVqKATCVFAJhHFAJhHFAEZMqKQExSojAFCEIBUcUoQAjhKgBCEcoCOEcAI4RwBRxw1AFHHNL4n8QJgJWq1tk5eQxqwcKs/zmRd/wovqzHsBANzFOf8Mc/Ze9mDm1rjcljqGvpQnyb6j2XJpJ+1WfT4qexnRQ1QJhHqEAmKVFAJilRQCYRxGATFLkyAmKUZMAUI4QBxiIShACVEIxAHHFKlARwEcAI4RwAjhOf5pvMt8k8ucI+oow1x/pJX4sbFdvyVfxhFSb2Og/h858+wOQIpyPEDILsnOt+hcPS50tWIbClK7/AGVYhrnP7o+UzW47kWS6vB51cx/LZTjcjVS7AMCN+ZSFdD39SD901/Pcdfj8XweMydNlNN+M6qQQMr+SchF7jsdtsD5sJpIqi+JRegXZN2fgtlIyNyvEEZNN9SlUzcdk8waX1CXVhlK+zqR7Tu+Nza8rHoya+9d9Vd1fx6HUMP8AbOE/RlW3m2bUkDjMcP8"></img></Link>
//         </div>
//         {/* Right side */}
//         <div className="right">
//           <button className="events-button">Events</button>
//           <Link to="/create"> <button className="events-button">Create Events</button></Link>
//           <button onClick={openUserProfileModal} className="profile-button">My Profile</button>
//         </div>
//       </nav>

//       {/* Map */}
//       <div id="map" ref={mapRef} style={{ height: "500px", width: "100%" }}></div>

//       {/* Booking window */}
//       {selectedEvent && (
//         <div className="booking-window">
//           <h2>{selectedEvent.title}</h2>
//           <p>{selectedEvent.description}</p>
//           <p>Date: {formatDate(selectedEvent.date)}</p>
//           <p>Venue: {selectedEvent.venue}</p>
//           <p>Price: ${selectedEvent.price}</p>
//           <button
//             className="book-button"
//             onClick={() => handleBookEvent(selectedEvent._id)}
//           >
//             Book
//           </button>
//           <button onClick={() => setSelectedEvent(null)}>Close</button>
//         </div>
//       )}

//       {/* Success Pop-up */}
//       {showSuccessPopup && (
//         <div className="popup success-popup">
//           <p>Event booked successfully!</p>
//           <button onClick={() => setShowSuccessPopup(false)}>Close</button>
//         </div>
//       )}

//       {/* Already Booked Pop-up */}
//       {showAlreadyBookedPopup && (
//         <div className="popup error-popup">
//           <p>Event is already booked!</p>
//           <button onClick={() => setShowAlreadyBookedPopup(false)}>Close</button>
//         </div>
//       )}

//       {showUserProfileModal && (
//         <UserProfileModel
//           user={user}
//           onClose={closeUserProfileModal}
//         />
//       )}
//     </div>
//   );
// }

// export default Events;

import React, { useState, useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Link } from "react-router-dom"; 
import { Calendar, MapPin, DollarSign, User, LogOut } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card.tsx";
import { Alert, AlertDescription } from "../components/ui/alert.tsx";
import UserProfileModel from "../UserProfile/UserProfileModel.jsx";

function Events() {
  const [events, setEvents] = useState([]);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showAlreadyBookedPopup, setShowAlreadyBookedPopup] = useState(false);
  const [showUserProfileModal, setShowUserProfileModal] = useState(false);
  const [user, setUser] = useState();
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
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
                    {user?.name?.[0]?.toUpperCase() || 'U'}
                  </span>
                </div>
              </button>
              
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-2 border border-slate-200">
                  <button 
                    onClick={openUserProfileModal}
                    className="flex items-center space-x-2 px-4 py-2 w-full text-left hover:bg-slate-50"
                  >
                    <User className="w-4 h-4 text-slate-500" />
                    <span>Profile</span>
                  </button>
                  <button 
                    onClick={() => {/* handle logout */}}
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Map Section */}
          <section className="lg:col-span-2">
            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-slate-800">Event Locations</CardTitle>
              </CardHeader>
              <CardContent>
                <div ref={mapRef} className="w-full h-96 rounded-xl border border-slate-200 overflow-hidden" />
              </CardContent>
            </Card>
          </section>

          {/* Event List Section */}
          <section>
            <h2 className="text-2xl font-semibold text-slate-800 mb-6 flex items-center">
              <Calendar className="w-6 h-6 mr-2 text-blue-600" />
              Upcoming Events
            </h2>
            <div className="space-y-6">
              {events.length === 0 ? (
                <Card className="border-dashed">
                  <CardContent className="py-12">
                    <div className="text-center">
                      <Calendar className="w-12 h-12 mx-auto text-slate-400 mb-3" />
                      <p className="text-slate-500">No events available</p>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                events.map((event) => (
                  <Card key={event._id} className="overflow-hidden hover:shadow-lg transition-all duration-200">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-semibold text-slate-800">
                          {event.title || "Untitled Event"}
                        </h3>
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
                          <span className="font-medium">${event.price || "0"}</span>
                        </div>
                        <button
                          onClick={() => handleBookEvent(event._id)}
                          className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                        >
                          Book
                        </button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </section>
        </div>
      </div>

      {/* Booking window */}
      {/* {selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-end p-4 z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full ">
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">{selectedEvent.title}</h2>
            <p className="text-slate-600 mb-4">{selectedEvent.description}</p>
            <p className="text-slate-600 mb-4">Date: {formatDate(selectedEvent.date)}</p>
            <p className="text-slate-600 mb-4">Venue: {selectedEvent.venue}</p>
            <p className="text-slate-600 mb-4">Price: ${selectedEvent.price}</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => handleBookEvent(selectedEvent._id)}
                className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              >
                Book
              </button>
              <button
                onClick={() => setSelectedEvent(null)}
                className="px-4 py-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )} */}
{selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-end pr-5 z-50">
          <Card className="overflow-hidden hover:shadow-lg transition-all duration-200 max-w-md w-full">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-semibold text-slate-800">{selectedEvent.title}</h2>
              </div>
              <p className="text-slate-600 mb-4">{selectedEvent.description}</p>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center text-slate-500 bg-slate-50 p-3 rounded-xl">
                  <Calendar className="w-4 h-4 mr-2 text-blue-600" />
                  <span>{formatDate(selectedEvent.date)}</span>
                </div>
                <div className="flex items-center text-slate-500 bg-slate-50 p-3 rounded-xl">
                  <MapPin className="w-4 h-4 mr-2 text-blue-600" />
                  <span>{selectedEvent.venue}</span>
                </div>
              </div>
              <div className="flex items-center justify-between bg-blue-50 p-3 rounded-xl mb-4">
                <div className="flex items-center text-blue-600">
                  <DollarSign className="w-4 h-4 mr-1" />
                  <span className="font-medium">${selectedEvent.price}</span>
                </div>
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => handleBookEvent(selectedEvent._id)}
                  className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                >
                  Book
                </button>
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="px-4 py-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                >
                Close
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
      {/* Success Pop-up */}
      {showSuccessPopup && (
        <div className="fixed bottom-4 right-4 bg-green-50 border border-green-200 text-green-600 rounded-xl shadow-lg p-4 z-50">
          <p>Event booked successfully!</p>
          <button
            onClick={() => setShowSuccessPopup(false)}
            className="mt-2 px-4 py-2 rounded-xl bg-green-600 text-white hover:bg-green-700 transition-colors"
          >
            Close
          </button>
        </div>
      )}

      {/* Already Booked Pop-up */}
      {showAlreadyBookedPopup && (
        <div className="fixed bottom-4 right-4 bg-red-50 border border-red-200 text-red-600 rounded-xl shadow-lg p-4 z-50">
          <p>Event is already booked!</p>
          <button
            onClick={() => setShowAlreadyBookedPopup(false)}
            className="mt-2 px-4 py-2 rounded-xl bg-red-600 text-white hover:bg-red-700 transition-colors"
          >
            Close
          </button>
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