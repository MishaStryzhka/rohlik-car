import { Box, Flex, Image } from '@chakra-ui/react';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import AnnotatedImage from './AnnotatedImage';

const OCRScanner = ({ onRecognized }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const canvasRef = useRef(null);
  const videoRef = useRef(null);
  const [image, setImage] = useState(null);
  const [annotations, setAnnotations] = useState(null);

  const startCamera = useCallback(() => {
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
  }, [startCamera]);

  const handleCapture = async () => {
    setIsProcessing(true);

    const canvas = canvasRef.current;
    const video = videoRef.current;

    if (canvas && video) {
      const ctx = canvas.getContext('2d');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      const image = canvas.toDataURL('image/png'); // Перетворення кадру в Base64-формат

      setImage(image);
      // Викликаємо Vision API
      try {
        const response = await fetch(
          `https://vision.googleapis.com/v1/images:annotate?key=AIzaSyC7XaJepPoBSwzFYPrHgEEr3QYBPXTYDcA`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              requests: [
                {
                  image: {
                    content: image.split(',')[1], // Відокремлюємо Base64-контент
                  },
                  features: [
                    {
                      type: 'TEXT_DETECTION', // Використовуємо розпізнавання тексту
                    },
                  ],
                },
              ],
            }),
          }
        );

        const result = await response.json();

        // const result = {
        //   responses: [
        //     {
        //       fullTextAnnotation: {
        //         pages: [
        //           {
        //             property: {},
        //             width: 640,
        //             height: 480,
        //             blocks: [
        //               {
        //                 boundingBox: {
        //                   vertices: [
        //                     { x: 151, y: 257 },
        //                     { x: 273, y: 229 },
        //                     { x: 281, y: 263 },
        //                     { x: 159, y: 291 },
        //                   ],
        //                 },
        //                 paragraphs: Array(1),
        //                 blockType: 'TEXT',
        //               },
        //             ],
        //           },
        //         ],
        //         text: 'CD 412',
        //       },
        //       textAnnotations: [
        //         { locale: 'en', description: 'CD 412', boundingPoly: {} },
        //         { description: 'CD', boundingPoly: {} },
        //         { description: '412', boundingPoly: {} },
        //       ],
        //     },
        //   ],
        // };
        console.log('result', result);
        const detectedText =
          result.responses[0].fullTextAnnotation?.text || 'Текст не розпізнано';
        setAnnotations(result.responses[0].fullTextAnnotation.pages[0].blocks);
        setIsProcessing(false);
        console.log('detectedText', detectedText);
        onRecognized(detectedText);
      } catch (error) {
        console.error('Error with Vision API:', error);
        setIsProcessing(false);
        alert('Сталася помилка при розпізнаванні тексту.');
      }
    }
  };

  // const annotations = [
  //   {
  //     boundingBox: {
  //       vertices: [
  //         { x: 151, y: 257 },
  //         { x: 273, y: 229 },
  //         { x: 281, y: 263 },
  //         { x: 159, y: 291 },
  //       ],
  //     },
  //   },
  //   // Можна додати інші області
  // ];

  return (
    <Flex justify="center" height="calc(100vh - 140px)" position="relative">
      {image ? (
        <AnnotatedImage imageSrc={image} annotations={annotations} />
      ) : (
        <>
          {/* Відеопотік */}
          <Box
            position="relative"
            display="inline-block"
            w="100%"
            height="100%"
          >
            <video
              ref={videoRef}
              style={{
                width: '100%',
                height: '100%',
                // maxWidth: '400px',
                border: '1px solid #ccc',
                borderRadius: '8px',
              }}
            />
            {/* Canvas для обробки (не відображається) */}
            <canvas ref={canvasRef} style={{ display: 'none' }} />
          </Box>
        </>
      )}
      <button
        style={{
          position: 'absolute',
          bottom: '10px',
          width: '50px',
          height: '50px',
          borderRadius: '30px',
          backgroundColor: 'gray',
        }}
        onClick={handleCapture}
      ></button>
    </Flex>
  );
};

export default OCRScanner;
