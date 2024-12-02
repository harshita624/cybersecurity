'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function NearestStation() {
  const [location, setLocation] = useState(null);
  const [nearestStation, setNearestStation] = useState(null);
  const [error, setError] = useState(null);
  const [userDetails, setUserDetails] = useState({ name: '', phone: '' });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          };
          setLocation(userLocation);
          findNearestPoliceStation(userLocation);
        },
        (error) => {
          setError("Unable to retrieve your location. Please allow location access.");
          console.error("Location error:", error);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  }, []);

  // Fetch nearest police station using the latitude and longitude
  const findNearestPoliceStation = async (userLocation) => {
    try {
      // Make an API call to get nearest police stations based on latitude and longitude
      // You can integrate a real geocoding API or use your backend to find the nearest stations
      const response = await axios.get(`/api/find-nearest-station`, {
        params: { latitude: userLocation.latitude, longitude: userLocation.longitude }
      });

      if (response.data.station) {
        setNearestStation(response.data.station);
      } else {
        setError("No nearest police station found.");
      }
    } catch (error) {
      setError("Error fetching nearest police station.");
      console.error(error);
    }
  };

  // Submit the user details to the nearest police station
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userDetails.name || !userDetails.phone) {
      alert("Please provide your details.");
      return;
    }

    try {
      const response = await axios.post('/api/notify-police', {
        userDetails,
        location,
        station: nearestStation
      });

      if (response.status === 200) {
        alert('Your details have been sent to the nearest police station.');
      }
    } catch (error) {
      console.error('Error sending details to the police:', error);
      alert('Failed to notify the police. Please try again.');
    }
  };

  return (
    <div className="bg-[#0A0A0A] text-white min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <h1 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-[#00F5D4] to-[#7B61FF]">
          Nearest Police Station
        </h1>

        {error && <p className="text-red-500 mb-4">{error}</p>} {/* Error message if location access is denied */}

        {location && nearestStation ? (
          <div>
            <h2 className="text-2xl font-semibold text-[#00F5D4] mb-4">Nearest Police Station</h2>
            <p>Name: {nearestStation.name}</p>
            <p>Address: {nearestStation.address}</p>
            <p>Phone: {nearestStation.phone}</p>

            <form onSubmit={handleSubmit} className="mt-8">
              <div className="mb-4">
                <label className="block text-sm text-gray-300">Your Name</label>
                <input
                  type="text"
                  value={userDetails.name}
                  onChange={(e) => setUserDetails({ ...userDetails, name: e.target.value })}
                  className="w-full p-2 mt-2 border border-gray-500 rounded-md"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm text-gray-300">Your Phone</label>
                <input
                  type="text"
                  value={userDetails.phone}
                  onChange={(e) => setUserDetails({ ...userDetails, phone: e.target.value })}
                  className="w-full p-2 mt-2 border border-gray-500 rounded-md"
                />
              </div>

              <button type="submit" className="px-6 py-2 bg-[#00F5D4] text-black rounded-lg">
                Send Details to Police
              </button>
            </form>
          </div>
        ) : (
          <p className="text-gray-300">Locating nearest police station...</p>
        )}
      </div>
    </div>
  );
}
