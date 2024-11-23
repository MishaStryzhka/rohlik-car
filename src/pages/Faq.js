import { AddIcon } from '@chakra-ui/icons';
import { Box, Button, Text, VStack } from '@chakra-ui/react';
import { nanoid } from '@reduxjs/toolkit';
import { subscribeToFaqQuestions } from 'app';
import AddFaqQuestion from 'components/AddFaqQuestion/AddFaqQuestion';
import FAQItem from 'components/FAQItem/FAQItem';
import ModalWrapper from 'components/Modal/Modal';
import React, { useEffect, useState } from 'react';

const faqData = [
  {
    id: nanoid(),
    question: 'Co je Help-Book?',
    answer:
      'Help-Book je platforma pro kurýry, která pomáhá organizovat jejich práci a zajišťuje lepší přehled o jejich vozidlech.',
  },
  {
    id: nanoid(),
    question: 'Jak mohu přidat auto?',
    answer:
      'Můžete přidat auto kliknutím na tlačítko "Přidat auto" a vyplněním potřebných informací.',
  },
  {
    id: nanoid(),
    question: 'Jaké jsou podporované typy aut?',
    answer: 'Podporované typy aut zahrnují CD, CDV, D, OV a EXP.',
  },
];

const FAQ = () => {
  const [questions, setQuestions] = useState(faqData);
  const [isOpenModalAddQuestion, setIsOpenModalAddQuestion] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribeToFaqQuestions(data => {
      setQuestions([...faqData, ...data]);
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      <VStack align="stretch" spacing={4} mt={6}>
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

        {questions.map((question, index) => (
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
