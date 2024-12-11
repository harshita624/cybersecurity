// components/WebCamCapture.js
import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';

const WebCamCapture = ({ onCapture }) => {
  const webcamRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImageSrc(imageSrc);
    onCapture(imageSrc);  // Send image to parent or API
  }, [webcamRef]);

  return (
    <div>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width="100%"
        videoConstraints={{
          facingMode: "environment",
        }}
      />
      <button onClick={capture}>Capture</button>
      {imageSrc && (
        <div>
          <img src={imageSrc} alt="Captured" />
        </div>
      )}
    </div>
  );
};

export default WebCamCapture;
