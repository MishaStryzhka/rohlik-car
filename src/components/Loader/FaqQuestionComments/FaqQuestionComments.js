import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Textarea,
  VStack,
  IconButton,
  ButtonGroup,
} from '@chakra-ui/react';
import { db } from '../../../firebase/config';
import { collection, onSnapshot } from 'firebase/firestore';
import OneComment from 'components/CarComments/OneComment';
import { GrSend } from 'react-icons/gr';
import { addComment } from 'app';
import { useAuth } from 'hooks';
import { BsEmojiSmile } from 'react-icons/bs';
import EmojiPicker from 'emoji-picker-react';

const FaqQuestionComments = ({ id: questionId }) => {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const emojiPickerRef = useRef(null);
  const textareaRef = useRef(null);

  const handleEmojiClick = emoji => {
    setComment(prevComment => prevComment + emoji.emoji);
    setShowEmojiPicker(false); // Закрити пікер після вибору смайлика
    textareaRef.current.focus();
  };

  useEffect(() => {
    const commentsRef = collection(db, 'questions', questionId, 'comments');
    const unsubscribe = onSnapshot(commentsRef, snapshot => {
      const questionCommentsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setComments(questionCommentsData);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [questionId]);

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

  const handleCommentSubmit = async () => {
    if (!comment.trim()) {
      alert('Napište komentář!');
      return;
    }

    try {
      await addComment({
        collectionName: 'questions',
        elemId: questionId,
        commentText: comment,
        user,
      });
      setComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <Box>
      {comments.length > 0 && (
        <VStack align="stretch" spacing={4} mt={4} gap={1}>
          {comments
            .sort((a, b) => a.CreatedAt.toDate() - b.CreatedAt.toDate())
            .map(comment => (
              <OneComment
                key={comment.id}
                colectionsName="questions"
                elemId={questionId}
                commentId={comment.id}
                userId={comment.userId}
                name={comment.name}
                date={comment.CreatedAt}
                text={comment.text}
              />
            ))}
        </VStack>
      )}

      <Box
        position="relative"
        border="1px solid #6da305"
        borderRadius="6px"
        pb="35px"
        mt={1}
      >
        <Textarea
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
            onClick={handleCommentSubmit}
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
    </Box>
  );
};

export default FaqQuestionComments;
