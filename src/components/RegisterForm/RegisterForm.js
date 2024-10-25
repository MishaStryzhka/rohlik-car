import { useDispatch } from 'react-redux';
import { register } from 'redux/auth/operations';
import { useAuth } from 'hooks';
import {
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import { EmailIcon, PhoneIcon, LockIcon, UnlockIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import { validationRegisterFormScheme } from 'schemas/registerFormScheme';

export const RegisterForm = () => {
  const dispatch = useDispatch();
  const { error } = useAuth();
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
        pin: '',
        phone: '',
      }}
      validationSchema={validationRegisterFormScheme}
      onSubmit={handleSubmit}
    >
      {props => (
        <Form>
          <Field name="id">
            {({ field }) => (
              <InputGroup minW="400px">
                <Input {...field} placeholder="id" autoComplete="false" />
              </InputGroup>
            )}
          </Field>
          <Field name="name">
            {({ field }) => (
              <InputGroup mt={4} minW="400px">
                <Input {...field} placeholder="Jméno" />
              </InputGroup>
            )}
          </Field>
          <Field name="surname">
            {({ field }) => (
              <InputGroup mt={4} minW="400px">
                <Input {...field} placeholder="Příjmení" />
              </InputGroup>
            )}
          </Field>
          <Field name="email">
            {({ field }) => (
              <InputGroup mt={4} minW="400px">
                <InputLeftElement pointerEvents="none">
                  <EmailIcon color="gray.300" />
                </InputLeftElement>
                <Input {...field} placeholder="email" />
              </InputGroup>
            )}
          </Field>
          <Field name="phone">
            {({ field }) => (
              <InputGroup mt={4} minW="400px">
                <InputLeftElement pointerEvents="none">
                  <PhoneIcon color="gray.300" />
                </InputLeftElement>
                <Input {...field} placeholder="phone" />
              </InputGroup>
            )}
          </Field>
          <Field name="pin">
            {({ field }) => (
              <InputGroup mt={4} size="md">
                <Input
                  {...field}
                  pr="4.5rem"
                  type={show ? 'text' : 'password'}
                  placeholder="Enter pin"
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleClick}>
                    {show ? <UnlockIcon /> : <LockIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            )}
          </Field>
          <Button
            mt={8}
            mx="calc(50% - 40px)"
            bgColor="#6DA305"
            isLoading={props.isSubmitting}
            type="submit"
          >
            Register
          </Button>
          {error && (
            <p style={{ marginTop: 10 }}>
              <b>This email is busy. Try another one.</b>
            </p>
          )}
        </Form>
      )}
    </Formik>
  );
};
