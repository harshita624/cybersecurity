"use client";

import React, { useState } from "react";

export default function ImageRecognition() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedImage) {
      setError("Please select an image.");
      return;
    }

    setLoading(true);
    setError("");
    setResult("");

    const formData = new FormData();
    formData.append("image", selectedImage);

    try {
      const response = await fetch("/api/imagerecognition", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      setResult(data.result || "No recognizable data found.");
    } catch (err) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#1A1A1A] p-8 rounded-xl text-center border border-[#333] hover:border-[#00F5D4] transition-all">
      <h3 className="text-2xl font-bold text-[#00F5D4] mb-4">Image Recognition</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="block w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#00F5D4] file:text-black hover:file:bg-[#00F5D4]/80"
        />
        {selectedImage && (
          <p className="text-sm text-gray-300">Selected: {selectedImage.name}</p>
        )}
        <button
          type="submit"
          className="w-full py-3 bg-[#7B61FF] text-white rounded-lg hover:bg-opacity-90"
          disabled={loading}
        >
          {loading ? "Processing..." : "Recognize Image"}
        </button>
        {result && <p className="text-sm text-[#00F5D4] mt-4">{result}</p>}
        {error && <p className="text-sm text-red-500 mt-4">{error}</p>}
      </form>
    </div>
  );
}
