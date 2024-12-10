import React, { useCallback, useEffect, useRef, useState } from 'react';
import Tesseract from 'tesseract.js';

const OCRScanner = ({ onRecognized }) => {
  const canvasRef = useRef(null);
  const videoRef = useRef(null);
  const [useRearCamera, setUseRearCamera] = useState(true); // Стан для вибору камери

  const startCamera = useCallback(() => {
    // const constraints = {
    //   video: {
    //     facingMode: useRearCamera ? 'environment' : 'user', // Перемикаємо між "environment" (задня камера) і "user" (передня камера)
    //   },
    // };

    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: 'environment' } })
      .then(stream => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
      })
      .catch(error => {
        console.error('Error accessing camera:', error);
        alert('Не вдалося отримати доступ до камери.');
      });
  }, []);

  useEffect(() => {
    startCamera(); // Запускаємо камеру при завантаженні компонента

    return () => {
      // Зупиняємо камеру при розмонтуванні
      if (videoRef.current && videoRef.current.srcObject) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
    };
  }, [startCamera, useRearCamera]); // Перезапуск камери при зміні типу камери

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

  const toggleCamera = () => {
    setUseRearCamera(prev => !prev); // Перемикаємо між передньою і задньою камерою
  };

  return (
    <div>
      <video ref={videoRef} style={{ width: '100%', maxWidth: '500px' }} />
      <button onClick={handleCapture}>Сканувати</button>
      <button onClick={toggleCamera}>
        Перемкнути на {useRearCamera ? 'передню' : 'задню'} камеру
      </button>
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );
};

export default OCRScanner;
