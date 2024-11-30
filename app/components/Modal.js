// components/Modal.js
import React from "react";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-600">
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
