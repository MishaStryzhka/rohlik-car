import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { createPortal } from 'react-dom';

const ModalWrapper = ({ title, isOpen, onClose, children }) => {
  return createPortal(
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title || 'Přidat auto'}</ModalHeader>
        <ModalCloseButton />
        <ModalBody p={4}>{children}</ModalBody>
      </ModalContent>
    </Modal>,
    document.getElementById('modal')
  );
};

export default ModalWrapper;
