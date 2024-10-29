import {
  Container,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import { useState } from 'react';
import Barcode from 'react-barcode';
import { Helmet } from 'react-helmet';
import { CiBarcode } from 'react-icons/ci';

const BarCode = () => {
  const [barCode, setBarCode] = useState('1091561721-DN');
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
            w={{ base: '100%', md: '400px' }}
            value={barCode}
            onChange={e => {
              setBarCode(e.target.value.toUpperCase());
            }}
            placeholder="Search"
          />
        </InputGroup>
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
