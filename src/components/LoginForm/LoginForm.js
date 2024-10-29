import { useDispatch } from 'react-redux';
import { logIn } from 'redux/auth/operations';
import { Button, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useState } from 'react';

export const LoginForm = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const handleClick = () => setShow(!show);

  const handleSubmit = e => {
    dispatch(logIn(e));
  };

  return (
    <Formik
      initialValues={{
        id: '',
        pin: '',
      }}
      onSubmit={handleSubmit}
    >
      {props => (
        <Form style={{ width: '100%' }}>
          <Field name="id">
            {({ field }) => (
              <InputGroup minW={{ base: '100%', md: '400px' }}>
                <Input {...field} placeholder="ID" />
              </InputGroup>
            )}
          </Field>
          <ErrorMessage name="userId" />
          <Field name="pin">
            {({ field }) => (
              <InputGroup mt={4} minW={{ base: '100%', md: '400px' }}>
                <Input
                  {...field}
                  pr="4.5r em"
                  type={show ? 'text' : 'password'}
                  placeholder="Enter pin"
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleClick}>
                    {show ? 'Hide' : 'Show'}
                  </Button>
                </InputRightElement>
              </InputGroup>
            )}
          </Field>
          <ErrorMessage name="pin" />
          <Button
            mt={8}
            mx="calc(50% - 40px)"
            colorScheme="teal"
            isLoading={props.isSubmitting}
            type="submit"
          >
            log In
          </Button>
        </Form>
      )}
    </Formik>
  );
};
