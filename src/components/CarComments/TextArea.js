import { Box, ButtonGroup, IconButton, Textarea } from '@chakra-ui/react';
import EmojiPicker from 'emoji-picker-react';
import React, { useEffect, useRef, useState } from 'react';
import { BsEmojiSmile } from 'react-icons/bs';
import { GrSend } from 'react-icons/gr';

const TextArea = ({ hendleAddComment }) => {
  const [comment, setComment] = useState('');
  const textareaRef = useRef(null);
  const emojiPickerRef = useRef(null);

  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleTextSubmit = () => {
    console.log('text', comment);
    hendleAddComment(comment);
  };

  // =============== Emoji =================
  const handleEmojiClick = emoji => {
    setComment(prevComment => prevComment + emoji.emoji);
    setShowEmojiPicker(false); // Закрити пікер після вибору смайлика
    textareaRef.current.focus();
  };

  const handleClickOutside = event => {
    // Якщо клік поза меню, закриваємо його
    if (
      emojiPickerRef.current &&
      !emojiPickerRef.current.contains(event.target)
    ) {
      setShowEmojiPicker(false);
    }
  };

  useEffect(() => {
    // Додаємо обробник кліків на весь документ
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Видаляємо обробник при розмонтуванні компонента
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  // ========================================

  return (
    <Box position="relative" borderTop="2px solid #6da305" pb="35px">
      <Textarea
        pb={0}
        h={20}
        placeholder="Napište komentář..."
        value={comment}
        onChange={e => setComment(e.target.value)}
        border="none"
        _focusVisible={{ border: 'none' }}
        ref={textareaRef}
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
          onClick={handleTextSubmit}
          aria-label="Send comment"
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
  );
};

export default TextArea;
