import React from 'react';
import { Box, Button, FormControl, Textarea, VStack } from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';
const AddCarCommentForm = ({ value, onSubmit }) => {
  return (
    <Formik
      initialValues={{
        comment: value?.comment || '',
      }}
      onSubmit={values => {
        onSubmit(values.comment);
      }}
    >
      {() => (
        <Box as={Form}>
          <VStack spacing={4} align="stretch">
            <FormControl>
              <Field
                as={Textarea}
                name="comment"
                placeholder="Přidejte komentář..."
              />
            </FormControl>

            <Button
              type="submit"
              bg="#6da305"
              color="white"
              _hover={{ bg: '#5c8e04' }}
            >
              {value?.comment ? 'Upravit' : 'Přidat'}
            </Button>
          </VStack>
        </Box>
      )}
    </Formik>
  );
};

export default AddCarCommentForm;
