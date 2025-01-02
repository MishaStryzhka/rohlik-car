import { useDispatch } from 'react-redux';
import { logIn } from 'redux/auth/operations';
import {
  Box,
  Button,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useState } from 'react';
import { useAuth } from 'hooks';
import { MdOutlineVisibility, MdVisibilityOff } from 'react-icons/md';

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
                  placeholder="heslo"
                />
                <InputRightElement width="4.5rem">
                  <Button
                    h="1.75rem"
                    px="8px"
                    border="1px"
                    borderColor="#dee2e6"
                    onClick={handleClick}
                  >
                    {show ? (
                      <MdVisibilityOff fontSize="20px" color="#6DA305" />
                    ) : (
                      <MdOutlineVisibility fontSize="20px" color="#6DA305" />
                    )}
                  </Button>
                </InputRightElement>
              </InputGroup>
            )}
          </Field>
          <ErrorMessage name="password" />
          <Box mt={8} textAlign="center">
            <Button
              bgColor="#6DA305"
              color="white"
              isLoading={isLoading}
              type="submit"
            >
              Přihlásit se
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};
