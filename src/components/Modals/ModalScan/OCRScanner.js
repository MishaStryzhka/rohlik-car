import { Flex } from '@chakra-ui/react';
import React, { useRef, useState } from 'react';
import AnnotatedImage from './AnnotatedImage';
import Webcam from 'react-webcam';

const OCRScanner = ({ onRecognized }) => {
  // eslint-disable-next-line no-unused-vars
  const [isProcessing, setIsProcessing] = useState(false);
  const webcamRef = useRef(null);
  const [image, setImage] = useState(null);
  const [annotations, setAnnotations] = useState(null);
  console.log('image', image);

  // const handleCapture = async () => {
  //   setIsProcessing(true);

  //   const canvas = canvasRef.current;
  //   const video = videoRef.current;

  //   if (canvas && video) {
  //     const ctx = canvas.getContext('2d');
  //     canvas.width = video.videoWidth;
  //     canvas.height = video.videoHeight;
  //     ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

  //     const image = canvas.toDataURL('image/png'); // Перетворення кадру в Base64-формат

  //     setImage(image);
  //     // Викликаємо Vision API
  //     try {
  //       const response = await fetch(
  //         `https://vision.googleapis.com/v1/images:annotate?key=${process.env.REACT_APP_CLOUD_VISION_API_KEY}`,
  //         {
  //           method: 'POST',
  //           headers: {
  //             'Content-Type': 'application/json',
  //           },
  //           body: JSON.stringify({
  //             requests: [
  //               {
  //                 image: {
  //                   content: image.split(',')[1], // Відокремлюємо Base64-контент
  //                 },
  //                 features: [
  //                   {
  //                     type: 'TEXT_DETECTION', // Використовуємо розпізнавання тексту
  //                   },
  //                 ],
  //               },
  //             ],
  //           }),
  //         }
  //       );

  //       const result = await response.json();

  //       // const result = {
  //       //   responses: [
  //       //     {
  //       //       fullTextAnnotation: {
  //       //         pages: [
  //       //           {
  //       //             property: {},
  //       //             width: 640,
  //       //             height: 480,
  //       //             blocks: [
  //       //               {
  //       //                 boundingBox: {
  //       //                   vertices: [
  //       //                     { x: 151, y: 257 },
  //       //                     { x: 273, y: 229 },
  //       //                     { x: 281, y: 263 },
  //       //                     { x: 159, y: 291 },
  //       //                   ],
  //       //                 },
  //       //                 paragraphs: Array(1),
  //       //                 blockType: 'TEXT',
  //       //               },
  //       //             ],
  //       //           },
  //       //         ],
  //       //         text: 'CD 412',
  //       //       },
  //       //       textAnnotations: [
  //       //         { locale: 'en', description: 'CD 412', boundingPoly: {} },
  //       //         { description: 'CD', boundingPoly: {} },
  //       //         { description: '412', boundingPoly: {} },
  //       //       ],
  //       //     },
  //       //   ],
  //       // };
  //       console.log('result', result);
  //       const detectedText =
  //         result.responses[0].textAnnotations[0]?.description ||
  //         'Текст не розпізнано';
  //       setAnnotations(result.responses[0].textAnnotations);
  //       setIsProcessing(false);
  //       console.log('detectedText', detectedText);
  //       onRecognized(detectedText.replace(/\s+/g, ''));
  //     } catch (error) {
  //       console.error('Error with Vision API:', error);
  //       setIsProcessing(false);
  //       alert('Сталася помилка при розпізнаванні тексту.');
  //     }
  //   }
  // };

  const capturePhoto = async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);

    // Викликаємо Vision API
    try {
      const response = await fetch(
        `https://vision.googleapis.com/v1/images:annotate?key=${process.env.REACT_APP_CLOUD_VISION_API_KEY}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            requests: [
              {
                image: {
                  content: imageSrc.split(',')[1], // Відокремлюємо Base64-контент
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
        result.responses[0].textAnnotations[0]?.description ||
        'Текст не розпізнано';
      setAnnotations(result.responses[0].textAnnotations);
      setIsProcessing(false);
      console.log('detectedText', detectedText);
      onRecognized(detectedText.replace(/\s+/g, ''));
    } catch (error) {
      console.error('Error with Vision API:', error);
      setIsProcessing(false);
      alert('Сталася помилка при розпізнаванні тексту.');
    }
  };

  const videoConstraints = {
    facingMode: 'environment',
  };

  return (
    <Flex
      justify="center"
      align="center"
      height={{
        base: 'calc(100vh - 140px)',
        md: 'calc(100vh - 110px)',
      }}
      position="relative"
    >
      {!image ? (
        <>
          <Webcam
            audio={false}
            ref={webcamRef}
            videoConstraints={videoConstraints}
            screenshotFormat="image/jpeg"
            style={{ maxWidth: '100%', maxHeight: '100%', borderRadius: '8px' }}
          />
          <button
            onClick={capturePhoto}
            style={{
              position: 'absolute',
              bottom: '10px',
              width: '50px',
              height: '50px',
              borderRadius: '30px',
              backgroundColor: 'gray',
            }}
          ></button>
        </>
      ) : (
        <>
          <AnnotatedImage imageSrc={image} annotations={annotations} />
          <button
            onClick={() => setImage(null)}
            style={{
              position: 'absolute',
              bottom: '10px',
              width: '50px',
              height: '50px',
              borderRadius: '30px',
              backgroundColor: 'gray',
              boxShadow: '0px 0px 5px 2px #fff inset',
            }}
          ></button>
        </>
      )}
    </Flex>
  );
};

export default OCRScanner;
