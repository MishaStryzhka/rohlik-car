import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../../firebase/config';
import React, { useState } from 'react';
import { Box, Button, Input, Text } from '@chakra-ui/react';

const ModalRecoverPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handlePasswordReset = async () => {
    setIsLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage(`E-mail pro obnovení hesla byl odeslán na ${email}.`);
      setIsLoading(false);
    } catch (error) {
      setMessage(
        'Došlo k chybě. Zkontrolujte prosím zadanou e-mailovou adresu.'
      );
      setIsLoading(false);
      console.log(error);
    }
  };

  return (
    <div>
      <Input
        type="email"
        placeholder="Zadejte svůj e-mail"
        value={email}
        onChange={e => {
          setMessage('');
          setEmail(e.target.value);
        }}
      />
      <Box mt={8} textAlign="center">
        <Button
          bgColor="#6DA305"
          color="white"
          isLoading={isLoading}
          type="button"
          onClick={handlePasswordReset}
        >
          Obnovit heslo
        </Button>
      </Box>
      {message && (
        <Text
          margin={'auto'}
          mt={2}
          maxW="70%"
          align="center"
          fontWeight="bold"
        >
          {message}
        </Text>
      )}
    </div>
  );
};

export default ModalRecoverPassword;
