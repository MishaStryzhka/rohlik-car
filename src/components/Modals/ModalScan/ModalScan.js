import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import React, { createContext, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import OCRScanner from './OCRScanner';

export const ModalScanContext = createContext(null);

const ModalScan = ({ isOpen, onClose }) => {
  const [allowedTexts, setAllowedTexts] = useState([]);

  const handleRecognized = text => {
    setAllowedTexts(pref => [...pref, text]);
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return createPortal(
    <ModalScanContext.Provider value={{ isOpen, onClose }}>
      <Modal
        motionPreset="slideInBottom"
        isOpen={isOpen}
        onClose={onClose}
        size="full"
        isCentered
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent mt={20} borderTopRadius={20}>
          <ModalHeader>Real-Time OCR Scanner Text: {allowedTexts}</ModalHeader>
          <ModalCloseButton />
          <ModalBody p={0} h="100%">
            <OCRScanner onRecognized={handleRecognized} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </ModalScanContext.Provider>,
    document.getElementById('modalScan')
  );
};

export default ModalScan;
