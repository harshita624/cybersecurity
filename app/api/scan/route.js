import axios from 'axios';
import multer from 'multer';
import { NextResponse } from 'next/server';

// Configure multer for file uploads
const upload = multer({ storage: multer.memoryStorage() });

export const POST = async (req) => {
  const apiKey = process.env.VIRUSTOTAL_API_KEY;
  const url = 'https://www.virustotal.com/api/v3/files';

  try {
    const formData = new FormData();
    const fileBuffer = await req.arrayBuffer();
    const file = new File([fileBuffer], 'uploaded_file'); // Mock file object

    formData.append('file', file);

    const response = await axios.post(url, formData, {
      headers: {
        'x-apikey': apiKey,
        ...formData.getHeaders(),
      },
    });

    return NextResponse.json({ result: response.data });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'File scanning failed' }, { status: 500 });
  }
};
