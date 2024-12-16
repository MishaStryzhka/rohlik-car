import React, { useState } from 'react';
import { Box, Input, VStack, Text, Button } from '@chakra-ui/react';

const SectionSelector = ({ selectedOption, setSelectedOption, options }) => {
  const [inputValue, setInputValue] = useState('');
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [isFocused, setIsFocused] = useState(false);

  const handleInputChange = e => {
    setIsFocused(true);
    setSelectedOption('');
    const value = e.target.value;
    setInputValue(value);

    // Filtrování možností podle zadaného textu
    const filtered = options.filter(option =>
      option.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredOptions(filtered);
  };

  const handleSelectOption = option => {
    setInputValue(option);
    setSelectedOption(option);
    setIsFocused(false);
  };

  return (
    <Box position="relative">
      <Text fontSize="lg" mb={2}>
        Zadejte sekci:
      </Text>
      <Input
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Zadejte sekci nebo vyberte z nabídky"
        mb={2}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setTimeout(() => setIsFocused(false), 150)}
      />
      {isFocused && (
        <VStack
          align="start"
          position="absolute"
          bgColor="gray.100"
          width="100%"
          zIndex="1"
          borderRadius={5}
          p={2}
        >
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => (
              <Button
                key={index}
                variant="ghost"
                onClick={() => handleSelectOption(option)}
                w="100%"
                justifyContent="flex-start"
                h="30px"
                bgColor="gray.200"
                _hover={{ bgColor: 'gray.300' }}
                _pressed={{ bgColor: 'gray.300' }}
              >
                {option}
              </Button>
            ))
          ) : (
            <Button
              variant="ghost"
              onClick={() => handleSelectOption(inputValue)}
              w="100%"
              justifyContent="flex-start"
              h="30px"
              bgColor="gray.200"
              _hover={{ bgColor: 'gray.300' }}
              _pressed={{ bgColor: 'gray.300' }}
            >
              Přidat novou sekci: {inputValue}
            </Button>
          )}
        </VStack>
      )}

      {selectedOption && (
        <Box ml={4}>
          <Text>
            Vybraná sekce: <strong>{selectedOption}</strong>
          </Text>
        </Box>
      )}
    </Box>
  );
};

export default SectionSelector;
