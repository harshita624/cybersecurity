'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { validatePhone } from '../../lib/utils';

export default function NearestStationForm() {
  const [location, setLocation] = useState(null);
  const [nearestStation, setNearestStation] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userDetails, setUserDetails] = useState({ 
    name: '', 
    phone: '' 
  });

  // Location and station finding logic
  useEffect(() => {
    setLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const userLocation = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          };
          setLocation(userLocation);
          try {
            const response = await axios.get('/api/find-nearest-station', {
              params: { 
                latitude: userLocation.latitude, 
                longitude: userLocation.longitude 
              }
            });

            if (response.data.station) {
              setNearestStation(response.data.station);
            } else {
              setError("No nearest police station found.");
            }
          } catch (err) {
            setError("Error fetching nearest police station.");
            console.error(err);
          } finally {
            setLoading(false);
          }
        },
        (error) => {
          setError("Location access denied. Please enable location permissions.");
          setLoading(false);
          console.error("Location error:", error);
        }
      );
    } else {
      setError("Geolocation not supported");
      setLoading(false);
    }
  }, []);

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!userDetails.name.trim()) {
      alert("Please provide your name.");
      return;
    }

    if (!validatePhone(userDetails.phone)) {
      alert("Please provide a valid phone number.");
      return;
    }

    if (!nearestStation) {
      alert("Nearest station not found. Please try again.");
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

  // Render loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-[#00F5D4]"></div>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="text-red-500 text-center">
        <p>{error}</p>
      </div>
    );
  }

  // Main render
  return (
    <div>
      {nearestStation && (
        <div>
          <h2 className="text-2xl font-semibold text-[#00F5D4] mb-4">
            Nearest Police Station
          </h2>
          <div className="bg-gray-800 p-4 rounded-lg mb-6">
            <p className="mb-2"><strong>Name:</strong> {nearestStation.name}</p>
            <p className="mb-2"><strong>Address:</strong> {nearestStation.address}</p>
            <p><strong>Phone:</strong> {nearestStation.phone}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm text-gray-300 mb-2">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                value={userDetails.name}
                onChange={(e) => setUserDetails({ ...userDetails, name: e.target.value })}
                className="w-full p-2 bg-gray-700 text-white rounded-md"
                required
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm text-gray-300 mb-2">
                Your Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                value={userDetails.phone}
                onChange={(e) => setUserDetails({ ...userDetails, phone: e.target.value })}
                className="w-full p-2 bg-gray-700 text-white rounded-md"
                required
              />
            </div>

            <button 
              type="submit" 
              className="w-full bg-[#00F5D4] text-black py-2 rounded-lg hover:bg-opacity-90 transition-colors"
            >
              Send Details to Police
            </button>
          </form>
        </div>
      )}
    </div>
  );
}