import { useDispatch } from 'react-redux';
import { logIn } from 'redux/auth/operations';
import { Button, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useState } from 'react';
import { useAuth } from 'hooks';

export const LoginForm = () => {
  const dispatch = useDispatch();
  const { isLoading } = useAuth();
  const [show, setShow] = useState(false);

  const handleClick = () => setShow(!show);

  const handleSubmit = e => {
    dispatch(logIn(e));
  };

  return (
    <Formik
      initialValues={{
        id: '',
        password: '',
      }}
      onSubmit={handleSubmit}
    >
      {props => (
        <Form style={{ width: '100%' }}>
          <Field name="id">
            {({ field }) => (
              <InputGroup minW={{ base: '100%', md: '400px' }}>
                <Input {...field} placeholder="id" />
              </InputGroup>
            )}
          </Field>
          <ErrorMessage name="userId" />
          <Field name="password">
            {({ field }) => (
              <InputGroup mt={4} minW={{ base: '100%', md: '400px' }}>
                <Input
                  {...field}
                  pr="4.5r em"
                  type={show ? 'text' : 'password'}
                  placeholder="Enter password"
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleClick}>
                    {show ? 'Hide' : 'Show'}
                  </Button>
                </InputRightElement>
              </InputGroup>
            )}
          </Field>
          <ErrorMessage name="password" />
          <Button
            mt={8}
            mx="calc(50% - 40px)"
            colorScheme="teal"
            isLoading={isLoading}
            type="submit"
          >
            log In
          </Button>
        </Form>
      )}
    </Formik>
  );
};
