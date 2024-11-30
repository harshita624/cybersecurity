// components/Alert.js
"use client"

import { X } from 'lucide-react';

export default function Alert({ message, type = 'info', onClose }) {
  const baseStyles = "fixed top-4 right-4 p-4 rounded-lg shadow-lg flex items-center justify-between max-w-sm";
  const typeStyles = {
    info: "bg-blue-100 text-blue-800",
    success: "bg-green-100 text-green-800",
    error: "bg-red-100 text-red-800",
    warning: "bg-yellow-100 text-yellow-800"
  };

  return (
    <div className={`${baseStyles} ${typeStyles[type]}`}>
      <span>{message}</span>
      {onClose && (
        <button
          onClick={onClose}
          className="ml-4 hover:opacity-70 transition-opacity"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}