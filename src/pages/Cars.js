import { Container } from '@chakra-ui/react';
import { useState } from 'react';
import { Helmet } from 'react-helmet';
import ModalWrapper from 'components/Modal/Modal';
import AddCarForm from 'components/AddCarForm/AddCarForm';
import { addsNewCar } from 'app';
import CarsBox from 'components/CarsBox/CarsBox';
import FilterPanel from 'components/FilterPanel/FilterPanel';

const Cars = () => {
  const [isOpenModalAddCar, setIsOpenModalAddCar] = useState(false);
  const [search, setSearch] = useState('');
  console.log('search', search);

  const [filter, setFilter] = useState('');
  const [hasAirConditioner, setHasAirConditioner] = useState(false);
  const [hasFridge, setHasFridge] = useState(false);

  const handleSubmitAddCar = async formData => {
    await addsNewCar(formData);
    setIsOpenModalAddCar(false);
  };

  return (
    <>
      <Helmet>
        <title>Cars</title>
      </Helmet>

      <Container maxW={'max-content'}>
        {/* Панель фільтрів */}
        <FilterPanel
          search={search}
          setSearch={setSearch}
          filter={filter}
          setFilter={setFilter}
          hasAirConditioner={hasAirConditioner}
          setHasAirConditioner={setHasAirConditioner}
          hasFridge={hasFridge}
          setHasFridge={setHasFridge}
          setIsOpenModalAddCar={setIsOpenModalAddCar}
        />
        <CarsBox
          filters={{
            search,
            filter,
            hasAirConditioner,
            hasFridge,
          }}
        />
      </Container>

      {isOpenModalAddCar && (
        <ModalWrapper
          isOpen={isOpenModalAddCar}
          onClose={() => setIsOpenModalAddCar(false)}
        >
          <AddCarForm onSubmit={handleSubmitAddCar} />
        </ModalWrapper>
      )}
    </>
  );
};

export default Cars;
