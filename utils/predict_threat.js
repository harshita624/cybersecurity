import { exec } from "child_process";
import path from "path";

export async function predictThreat(logData) {
  return new Promise((resolve, reject) => {
    const scriptPath = path.resolve("path/to/your/predict_threat.py"); // Adjust the path to your Python script
    const logDataString = JSON.stringify(logData);

    // Execute the Python script with log data as argument
    exec(`python ${scriptPath} '${logDataString}'`, (error, stdout, stderr) => {
      if (error) {
        reject(`Error: ${stderr || error.message}`);
      } else {
        resolve(stdout.trim()); // Return the prediction result
      }
    });
  });
}
