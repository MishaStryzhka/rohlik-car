import { useDispatch } from 'react-redux';
import { logIn } from 'redux/auth/operations';
import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from '@chakra-ui/react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useContext, useState } from 'react';
import { useAuth } from 'hooks';
import { MdOutlineVisibility, MdVisibilityOff } from 'react-icons/md';
import { PaswordRecoveryContext } from 'contexts/PasswordRecovery/PaswordRecoveryContext';
import { clearError } from '../../redux/auth/slice';

export const LoginForm = () => {
  const dispatch = useDispatch();
  const { isLoading, error } = useAuth();
  const [show, setShow] = useState(false);
  const { setIsOpenModalRecoverPassword } = useContext(PaswordRecoveryContext);

  const handleClick = () => setShow(!show);

  const handleSubmit = e => {
    dispatch(logIn(e));
  };

  const handleFieldChange = () => {
    if (error) {
      dispatch(clearError()); // Очищаємо помилку, якщо користувач починає вводити дані
    }
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
                <Input
                  {...field}
                  placeholder="id"
                  onChange={e => {
                    field.onChange(e);
                    handleFieldChange(); // Виклик скидання помилки
                  }}
                />
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
                  onChange={e => {
                    field.onChange(e);
                    handleFieldChange(); // Виклик скидання помилки
                  }}
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
          {error && (
            <p style={{ marginTop: 10 }}>
              <p style={{ fontSize: '12px', color: 'red' }}>{error}</p>
            </p>
          )}
          <Flex mt="10px">
            <Text display="inline-block">Nepamatuješ si heslo.</Text>
            <Button
              bgColor="transparent"
              color="#6DA305"
              textDecoration="underline"
              type="button"
              height="auto"
              p="2px 6px"
              onClick={() => setIsOpenModalRecoverPassword(true)}
            >
              Obnovit heslo
            </Button>
          </Flex>
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
