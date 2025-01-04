import { AddIcon } from '@chakra-ui/icons';
import { Box, Button, Text, VStack } from '@chakra-ui/react';
import { subscribeToFaqQuestions } from 'app';
import AddFaqQuestion from 'components/AddFaqQuestion/AddFaqQuestion';
import FAQItem from 'components/FAQItem/FAQItem';
import ModalWrapper from 'components/Modals/Modal';
import React, { useEffect, useState } from 'react';

const FAQ = () => {
  const [questions, setQuestions] = useState([]);
  const [isOpenModalAddQuestion, setIsOpenModalAddQuestion] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribeToFaqQuestions(data => setQuestions(data));

    return () => unsubscribe();
  }, []);

  return (
    <>
      <VStack
        align="stretch"
        spacing={4}
        mt={6}
        height="calc(100% - 65px)"
        overflow="auto"
        className="no-scrollbar"
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          gap={2}
        >
          <Text fontSize={{ base: '16px', xl: '2xl' }} fontWeight="bold">
            Nejčastější dotazy (FAQ)
          </Text>
          <Button
            bg="#6da305"
            color="white"
            _hover={{ bg: '#5c8e04' }}
            onClick={() => setIsOpenModalAddQuestion(true)}
            aria-label="Open Modal Add Question"
            position="relative"
            display="flex"
            alignItems="center"
            justifyContent="center"
            gap={2}
            padding="8px 16px"
            fontSize="small"
          >
            <AddIcon />
            Přidat otázku
          </Button>
        </Box>

        {questions
          .sort((a, b) => b.date.toDate() - a.date.toDate())
          .map(question => (
            <FAQItem key={question.id} {...question} />
          ))}
      </VStack>
      {/* Formulář pro přidání nové otázky */}
      {isOpenModalAddQuestion && (
        <ModalWrapper
          title="Přidat otázku"
          isOpen={isOpenModalAddQuestion}
          onClose={() => setIsOpenModalAddQuestion(false)}
        >
          <AddFaqQuestion onClose={() => setIsOpenModalAddQuestion(false)} />
        </ModalWrapper>
      )}
    </>
  );
};

export default FAQ;
