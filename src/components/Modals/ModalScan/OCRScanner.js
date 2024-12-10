import React, { useEffect, useRef } from 'react';
import Tesseract from 'tesseract.js';

const OCRScanner = ({ onRecognized }) => {
  const canvasRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
      videoRef.current.srcObject = stream;
      videoRef.current.play();
    });

    const processFrame = () => {
      const canvas = canvasRef.current;
      const video = videoRef.current;

      if (canvas && video) {
        const ctx = canvas.getContext('2d');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        Tesseract.recognize(canvas, 'eng').then(({ data }) => {
          if (data.text.trim()) {
            onRecognized(data.text.trim());
          }
        });
      }

      requestAnimationFrame(processFrame);
    };

    processFrame();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
    };
  }, [onRecognized]);

  return (
    <div>
      <video ref={videoRef} style={{ display: 'none' }} />
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );
};

export default OCRScanner;
