// import React, { useState, useEffect, useRef } from "react";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";
// import "./CreateEvent.css";
// import { Link } from "react-router-dom";

// function CreateEvent() {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [date, setDate] = useState("");
//   const [venue, setVenue] = useState("");
//   const [price, setPrice] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [latitude, setLatitude] = useState(51.505);
//   const [longitude, setLongitude] = useState(-0.09);
//   const mapRef = useRef(null);
//   const mapInstance = useRef(null);
//   const markerRef = useRef(null);

//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     if (mapRef.current && !mapInstance.current) {
//       mapInstance.current = L.map(mapRef.current).setView([latitude, longitude], 13);

//       L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
//         attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
//       }).addTo(mapInstance.current);

//       markerRef.current = L.marker([latitude, longitude]).addTo(mapInstance.current);

//       mapInstance.current.on("click", (e) => {
//         setLatitude(e.latlng.lat);
//         setLongitude(e.latlng.lng);
//       });
//     }
//   }, []);

//   useEffect(() => {
//     if (markerRef.current) {
//       markerRef.current.setLatLng([latitude, longitude]);
//     }
//   }, [latitude, longitude]);

//   const handleCreateEvent = async (e) => {
//     e.preventDefault();

//     try {
//       setIsLoading(true);

//       const response = await fetch("https://event-booking-backend-ivh3.onrender.com/event/create", {
//         method: "POST",
//         headers: {
//           Authorization: `${token}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ title, description, date, venue, price, latitude, longitude }),
//       });

//       if (response.ok) {
//         alert("Event created successfully!");
//       } else {
//         alert("Failed to create event.");
//         console.error("Failed to create event.");
//       }
//     } catch (error) {
//       alert("Error creating event.");
//       console.error("Error creating event:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="create-event">
//       {/* Navbar */}
//       <nav className="navbar">
//         {/* Left side */}
//         <div className="left">
//           <Link to={"/dashboard"}><img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw0NDQ0NDw0ODQ8PDg0NDQ0NDQ8QDQ0NFREYFhURGBUYHSogGBsnGxgWITItMSorMDAuFyszODMtQyotLisBCgoKDg0OGBAQGC0dHyUtKy0tKzAtLS0uLy8tLS0tLS0tLS0tLSsvLS0tLSsrLS0tLS0tLi0vLS8tLSstLS0tK//AABEIAOEA4QMBIgACEQEDEQH/xAAbAAADAAMBAQAAAAAAAAAAAAAAAQIEBQYDB//EAEgQAAICAgECBAIGBQUNCQAAAAECAAMEEQUSIQYTMUFRYRQiMnGBkQczQlKhFSNyc6IlQ1RigoOSlLHBwtLTJjREU1VjZXSj/8QAGQEBAQEBAQEAAAAAAAAAAAAAAAECAwQF/8QAMxEAAgIBAgQDBwIGAwAAAAAAAAECEQMhMRJBUYEEYdETInGRscHwoeEFFDJCYrIkM1L/2gAMAwEAAhEDEQA/APq8cI5AEcI4ARwlQBRwjlAo4RwBRxwgC1DUcNQBahqPUIAopUIBMUqKQCilyYBMUqKATCOKATFKigChHCAOOEYgBHCOAEcJUoFHCOAEI44AoRx6gExxwgChHCATCVqKATCVFAJhHFAJhHFAEZMqKQExSojAFCEIBUcUoQAjhKgBCEcoCOEcAI4RwBRxw1AFHHNL4n8QJgJWq1tk5eQxqwcKs/zmRd/wovqzHsBANzFOf8Mc/Ze9mDm1rjcljqGvpQnyb6j2XJpJ+1WfT4qexnRQ1QJhHqEAmKVFAJilRQCYRxGATFLkyAmKUZMAUI4QBxiIShACVEIxAHHFKlARwEcAI4RwAjhOf5pvMt8k8ucI+oow1x/pJX4sbFdvyVfxhFSb2Og/h858+wOQIpyPEDILsnOt+hcPS50tWIbClK7/AGVYhrnP7o+UzW47kWS6vB51cx/LZTjcjVS7AMCN+ZSFdD39SD901/Pcdfj8XweMydNlNN+M6qQQMr+SchF7jsdtsD5sJpIqi+JRegXZN2fgtlIyNyvEEZNN9SlUzcdk8waX1CXVhlK+zqR7Tu+Nza8rHoya+9d9Vd1fx6HUMP8AbOE/RlW3m2bUkDjMcP8"></img></Link>
//           <span>BookmyEvent</span>
//         </div>
//         {/* Right side */}
//         <div className="right">
//           <Link to={"/events"}><button className="events-button">Events</button></Link>
//           <button className="profile-button">My Profile</button>
//         </div>
//       </nav>

//       {/* Create Event Form */}
//       <div className={`create-event-form ${isLoading ? "loading" : ""}`}>
//         <h2>Create Event</h2>
//         <form onSubmit={handleCreateEvent}>
//           <input
//             type="text"
//             placeholder="Title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             required
//           />
//           <textarea
//             placeholder="Description"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             required
//           ></textarea>
//           <input
//             type="date"
//             placeholder="Date"
//             value={date}
//             onChange={(e) => setDate(e.target.value)}
//             required
//           />
//           <input
//             type="text"
//             placeholder="Venue"
//             value={venue}
//             onChange={(e) => setVenue(e.target.value)}
//             required
//           />
//           <input
//             type="number"
//             placeholder="Price"
//             value={price}
//             onChange={(e) => setPrice(e.target.value)}
//             required
//           />
//           <div id="map" ref={mapRef} style={{ height: "200px", width: "100%" }}></div>
//           {isLoading ? (
//             <div className="spinner"></div>
//           ) : (
//             <button type="submit">Create Event</button>
//           )}
//         </form>
//       </div>
//     </div>
//   );
// }

// export default CreateEvent;

import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Calendar, MapPin, DollarSign, FileText, Type, User, LogOut } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card.tsx";
import { Alert, AlertDescription } from "../components/ui/alert.tsx";

function CreateEvent() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    venue: "",
    price: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [latitude, setLatitude] = useState(51.505);
  const [longitude, setLongitude] = useState(-0.09);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const markerRef = useRef(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (mapRef.current && !mapInstance.current) {
      mapInstance.current = L.map(mapRef.current).setView([latitude, longitude], 13);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapInstance.current);

      markerRef.current = L.marker([latitude, longitude]).addTo(mapInstance.current);

      mapInstance.current.on("click", (e) => {
        setLatitude(e.latlng.lat);
        setLongitude(e.latlng.lng);
      });
    }
  }, []);

  useEffect(() => {
    if (markerRef.current) {
      markerRef.current.setLatLng([latitude, longitude]);
    }
  }, [latitude, longitude]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("https://event-booking-backend-ivh3.onrender.com/event/create", {
        method: "POST",
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, latitude, longitude }),
      });

      if (response.ok) {
        setShowSuccess(true);
        setFormData({
          title: "",
          description: "",
          date: "",
          venue: "",
          price: "",
        });
        setTimeout(() => setShowSuccess(false), 3000);
      } else {
        throw new Error("Failed to create event");
      }
    } catch (error) {
      console.error("Error creating event:", error);
    } finally {
      setIsLoading(false);
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
            <div className="relative">
              <button 
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center space-x-2 px-3 py-2 rounded-xl hover:bg-slate-50 transition-colors duration-200"
              >
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                  <span className="text-white font-medium">U</span>
                </div>
              </button>
              
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-2 border border-slate-200">
                  <button className="flex items-center space-x-2 px-4 py-2 w-full text-left hover:bg-slate-50">
                    <User className="w-4 h-4 text-slate-500" />
                    <span>Profile</span>
                  </button>
                  <button className="flex items-center space-x-2 px-4 py-2 w-full text-left text-red-600 hover:bg-red-50">
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                  
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-6 py-8">
        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-slate-800">Create New Event</CardTitle>
          </CardHeader>
          <CardContent>
            {showSuccess && (
              <Alert className="mb-6 bg-green-50 border-green-200">
                <AlertDescription className="text-green-600">
                  Event created successfully!
                </AlertDescription>
              </Alert>
            )}
            
            <form onSubmit={handleCreateEvent} className="space-y-6">
              <div className="space-y-2">
                <label className="flex items-center text-sm font-medium text-slate-600">
                  <Type className="w-4 h-4 mr-2" />
                  Event Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder="Enter event title"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center text-sm font-medium text-slate-600">
                  <FileText className="w-4 h-4 mr-2" />
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  rows="4"
                  placeholder="Describe your event"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium text-slate-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium text-slate-600">
                    <DollarSign className="w-4 h-4 mr-2" />
                    Price
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="flex items-center text-sm font-medium text-slate-600">
                  <MapPin className="w-4 h-4 mr-2" />
                  Venue
                </label>
                <input
                  type="text"
                  name="venue"
                  value={formData.venue}
                  onChange={handleChange}
                  className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder="Enter venue location"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center text-sm font-medium text-slate-600">
                  <MapPin className="w-4 h-4 mr-2" />
                  Select Location on Map
                </label>
                <div 
                  ref={mapRef} 
                  className="w-full h-64 rounded-xl border border-slate-200 overflow-hidden"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full px-6 py-3 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Creating Event...
                  </div>
                ) : (
                  "Create Event"
                )}
              </button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default CreateEvent;