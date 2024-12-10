import React, { useEffect, useRef } from 'react';
import Tesseract from 'tesseract.js';

const OCRScanner = ({ onRecognized }) => {
  const canvasRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    // Запускаємо відеопотік з камери
    navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    });

    return () => {
      // Зупиняємо відеопотік при розмонтуванні компонента
      if (videoRef.current && videoRef.current.srcObject) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const handleCapture = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;

    if (canvas && video) {
      const ctx = canvas.getContext('2d');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Розпізнаємо текст з canvas
      Tesseract.recognize(canvas, 'eng').then(({ data }) => {
        if (data.text.trim()) {
          onRecognized(data.text.trim());
        } else {
          onRecognized('Текст не розпізнано');
        }
      });
    }
  };

  return (
    <div>
      <video ref={videoRef} style={{ width: '100%', maxWidth: '500px' }} />
      <button onClick={handleCapture}>Сканувати</button>
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );
};

export default OCRScanner;
