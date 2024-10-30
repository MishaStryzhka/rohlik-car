import {
  Button,
  Container,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import { useRef, useState } from 'react';
import Barcode from 'react-barcode';
import { Helmet } from 'react-helmet';
import { CiBarcode } from 'react-icons/ci';

const BarCode = () => {
  const inputRef = useRef(null);
  const [barCode, setBarCode] = useState('1091561721-DN');

  const isFull =
    barCode.includes('-A-') ||
    barCode.includes('-C-') ||
    barCode.includes('-F-') ||
    barCode.includes('-DN');

  return (
    <>
      <Helmet>
        <title>BarCode</title>
      </Helmet>

      <Container w={'100%'}>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <CiBarcode color="gray.300" />
          </InputLeftElement>
          <Input
            ref={inputRef}
            w={{ base: '100%', md: '100%' }}
            value={barCode}
            onChange={e => {
              setBarCode(e.target.value.toUpperCase());
            }}
            placeholder="Search"
          />
        </InputGroup>
        <Flex p="10px 50px" justify="space-evenly">
          <Button
            size="sm"
            bg="#6da305"
            color="white"
            _hover={{ bg: '#8d8d8d' }}
            onClick={() => {
              setBarCode(prev => prev + '-A-');
              inputRef.current.focus();
            }}
            aria-label="Open Modal Update Coment"
            position="relative"
            gap={1}
            disabled={isFull}
          >
            -A-
          </Button>
          <Button
            size="sm"
            bg="#6da305"
            color="white"
            _hover={{ bg: '#8d8d8d' }}
            onClick={() => {
              setBarCode(prev => prev + '-C-');
              inputRef.current.focus();
            }}
            aria-label="Open Modal Update Coment"
            position="relative"
            gap={1}
            disabled={isFull}
          >
            -C-
          </Button>
          <Button
            size="sm"
            bg="#6da305"
            color="white"
            _hover={{ bg: '#8d8d8d' }}
            onClick={() => {
              setBarCode(prev => prev + '-F-');
              inputRef.current.focus();
            }}
            aria-label="Open Modal Update Coment"
            position="relative"
            gap={1}
            disabled={isFull}
          >
            -F-
          </Button>
          <Button
            size="sm"
            bg="#6da305"
            color="white"
            _hover={{ bg: '#8d8d8d' }}
            onClick={() => {
              setBarCode(prev => prev + '-DN');
              inputRef.current.focus();
            }}
            aria-label="Open Modal Update Coment"
            position="relative"
            gap={1}
            disabled={isFull}
          >
            -DN
          </Button>
        </Flex>
        <Flex justify="center" mt={8}>
          <Barcode
            value={barCode} // Значення для генерації штрих-коду
            width={2} // Ширина кожного штриха
            height={100} // Висота штрих-коду
            displayValue={true} // Відображення значення під штрих-кодом
            fontSize={16} // Розмір шрифту для значення
            background="#ffffff" // Колір фону
            lineColor="#000000" // Колір штрихів
          />
        </Flex>
      </Container>
    </>
  );
};

export default BarCode;
