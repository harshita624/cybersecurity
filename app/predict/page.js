'use client';

import { useState } from 'react';

export default function Predict() {
  const [logData, setLogData] = useState({
    Protocol: "TCP",
    Feature1: 0.5,
    Feature2: 1.2,
    Feature3: -0.8,
  });
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLogData({
      ...logData,
      [name]: name === "Protocol" ? value : parseFloat(value),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(logData),
      });

      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }

      const data = await res.json();
      setPrediction(data.prediction);
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to fetch prediction. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Threat Detection</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="Protocol">Protocol</label>
          <select
            id="Protocol"
            name="Protocol"
            value={logData.Protocol}
            onChange={handleInputChange}
          >
            <option value="TCP">TCP</option>
            <option value="UDP">UDP</option>
            <option value="ICMP">ICMP</option>
          </select>
        </div>
        <div>
          <label htmlFor="Feature1">Feature 1</label>
          <input
            id="Feature1"
            type="number"
            name="Feature1"
            value={logData.Feature1}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="Feature2">Feature 2</label>
          <input
            id="Feature2"
            type="number"
            name="Feature2"
            value={logData.Feature2}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="Feature3">Feature 3</label>
          <input
            id="Feature3"
            type="number"
            name="Feature3"
            value={logData.Feature3}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Predict Threat"}
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {prediction && (
        <div>
          <h2>Prediction Result</h2>
          <p>{prediction}</p>
        </div>
      )}
    </div>
  );
}
