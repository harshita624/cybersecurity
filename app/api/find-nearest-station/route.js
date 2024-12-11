
import { NextResponse } from 'next/server';
import policeStations from '../../../data/police-stations.json';
import { calculateDistance } from '../../../lib/utils';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const latitude = parseFloat(searchParams.get('latitude'));
  const longitude = parseFloat(searchParams.get('longitude'));

  if (!latitude || !longitude) {
    return NextResponse.json(
      { error: 'Latitude and longitude are required' }, 
      { status: 400 }
    );
  }

  // Find nearest station
  const nearestStation = policeStations.reduce((nearest, station) => {
    const distance = calculateDistance(
      latitude, 
      longitude, 
      station.latitude, 
      station.longitude
    );

    return (!nearest || distance < nearest.distance) 
      ? { ...station, distance } 
      : nearest;
  }, null);

  if (nearestStation) {
    return NextResponse.json({ station: nearestStation });
  } else {
    return NextResponse.json(
      { error: 'No police station found' }, 
      { status: 404 }
    );
  }
}