import { NextResponse } from 'next/server';
import * as tf from '@tensorflow/tfjs-node';

import * as mobilenet from '@tensorflow-models/mobilenet';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const imageFile = formData.get('image');

    if (!imageFile) {
      return NextResponse.json({ error: 'No image file provided' }, { status: 400 });
    }

    // Convert to buffer
    const imageBuffer = Buffer.from(await imageFile.arrayBuffer());

    // Load MobileNet model
    const model = await mobilenet.load();

    // Decode image with additional error handling
    let imageTensor;
    try {
      imageTensor = tf.node.decodeImage(imageBuffer, 3); // Specify 3 channels (RGB)
    } catch (decodeError) {
      console.error('Image decoding error:', decodeError);
      return NextResponse.json({ error: 'Unable to decode image', details: decodeError.message }, { status: 400 });
    }

    // Ensure tensor is in the right shape and format
    const resizedTensor = tf.image.resizeBilinear(imageTensor, [224, 224]);
    const normalizedTensor = resizedTensor.div(255.0);
    const expandedTensor = normalizedTensor.expandDims(0);

    // Classify image
    const predictions = await model.classify(expandedTensor);

    // Dispose tensors to prevent memory leaks
    imageTensor.dispose();
    resizedTensor.dispose();
    normalizedTensor.dispose();
    expandedTensor.dispose();

    return NextResponse.json({ predictions });

  } catch (error) {
    console.error('Image recognition error:', error);
    return NextResponse.json({ 
      error: 'Image processing failed', 
      details: error.message 
    }, { status: 500 });
  }
}