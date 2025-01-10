import { confirmPasswordReset } from 'firebase/auth';
import { auth } from '../firebase/config';
import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from '@chakra-ui/react';
import { MdOutlineVisibility, MdVisibilityOff } from 'react-icons/md';

const RecoveryPassword = () => {
  const [searchParams] = useSearchParams();
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const oobCode = searchParams.get('oobCode');

  const handleResetPassword = async () => {
    if (!oobCode) {
      setMessage('Chyba: Odkaz pro obnovení hesla je neplatný.');
      return;
    }

    setIsLoading(true);

    try {
      await confirmPasswordReset(auth, oobCode, password);
      setMessage('Heslo bylo úspěšně změněno. Nyní se můžete přihlásit.');
      setIsLoading(false);
    } catch (error) {
      setMessage('Došlo k chybě při změně hesla. Zkuste to znovu.');
      setIsLoading(false);
      console.error(error);
    }
  };

  return (
    <Flex direction="column" align="center">
      <Text as="h1" mt={20}>
        Nastavení nového hesla
      </Text>
      <InputGroup
        mt={10}
        maxW={{ base: '300px', md: '400px' }}
        minW={{ base: '70%', md: '400px' }}
      >
        <Input
          pr="4.5r em"
          type={show ? 'text' : 'password'}
          value={password}
          placeholder="Zadejte nové heslo"
          onChange={e => {
            setMessage('');
            setPassword(e.target.value);
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
      <Button
        mt={6}
        bgColor="#6DA305"
        color="white"
        isLoading={isLoading}
        onClick={handleResetPassword}
        type="button"
      >
        Nastavit heslo
      </Button>
      {message && (
        <Text mt={2} maxW="70%" align="center" fontWeight="bold">
          {message}
        </Text>
      )}
    </Flex>
  );
};

export default RecoveryPassword;
