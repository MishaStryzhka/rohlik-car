import PropTypes from 'prop-types';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import {
  Button,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import { PhoneIcon } from '@chakra-ui/icons';

const FormPhonebook = ({ onSubmit }) => {
  const handleSubmit = (values, { resetForm }) => {
    onSubmit(values);
    resetForm();
  };

  return (
    <>
      <Heading as="h2" size="1xl" noOfLines={1}>
        Add contact
      </Heading>

      <Formik
        initialValues={{
          name: '',
          number: '',
        }}
        validate={values => {
          let errors = {};
          if (!values.name) errors.name = 'Enter a name in the field ⬆️.';
          if (!values.number) errors.number = 'Enter a number in the field ⬆️.';
          return errors;
        }}
        onSubmit={handleSubmit}
      >
        {props => (
          <Form>
            <Field name="name">
              {({ field }) => (
                <InputGroup mt={5} minW="300px">
                  <Input
                    bg="orange.200"
                    borderColor="orange.300"
                    sx={{
                      ':hover': {
                        borderColor: 'orange.500',
                      },
                      ':focus-visible': {
                        borderColor: 'orange.500',
                        borderWidth: '2px',
                        boxShadow: 'none',
                      },
                    }}
                    color="orange.900"
                    {...field}
                    placeholder="name"
                  />
                </InputGroup>
              )}
            </Field>
            <ErrorMessage name="name" />
            <Field name="number">
              {({ field }) => (
                <InputGroup mt={5}>
                  <InputLeftElement pointerEvents="none">
                    <PhoneIcon color="gray.300" />
                  </InputLeftElement>
                  <Input
                    bg="orange.200"
                    borderColor="orange.300"
                    sx={{
                      ':hover': {
                        borderColor: 'orange.500',
                      },
                      ':focus-visible': {
                        borderColor: 'orange.500',
                        borderWidth: '2px',
                        boxShadow: 'none',
                      },
                    }}
                    type="tel"
                    {...field}
                    placeholder="Phone number"
                  />
                </InputGroup>
              )}
            </Field>
            <ErrorMessage name="number" />
            <Button
              mt={8}
              mx="calc(50% - 40px)"
              colorScheme="orange"
              color="orange.200"
              isLoading={props.isSubmitting}
              type="submit"
            >
              Add
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};

FormPhonebook.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default FormPhonebook;
