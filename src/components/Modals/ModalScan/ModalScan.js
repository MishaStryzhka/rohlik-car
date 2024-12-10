import {
  Box,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import OCRScanner from './OCRScanner';
import CameraFeed from './CameraFeed';
// import CameraFeed from './CameraFeed';
// import { ref } from 'firebase/storage';
// import { db } from 'firebase/config';

const ModalScan = ({ isOpen, onClose }) => {
  const [allowedTexts, setAllowedTexts] = useState([]);
  //   const [recognizedText, setRecognizedText] = useState('');

  useEffect(() => {
    // const allowedRef = ref(db, 'allowedTexts/');
    // onValue(allowedRef, snapshot => {
    //   const data = snapshot.val();
    //   setAllowedTexts(Object.values(data || {}));
    // });
  }, []);

  const handleRecognized = text => {
    console.log('text', text);
    setAllowedTexts(pref => [...pref, text]);
    // setRecognizedText(text);

    // if (allowedTexts.includes(text)) {
    //   alert(`Text "${text}" is allowed!`);
    // }
  };

  return createPortal(
    <Modal
      motionPreset="slideInBottom"
      isOpen={isOpen}
      onClose={onClose}
      size="full"
      isCentered
    >
      <ModalOverlay />
      <ModalContent mt={20} borderTopRadius={20}>
        <ModalHeader>Real-Time OCR Scanner Text: {allowedTexts}</ModalHeader>
        <ModalCloseButton />
        <ModalBody p={4}>
          <div>
            <Box width="300px" height="200px">
              <CameraFeed />
            </Box>
            <OCRScanner onRecognized={handleRecognized} />
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>,
    document.getElementById('modalScan')
  );
};

export default ModalScan;
