import { AddIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import ListViewSwitcher from 'components/ListViewSwitcher/ListViewSwitcher';
import React from 'react';
import { IoSearch } from 'react-icons/io5';

const FilterPanerReturnablePackaging = ({
  search,
  setSearch,
  setIsOpenModalAddPackaging,
  isGridView,
  setIsGridView,
}) => {
  return (
    <Flex gap={2}>
      {/* Поле пошуку */}
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <IoSearch color="gray.300" />
        </InputLeftElement>
        <Input
          w={{ base: '100%', md: '300px', xl: '500px' }}
          value={search}
          onChange={e => {
            setSearch(e.target.value);
          }}
          placeholder="Search"
        />
      </InputGroup>

      <ListViewSwitcher isGridView={isGridView} setIsGridView={setIsGridView} />

      <Box display={{ base: 'flex', xl: 'none' }} gap={2}>
        <IconButton
          bg="#6da305"
          color="white"
          _hover={{ bg: '#5c8e04' }}
          icon={<AddIcon />}
          onClick={() => setIsOpenModalAddPackaging(true)}
          aria-label="Open Modal Add Cars"
          position="relative"
        />
      </Box>
      <Box display={{ base: 'none', xl: 'block' }}>
        <Flex gap={4} align="center">
          {/* Кнопка додавання*/}
          <Button
            leftIcon={<AddIcon />}
            bg="#6da305"
            color="white"
            _hover={{ bg: '#5c8e04' }}
            onClick={() => setIsOpenModalAddPackaging(true)}
          >
            přidat obal
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
};

export default FilterPanerReturnablePackaging;
