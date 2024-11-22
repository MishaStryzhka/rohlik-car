import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import { Box, Button, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useState } from 'react';

const MotionBox = motion(Box);

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Box borderWidth="1px" borderRadius="md" p={4} mb={4} boxShadow="md">
      {/* Питання */}
      <Button
        variant="ghost"
        onClick={toggleOpen}
        w="100%"
        justifyContent="space-between"
        rightIcon={isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
      >
        <Text fontSize="lg" fontWeight="medium" textAlign="left">
          {question}
        </Text>
      </Button>

      {/* Відповідь */}
      <MotionBox
        initial={{ height: 0, opacity: 0 }}
        animate={
          isOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }
        }
        overflow="hidden"
        transition={{ duration: 0.3 }}
        mt={2}
      >
        <Text fontSize="md" color="gray.600" p={2}>
          {answer}
        </Text>
      </MotionBox>
    </Box>
  );
};

export default FAQItem;
