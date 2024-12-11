"use client";

import React, { useState, useEffect } from 'react';

export default function PasswordVault() {
  const [passwords, setPasswords] = useState([]);
  const [newEntry, setNewEntry] = useState({ website: '', username: '', password: '' });

  // Fetch saved passwords from localStorage when the component mounts
  useEffect(() => {
    const savedPasswords = JSON.parse(localStorage.getItem('passwords')) || [];
    setPasswords(savedPasswords);
  }, []);

  // Save passwords to localStorage whenever the passwords array changes
  useEffect(() => {
    if (passwords.length > 0) {
      localStorage.setItem('passwords', JSON.stringify(passwords));
    }
  }, [passwords]);

  const handleAddPassword = () => {
    setPasswords([...passwords, newEntry]);
    setNewEntry({ website: '', username: '', password: '' });
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-4">Password Vault</h1>
      <div className="flex flex-col items-center gap-4">
        <input
          type="text"
          placeholder="Website"
          value={newEntry.website}
          onChange={(e) => setNewEntry({ ...newEntry, website: e.target.value })}
          className="border rounded-md p-2 w-full max-w-md"
        />
        <input
          type="text"
          placeholder="Username"
          value={newEntry.username}
          onChange={(e) => setNewEntry({ ...newEntry, username: e.target.value })}
          className="border rounded-md p-2 w-full max-w-md"
        />
        <input
          type="password"
          placeholder="Password"
          value={newEntry.password}
          onChange={(e) => setNewEntry({ ...newEntry, password: e.target.value })}
          className="border rounded-md p-2 w-full max-w-md"
        />
        <button
          onClick={handleAddPassword}
          className="bg-[#00F5D4] text-white px-4 py-2 rounded-md hover:bg-[#00D4B3]"
        >
          Add Password
        </button>
      </div>
      <div className="mt-6">
        <h2 className="text-2xl font-semibold mb-3">Saved Passwords</h2>
        <ul className="list-disc pl-5">
          {passwords.map((entry, index) => (
            <li key={index} className="mb-2">
              <strong>{entry.website}</strong>: {entry.username} - {entry.password}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
