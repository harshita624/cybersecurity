import { NextResponse } from "next/server";
import { predictThreat } from "../../../utils/predict_threat"; // Import the prediction function

export async function POST(req) {
  const logData = await req.json(); // Get the log data sent from the client
  try {
    const result = await predictThreat(logData); // Call the prediction function
    return NextResponse.json({ prediction: result });
  } catch (error) {
    return NextResponse.json({ error: "Prediction failed" }, { status: 500 });
  }
}
