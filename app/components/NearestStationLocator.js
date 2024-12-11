'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function NearestStationLocator() {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Enhanced geolocation function
  const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
      // Check if geolocation is supported
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported by this browser'));
        return;
      }

      // Options for more accurate location
      const options = {
        enableHighAccuracy: true, // Request most accurate location
        timeout: 10000, // 10 seconds timeout
        maximumAge: 0 // Don't use cached location
      };

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy
          };
          resolve(userLocation);
        },
        (error) => {
          // Detailed error handling
          switch(error.code) {
            case error.PERMISSION_DENIED:
              reject(new Error('User denied location access'));
              break;
            case error.POSITION_UNAVAILABLE:
              reject(new Error('Location information is unavailable'));
              break;
            case error.TIMEOUT:
              reject(new Error('Location request timed out'));
              break;
            default:
              reject(new Error('An unknown error occurred'));
          }
        },
        options
      );
    });
  };

  // Fallback location methods
  const getFallbackLocation = async () => {
    try {
      // Option 1: IP Geolocation API
      const response = await axios.get('https://ipapi.co/json/');
      return {
        latitude: response.data.latitude,
        longitude: response.data.longitude,
        source: 'IP Geolocation'
      };
    } catch (ipError) {
      // Option 2: Browser's built-in geolocation (less accurate)
      try {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: false,
            timeout: 5000,
            maximumAge: 30000
          });
        });

        return {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          source: 'Browser Geolocation'
        };
      } catch (browserError) {
        throw new Error('Unable to retrieve location');
      }
    }
  };

  // Location retrieval effect
  useEffect(() => {
    const fetchLocation = async () => {
      setLoading(true);
      try {
        // First, try high-accuracy geolocation
        const location = await getCurrentLocation();
        setLocation(location);
        
        // Optional: You might want to log the location source or accuracy
        console.log('Location obtained:', location);
      } catch (primaryError) {
        try {
          // Fallback to alternative location methods
          const fallbackLocation = await getFallbackLocation();
          setLocation(fallbackLocation);
        } catch (fallbackError) {
          setError(fallbackError.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchLocation();
  }, []);

  // Render loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="text-red-500 text-center p-4">
        <p>Error: {error}</p>
        <p>Please enable location services or check your internet connection.</p>
      </div>
    );
  }

  // Render location details (for debugging/demonstration)
  return (
    <div>
      <h2>Your Location</h2>
      <p>Latitude: {location.latitude}</p>
      <p>Longitude: {location.longitude}</p>
      {location.source && <p>Location Source: {location.source}</p>}
      {location.accuracy && <p>Accuracy: {location.accuracy} meters</p>}
    </div>
  );
}