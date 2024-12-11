// components/FileInputScanner.js
import React, { useState } from 'react';

const FileInputScanner = ({ onScan }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
        onScan(reader.result);  // Send the image to parent or API
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {selectedImage && <img src={selectedImage} alt="Scanned" />}
    </div>
  );
};

export default FileInputScanner;
