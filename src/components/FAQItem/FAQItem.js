import { ChevronDownIcon, ChevronUpIcon, CloseIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  ButtonGroup,
  IconButton,
  Image,
  Text,
  Textarea,
} from '@chakra-ui/react';
import { updateFaqQuestion } from 'app';
import FaqQuestionComments from 'components/FaqQuestionComments/FaqQuestionComments';
import EmojiPicker from 'emoji-picker-react';
import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import { BsEmojiSmile } from 'react-icons/bs';
import { GrSend } from 'react-icons/gr';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import './fullscreenSwiper.css';

const MotionBox = motion(Box);

const FAQItem = ({ id, images, question, answer: defAnswer }) => {
  const [answer, setAnswer] = useState(defAnswer);
  const textAnswerAreaRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const emojiPickerRef = useRef(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleEmojiClick = emoji => {
    setAnswer(prevComment => prevComment + emoji.emoji);
    setShowEmojiPicker(false);
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

  const handleImageClick = index => {
    setCurrentIndex(index);
    setIsFullscreen(true);
  };

  const handleCloseFullscreen = () => {
    setIsFullscreen(false);
  };

  return (
    <Box borderWidth="1px" borderRadius="md" p={4} mb={4} boxShadow="md">
      {/* Питання */}
      <Button
        maxWidth="100%"
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
        {images?.length > 0 && (
          <Box>
            <Swiper
              slidesPerView={3}
              spaceBetween={10}
              pagination={{
                clickable: true,
              }}
              modules={[Pagination]}
              className="mySwiper"
              breakpoints={{
                480: {
                  slidesPerView: 3,
                  spaceBetween: 5,
                },
                768: {
                  slidesPerView: 5,
                  spaceBetween: 10,
                },
                1280: {
                  slidesPerView: 6,
                  spaceBetween: 10,
                },
              }}
            >
              {images.map((img, index) => (
                <SwiperSlide>
                  <Image
                    src={img}
                    // width="100px"
                    height={{ base: '120px', md: '150px', xl: '200px' }}
                    objectFit="cover"
                    borderRadius="md"
                    boxShadow="md"
                    onClick={() => handleImageClick(index)} // Відкриття повноекранного режиму
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </Box>
        )}

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
              placeholder="Napište odpověď..."
              value={answer}
              onChange={e => setAnswer(e.target.value)}
              border="none"
              _focusVisible={{ border: 'none' }}
              ref={textAnswerAreaRef}
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
            {isFullscreen && (
              <Box
                position="fixed"
                top={0}
                left={0}
                width="100vw"
                height="100vh"
                bg="rgba(0, 0, 0, 0.9)"
                zIndex={99}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                {/* Кнопка закриття */}
                <IconButton
                  icon={<CloseIcon />}
                  position="absolute"
                  top="20px"
                  right="20px"
                  onClick={handleCloseFullscreen}
                  colorScheme="whiteAlpha"
                  aria-label="Close fullscreen gallery"
                  zIndex={999}
                />

                <Swiper
                  slidesPerView={1}
                  spaceBetween={10}
                  pagination={{
                    clickable: true,
                  }}
                  modules={[Pagination]}
                  className="fullscreenSwiper"
                  initialSlide={currentIndex} // Встановити початковий слайд
                >
                  {images.map((img, index) => (
                    <SwiperSlide style={{ alignItems: 'center' }} key={index}>
                      <Image
                        src={img}
                        alt={`Image ${index + 1}`}
                        maxHeight="100%"
                        m="auto"
                        borderRadius="md"
                        objectFit={'cover'}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
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
