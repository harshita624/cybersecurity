// components/ThreatDetectionPrediction.js
import React, { useState } from 'react';

const ThreatDetectionPrediction = () => {
  const [inputData, setInputData] = useState('');
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const handlePrediction = async () => {
    setLoading(true);

    // Simulate data science model API call or prediction logic
    // Replace this part with actual API call to your backend model
    setTimeout(() => {
      // Sample prediction output
      setPrediction("No threat detected based on the provided data.");
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="bg-[#1A1A1A] border border-[#333] rounded-xl p-8">
      <h3 className="text-2xl font-semibold text-[#00F5D4] mb-4">Threat Detection Prediction</h3>
      
      {/* Input for the prediction */}
      <input
        type="text"
        value={inputData}
        onChange={(e) => setInputData(e.target.value)}
        className="px-4 py-2 text-black rounded-md mb-4"
        placeholder="Enter threat-related data"
      />
      
      <button
        onClick={handlePrediction}
        className="py-2 px-4 bg-[#00F5D4] text-black rounded-lg"
        disabled={loading}
      >
        {loading ? 'Loading...' : 'Get Prediction'}
      </button>
      
      {prediction && !loading && <p className="mt-4 text-gray-300">{prediction}</p>}
    </div>
  );
};

export default ThreatDetectionPrediction;
