"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const NearestStationPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [station, setStation] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchNearestStation = async () => {
      console.log('Attempting to fetch geolocation...');
      
      // Get current geolocation
      if (navigator.geolocation) {
        setLoading(true);
        navigator.geolocation.getCurrentPosition(async (position) => {
          const { latitude, longitude } = position.coords;
          console.log('Geolocation found:', latitude, longitude);

          try {
            console.log('Fetching nearest station...');
            // Call the API with latitude and longitude
            const response = await fetch(`/api/nearest-station?latitude=${latitude}&longitude=${longitude}`);
            const data = await response.json();

            if (response.ok && data.station) {
              console.log('Nearest station found:', data.station);
              setStation(data.station);

              // Ensure the redirection logic is triggered
              console.log('Redirecting to /nearest-station');
              router.push('/nearest-station'); // Make sure this path is correct
            } else {
              console.error('No station found or error:', data.error);
              setError(data.error || 'No station found');
            }
          } catch (error) {
            console.error('Error fetching nearest station:', error);
            setError('Failed to fetch nearest station.');
          } finally {
            setLoading(false);
          }
        }, () => {
          console.error('Unable to retrieve location.');
          setError('Unable to retrieve location.');
          setLoading(false);
        });
      } else {
        console.error('Geolocation is not supported by this browser.');
        setError('Geolocation is not supported by this browser.');
        setLoading(false);
      }
    };

    fetchNearestStation();
  }, [router]);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {station && (
        <div>
          <h2>Nearest Police Station</h2>
          <p>Name: {station.name}</p>
          <p>Address: {station.address}</p>
          <p>Distance: {station.distance} km</p>
        </div>
      )}
    </div>
  );
};

export default NearestStationPage;
