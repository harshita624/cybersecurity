
"use client";
import React from 'react';

export default function SecurityGuide() {
  const guides = [
    { title: 'Protect Your Accounts', description: 'Use strong passwords and enable 2FA for all accounts.' },
    { title: 'Recognize Phishing Attacks', description: 'Learn how to identify and avoid phishing scams.' },
    { title: 'Secure Your Devices', description: 'Keep your software updated and use antivirus tools.' },
    { title: 'Browse Safely', description: 'Avoid unsecured websites and use HTTPS connections.' },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-4">Security Guide</h1>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {guides.map((guide, index) => (
          <div key={index} className="p-4 border rounded-md shadow-md bg-white">
            <h2 className="text-xl font-semibold mb-2">{guide.title}</h2>
            <p className="text-gray-700">{guide.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
