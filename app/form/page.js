"use client";

import React, { useState } from 'react';
import Link from 'next/link'; // Import Link from Next.js

const FormPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    dob: { day: '', month: '', year: '' },
    age: '',
    description: '',
    files: [],
  });

  const [step, setStep] = useState(1);
  const [submissionStatus, setSubmissionStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const calculateAge = (dob) => {
    const { day, month, year } = dob;
    if (!day || !month || !year) return ''; // Return empty string if any date part is missing
  
    const today = new Date();
    const birthDate = new Date(`${year}-${month}-${day}`);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
  
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
  
    return isNaN(age) ? '' : age; // Ensure age is a number, otherwise return empty string
  };
  
  const handleDOBChange = (e) => {
    const { name, value } = e.target;
    const updatedDOB = { ...formData.dob, [name]: value };
  
    setFormData((prev) => ({
      ...prev,
      dob: updatedDOB,
      age: calculateAge(updatedDOB),
    }));
  };
  
  const handleFileChange = (e) => {
    const validTypes = ['application/pdf', 'image/jpeg', 'image/png'];
    const files = Array.from(e.target.files);
    const invalidFile = files.find((file) => !validTypes.includes(file.type));

    if (invalidFile) {
      alert('Invalid file type. Only PDFs, JPEGs, and PNGs are allowed.');
      return;
    }

    setFormData((prev) => ({ ...prev, files }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmissionStatus('Your complaint has been submitted!');

    // Optional: You can reset the form immediately here if needed
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      dob: { day: '', month: '', year: '' },
      age: '',
      description: '',
      files: [],
    });
    setStep(1);
  };

  return (
    <div className="max-w-lg mx-auto p-8 bg-white shadow-lg rounded-lg mt-10">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Complaint Form</h1>

      <div className="flex justify-between items-center mb-8">
        <p className="text-gray-600">Step {step} of 3</p>
        <div className="flex">
          {[1, 2, 3].map((num) => (
            <div
              key={num}
              className={`h-2 w-8 mx-1 rounded-full transition-all duration-300 ${step === num ? 'bg-blue-500' : 'bg-gray-300'}`}
            ></div>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {step === 1 && (
          <>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleInputChange}
              className="block w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              className="block w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone (10 digits)"
              value={formData.phone}
              onChange={handleInputChange}
              className="block w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              pattern="[0-9]{10}"
              required
            />
          </>
        )}

        {step === 2 && (
          <>
            <div className="flex space-x-2 mb-4">
              <input
                type="number"
                name="day"
                placeholder="Day"
                value={formData.dob.day}
                onChange={handleDOBChange}
                className="w-1/3 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                required
              />
              <input
                type="number"
                name="month"
                placeholder="Month"
                value={formData.dob.month}
                onChange={handleDOBChange}
                className="w-1/3 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                required
              />
              <input
                type="number"
                name="year"
                placeholder="Year"
                value={formData.dob.year}
                onChange={handleDOBChange}
                className="w-1/3 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                required
              />
            </div>
            <input
              type="number"
              name="age"
              placeholder="Age"
              value={formData.age}
              readOnly
              className="block w-full p-3 mb-4 border rounded-lg bg-gray-100"
            />
            <textarea
              name="description"
              placeholder="Describe your complaint"
              value={formData.description}
              onChange={handleInputChange}
              className="block w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              required
            />
          </>
        )}

        {step === 3 && (
          <>
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              className="block w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={resetForm}
                className="w-1/2 bg-gray-500 text-white py-3 rounded-lg hover:bg-gray-600 transition-colors"
              >
                Reset
              </button>
              <button
                type="submit"
                className="w-1/2 bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Submit
              </button>
            </div>
          </>
        )}

        <div className="mt-6 flex justify-between">
          <button
            type="button"
            disabled={step === 1}
            onClick={() => setStep((prev) => prev - 1)}
            className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition-colors"
          >
            Previous
          </button>
          <button
            type="button"
            disabled={step === 3}
            onClick={() => setStep((prev) => prev + 1)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Next
          </button>
        </div>
      </form>

      {submissionStatus && (
        <div
          className={`mt-6 p-4 rounded-lg transition-all ${
            submissionStatus.includes('submitted')
              ? 'bg-green-500 text-white'
              : 'bg-red-500 text-white'
          }`}
        >
          {submissionStatus}
        </div>
      )}

      {/* Link to Home Page */}
      <Link href="/">
        <button className="mt-6 w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors">
          Go to Home
        </button>
      </Link>
    </div>
  );
};

export default FormPage;
