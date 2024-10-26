import React from 'react'

function Alert(props) {
  // Destructure props with default values
  const { 
    children, 
    type = 'info', 
    title, 
    onClose 
  } = props;

  // Define color schemes for different alert types
  const types = {
    info: 'bg-blue-100 border-blue-500 text-blue-900',
    success: 'bg-green-100 border-green-500 text-green-900',
    warning: 'bg-yellow-100 border-yellow-500 text-yellow-900',
    error: 'bg-red-100 border-red-500 text-red-900'
  };

  return (
    <div className={`${types[type]} border-l-4 p-4 mb-4 rounded`}>
      {title && (
        <div className="font-bold mb-2">{title}</div>
      )}
      <div className="flex justify-between items-start">
        <div className="flex-1">
          {children}
        </div>
        {onClose && (
          <button 
            onClick={onClose}
            className="ml-4 text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
}

export default Alert;