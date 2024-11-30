"use client";

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, FileText, Upload, X, Check, Home } from 'lucide-react';

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
  const [errors, setErrors] = useState({});

  const validateStep = () => {
    const newErrors = {};
    
    if (step === 1) {
      if (!formData.name.trim()) newErrors.name = 'Name is required';
      if (!formData.email.trim()) newErrors.email = 'Email is required';
      if (!formData.phone.match(/^[0-9]{10}$/)) newErrors.phone = 'Invalid phone number';
    }

    if (step === 2) {
      const { day, month, year } = formData.dob;
      if (!day || !month || !year) newErrors.dob = 'Complete date of birth is required';
      if (!formData.description.trim()) newErrors.description = 'Description is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const calculateAge = (dob) => {
    const { day, month, year } = dob;
    if (!day || !month || !year) return '';
  
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
  
    return isNaN(age) ? '' : age;
  };
  
  const handleDOBChange = (e) => {
    const { name, value } = e.target;
    const updatedDOB = { ...formData.dob, [name]: value };
  
    setFormData((prev) => ({
      ...prev,
      dob: updatedDOB,
      age: calculateAge(updatedDOB),
    }));
    setErrors((prev) => ({ ...prev, dob: '' }));
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
    setErrors({});
  };

  const nextStep = () => {
    if (validateStep()) {
      setStep((prev) => Math.min(prev + 1, 3));
    }
  };

  const prevStep = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const goToHome = () => {
    // Simple navigation method, replace with actual routing in your app
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl overflow-hidden">
        <div className="bg-blue-600 text-white p-6 text-center relative">
          <h1 className="text-2xl font-bold tracking-wide">Complaint Form</h1>
          <div className="absolute inset-x-0 bottom-0 flex justify-center space-x-2 pb-2">
            {[1, 2, 3].map((num) => (
              <div
                key={num}
                className={`h-1.5 w-10 rounded-full transition-all duration-300 ${
                  step === num ? 'bg-white' : 'bg-blue-400'
                }`}
              ></div>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {step === 1 && (
            <>
              <div className="space-y-4">
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full p-3 border-2 rounded-lg focus:outline-none focus:ring-2 transition-all ${
                      errors.name 
                        ? 'border-red-500 focus:ring-red-300' 
                        : 'border-gray-300 focus:border-blue-500 focus:ring-blue-300'
                    }`}
                    required
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full p-3 border-2 rounded-lg focus:outline-none focus:ring-2 transition-all ${
                      errors.email 
                        ? 'border-red-500 focus:ring-red-300' 
                        : 'border-gray-300 focus:border-blue-500 focus:ring-blue-300'
                    }`}
                    required
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>
                <div>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`w-full p-3 border-2 rounded-lg focus:outline-none focus:ring-2 transition-all ${
                      errors.phone 
                        ? 'border-red-500 focus:ring-red-300' 
                        : 'border-gray-300 focus:border-blue-500 focus:ring-blue-300'
                    }`}
                    pattern="[0-9]{10}"
                    required
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                  )}
                </div>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div className="space-y-4">
                <div className="flex space-x-2">
                  <div className="w-1/3">
                    <input
                      type="number"
                      name="day"
                      placeholder="Day"
                      value={formData.dob.day}
                      onChange={handleDOBChange}
                      min="1"
                      max="31"
                      className={`w-full p-3 border-2 rounded-lg focus:outline-none focus:ring-2 transition-all ${
                        errors.dob 
                          ? 'border-red-500 focus:ring-red-300' 
                          : 'border-gray-300 focus:border-blue-500 focus:ring-blue-300'
                      }`}
                      required
                    />
                  </div>
                  <div className="w-1/3">
                    <input
                      type="number"
                      name="month"
                      placeholder="Month"
                      value={formData.dob.month}
                      onChange={handleDOBChange}
                      min="1"
                      max="12"
                      className={`w-full p-3 border-2 rounded-lg focus:outline-none focus:ring-2 transition-all ${
                        errors.dob 
                          ? 'border-red-500 focus:ring-red-300' 
                          : 'border-gray-300 focus:border-blue-500 focus:ring-blue-300'
                      }`}
                      required
                    />
                  </div>
                  <div className="w-1/3">
                    <input
                      type="number"
                      name="year"
                      placeholder="Year"
                      value={formData.dob.year}
                      onChange={handleDOBChange}
                      min="1900"
                      max={new Date().getFullYear()}
                      className={`w-full p-3 border-2 rounded-lg focus:outline-none focus:ring-2 transition-all ${
                        errors.dob 
                          ? 'border-red-500 focus:ring-red-300' 
                          : 'border-gray-300 focus:border-blue-500 focus:ring-blue-300'
                      }`}
                      required
                    />
                  </div>
                </div>
                {errors.dob && (
                  <p className="text-red-500 text-sm mt-1">{errors.dob}</p>
                )}
                
                <input
                  type="text"
                  name="age"
                  placeholder="Age"
                  value={formData.age}
                  readOnly
                  className="w-full p-3 border-2 border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                />
                
                <textarea
                  name="description"
                  placeholder="Describe your complaint"
                  value={formData.description}
                  onChange={handleInputChange}
                  className={`w-full p-3 border-2 rounded-lg focus:outline-none focus:ring-2 transition-all h-32 resize-none ${
                    errors.description 
                      ? 'border-red-500 focus:ring-red-300' 
                      : 'border-gray-300 focus:border-blue-500 focus:ring-blue-300'
                  }`}
                  required
                />
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1">{errors.description}</p>
                )}
              </div>
            </>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div className="border-2 border-dashed border-blue-300 rounded-lg p-6 text-center">
                <Upload className="mx-auto mb-4 text-blue-500" size={48} />
                <input
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-upload"
                  accept=".pdf,.jpg,.jpeg,.png"
                />
                <label 
                  htmlFor="file-upload" 
                  className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Upload Files
                </label>
                <p className="text-sm text-gray-500 mt-2">
                  PDF, JPEG, PNG (Max 5MB)
                </p>
              </div>

              {formData.files.length > 0 && (
                <div className="space-y-2">
                  {formData.files.map((file, index) => (
                    <div 
                      key={index} 
                      className="flex items-center justify-between bg-gray-100 p-3 rounded-lg"
                    >
                      <div className="flex items-center space-x-2">
                        <FileText className="text-blue-500" size={24} />
                        <span className="text-sm truncate">{file.name}</span>
                      </div>
                      <button 
                        type="button" 
                        onClick={() => {
                          setFormData(prev => ({
                            ...prev, 
                            files: prev.files.filter((_, i) => i !== index)
                          }));
                        }}
                        className="text-red-500 hover:bg-red-100 rounded-full p-1"
                      >
                        <X size={20} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={resetForm}
                  className="w-1/2 bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center"
                >
                  <X className="mr-2" size={20} /> Reset
                </button>
                <button
                  type="submit"
                  className="w-1/2 bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center"
                >
                  <Check className="mr-2" size={20} /> Submit
                </button>
              </div>
            </div>
          )}

          <div className="flex justify-between mt-6">
            <button
              type="button"
              disabled={step === 1}
              onClick={prevStep}
              className="text-blue-600 hover:bg-blue-50 p-2 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              type="button"
              disabled={step === 3}
              onClick={nextStep}
              className="text-blue-600 hover:bg-blue-50 p-2 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </form>

        {submissionStatus && (
          <div className="p-4 bg-green-500 text-white text-center">
            {submissionStatus}
          </div>
        )}

        <button 
          onClick={goToHome}
          className="mt-6 w-full bg-blue-500 text-white py-3 hover:bg-blue-600 transition-colors flex items-center justify-center"
        >
          <Home className="mr-2" size={20} /> Go to Home
        </button>
      </div>
    </div>
  )
}
export default FormPage;