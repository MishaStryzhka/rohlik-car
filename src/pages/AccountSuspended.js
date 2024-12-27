import { Flex, Text } from '@chakra-ui/react';
import { useAuth } from 'hooks';
import React from 'react';

const AccountSuspended = () => {
  const { user } = useAuth();
  return (
    <Flex
      width="100%"
      height="calc(100% - 82px)"
      bg="gray.100"
      align="center"
      justify="center"
    >
      <Flex
        bg="#ff0000bf"
        direction="column"
        align="center"
        padding="10px 20px"
        borderRadius="8px"
      >
        <Text>"Váš účet byl pozastaven"</Text>
        <Text>{user.statusMessage || '...'}</Text>
      </Flex>
    </Flex>
  );
};

export default AccountSuspended;
