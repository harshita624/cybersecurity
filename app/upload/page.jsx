'use client';

import { useState } from 'react';

const FileUploadPage = () => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file first.');
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/scan', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      setResult(data.result ? JSON.stringify(data.result) : 'No results found.');
    } catch (error) {
      console.error('Error uploading file:', error);
      setResult('Error scanning file. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1>File Upload & Threat Detection</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={loading}>
        {loading ? 'Uploading...' : 'Upload & Scan'}
      </button>
      {result && (
        <div style={{ marginTop: '1rem', whiteSpace: 'pre-wrap' }}>
          <strong>Scan Result:</strong>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
};

export default FileUploadPage;
