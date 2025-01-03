import { NextResponse } from 'next/server';
import virusTotalService from '@/utils/virusTotalService';

export async function POST(request) {
  try {
    const body = await request.json();
    const { url } = body;

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    // Use the VirusTotal service to scan the URL
    const scanResponse = await virusTotalService.scanUrl(url);
    return NextResponse.json(scanResponse, { status: 200 });
  } catch (error) {
    console.error('VirusTotal Scan Error:', error);
    return NextResponse.json(
      { error: 'Failed to scan URL', details: error.message },
      { status: 500 }
    );
  }
}
