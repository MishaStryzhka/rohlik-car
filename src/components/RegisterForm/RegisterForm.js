import { useDispatch } from 'react-redux';
import { register } from 'redux/auth/operations';
import { useAuth } from 'hooks';
import {
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Text,
} from '@chakra-ui/react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { EmailIcon, PhoneIcon, LockIcon, UnlockIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import { validationRegisterFormScheme } from 'schemas/registerFormScheme';

export const RegisterForm = () => {
  const dispatch = useDispatch();
  const { error, isLoading } = useAuth();
  const [show, setShow] = useState(false);

  const handleClick = () => setShow(!show);

  const handleSubmit = e => {
    dispatch(register(e));
  };

  return (
    <Formik
      initialValues={{
        id: '',
        name: '',
        surname: '',
        email: '',
        password: '',
        phoneNumber: '',
      }}
      validationSchema={validationRegisterFormScheme}
      onSubmit={handleSubmit}
    >
      {props => {
        return (
          <Form style={{ width: '100%' }}>
            <Field name="id">
              {({ field }) => (
                <InputGroup minW={{ base: '100%', md: '400px' }}>
                  <Input {...field} placeholder="id" autoComplete="false" />
                </InputGroup>
              )}
            </Field>
            <Text ml="16px">
              <ErrorMessage name="id" />
            </Text>

            <Field name="name">
              {({ field }) => (
                <InputGroup mt={4} minW={{ base: '100%', md: '400px' }}>
                  <Input {...field} placeholder="Jméno" />
                </InputGroup>
              )}
            </Field>
            <Text ml="16px">
              <ErrorMessage name="name" />
            </Text>

            <Field name="surname">
              {({ field }) => (
                <InputGroup mt={4} minW={{ base: '100%', md: '400px' }}>
                  <Input {...field} placeholder="Příjmení" />
                </InputGroup>
              )}
            </Field>
            <Text ml="16px">
              <ErrorMessage name="surname" />
            </Text>

            <Field name="email">
              {({ field }) => (
                <InputGroup mt={4} minW={{ base: '100%', md: '400px' }}>
                  <InputLeftElement pointerEvents="none">
                    <EmailIcon color="gray.300" />
                  </InputLeftElement>
                  <Input {...field} placeholder="email" />
                </InputGroup>
              )}
            </Field>
            <Text ml="16px">
              <ErrorMessage name="email" />
            </Text>

            <Field name="phoneNumber">
              {({ field }) => (
                <InputGroup mt={4} minW={{ base: '100%', md: '400px' }}>
                  <InputLeftElement pointerEvents="none">
                    <PhoneIcon color="gray.300" />
                  </InputLeftElement>
                  <Input {...field} placeholder="telefon" />
                </InputGroup>
              )}
            </Field>
            <Text ml="16px">
              <ErrorMessage name="phoneNumber" />
            </Text>

            <Field name="password">
              {({ field }) => (
                <InputGroup mt={4} size="md">
                  <Input
                    {...field}
                    pr="4.5rem"
                    type={show ? 'text' : 'password'}
                    placeholder="heslo"
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleClick}>
                      {show ? <UnlockIcon /> : <LockIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              )}
            </Field>
            <Text ml="16px">
              <ErrorMessage name="password" />
            </Text>
            <Box w="100%" mt={8} textAlign="center">
              <Button
                bgColor="#6DA305"
                color="white"
                isLoading={isLoading}
                type="submit"
              >
                Zaregistrovat se
              </Button>
            </Box>
            {error && (
              <p style={{ marginTop: 10 }}>
                <b>This email is busy. Try another one.</b>
              </p>
            )}
          </Form>
        );
      }}
    </Formik>
  );
};
