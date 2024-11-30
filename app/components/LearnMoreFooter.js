import React from 'react';

export default function LearnMoreFooter() {
  return (
    <footer className="bg-black text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="text-sm">
            <p>&copy; 2024 CyberSecure. All rights reserved.</p>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-purple-500">Privacy Policy</a>
            <a href="#" className="hover:text-purple-500">Terms of Service</a>
            <a href="#" className="hover:text-purple-500">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
