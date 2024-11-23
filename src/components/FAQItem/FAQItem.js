import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  ButtonGroup,
  IconButton,
  Text,
  Textarea,
} from '@chakra-ui/react';
import { updateFaqQuestion } from 'app';
import FaqQuestionComments from 'components/Loader/FaqQuestionComments/FaqQuestionComments';
import EmojiPicker from 'emoji-picker-react';
import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import { BsEmojiSmile } from 'react-icons/bs';
import { GrSend } from 'react-icons/gr';

const MotionBox = motion(Box);

const FAQItem = ({ id, question, answer: defAnswer }) => {
  const [answer, setAnswer] = useState(defAnswer);
  const textAnswerAreaRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const emojiPickerRef = useRef(null);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleEmojiClick = emoji => {
    setAnswer(prevComment => prevComment + emoji.emoji);
    setShowEmojiPicker(false); // Закрити пікер після вибору смайлика
    textAnswerAreaRef.current.focus();
  };

  const handleAnswerSubmit = async () => {
    if (!answer.trim()) {
      alert('Napište komentář!');
      return;
    }

    console.log('answer', answer);

    updateFaqQuestion({ questionId: id, question: { answer } });
  };

  return (
    <Box borderWidth="1px" borderRadius="md" p={4} mb={4} boxShadow="md">
      {/* Питання */}
      <Button
        height="auto"
        variant="ghost"
        onClick={toggleOpen}
        w="100%"
        justifyContent="space-between"
        rightIcon={isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
        _hover={{ bg: 'gray.50' }}
        _active={{ bg: 'gray.100' }}
      >
        <Text
          fontSize="lg"
          fontWeight="medium"
          textAlign="left"
          flex="1"
          whiteSpace="normal"
          wordBreak="break-word"
        >
          {question}
        </Text>
      </Button>

      {/* Відповідь */}
      <MotionBox
        initial={{ height: 0, opacity: 0 }}
        animate={
          isOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }
        }
        overflow={isOpen ? 'visible' : 'hidden'}
        transition={{ duration: 0.3 }}
        mt={2}
      >
        {defAnswer ? (
          <Text fontSize="md" color="gray.600" p={2}>
            {answer}
          </Text>
        ) : (
          <Box
            position="relative"
            border="1px solid #6da305"
            borderRadius="6px"
            pb="35px"
            mt={1}
          >
            <Textarea
              minH="60px"
              height="60px"
              placeholder="Napište odpověď..."
              value={answer}
              onChange={e => setAnswer(e.target.value)}
              border="none"
              _focusVisible={{ border: 'none' }}
              ref={textAnswerAreaRef}
              fontFamily="'Apple Color Emoji', 'Segoe UI Emoji', 'Noto Color Emoji', sans-serif"
            />
            <ButtonGroup
              position="absolute"
              bottom="5px"
              width="100%"
              display="flex"
              justifyContent="space-between"
              paddingX="10px"
            >
              <IconButton
                minW="none"
                width="30px"
                height="30px"
                icon={<BsEmojiSmile />}
                onClick={() => setShowEmojiPicker(prev => !prev)}
                aria-label="Add emoji"
                bg="transparent"
                color="#6da305"
                _hover={{ bg: '#5c8e04', color: '#fff' }}
              />
              <IconButton
                minW="none"
                width="30px"
                height="30px"
                icon={<GrSend />}
                onClick={handleAnswerSubmit}
                aria-label="Send answer"
                bg="transparent"
                color="#6da305"
                _hover={{ bg: '#5c8e04', color: '#fff' }}
              />
            </ButtonGroup>

            {/* Emoji Picker */}
            {showEmojiPicker && (
              <Box
                position="absolute"
                bottom="60px"
                right="8px"
                zIndex="10"
                ref={emojiPickerRef}
              >
                <EmojiPicker
                  onEmojiClick={handleEmojiClick}
                  theme="light" // Можна змінити на "dark"
                  // skinTonesDisabled={true}
                  // skinTonePickerLocation="PREVIEW"
                  // reactionsDefaultOpen={true}
                  // allowExpandReactions={false}
                  previewConfig={{
                    showPreview: false, // Прибирає блок попереднього перегляду
                  }}
                />
              </Box>
            )}
          </Box>
        )}

        <FaqQuestionComments id={id} />
      </MotionBox>
    </Box>
  );
};

export default FAQItem;
