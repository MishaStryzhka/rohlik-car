import { Flex } from '@chakra-ui/react';
import React, { useRef, useState } from 'react';
import AnnotatedImage from './AnnotatedImage';
import Webcam from 'react-webcam';

const OCRScanner = ({ onRecognized }) => {
  const webcamRef = useRef(null);
  const [image, setImage] = useState(null);
  const [annotations, setAnnotations] = useState(null);

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
      console.log('result', result);
      // eslint-disable-next-line no-unused-vars
      const [_, ...newAnnotations] = result?.responses[0]?.textAnnotations;
      const detectedText = newAnnotations
        ? newAnnotations.map(a => `${a.description}, `)
        : 'Текст не розпізнано';
      console.log('detectedText', detectedText);
      setAnnotations(newAnnotations);
      onRecognized(detectedText);
    } catch (error) {
      console.error('Error with Vision API:', error);
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
