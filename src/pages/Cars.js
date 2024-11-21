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
  const [typeCars, setTypeCars] = useState('');
  const [hasAirConditioner, setHasAirConditioner] = useState(false);
  const [hasFridge, setHasFridge] = useState(false);
  const [drivingStyle, setDrivingStyle] = useState('');
  const [isGridView, setIsGridView] = useState(false);
  const [hasHeating, setHasHeating] = useState(false);
  const [hasSoundProofed, setHasSoundProofed] = useState(false);

  const handleSubmitAddCar = async formData => {
    await addsNewCar(formData);
    setIsOpenModalAddCar(false);
  };

  return (
    <>
      <Helmet>
        <title>Cars</title>
      </Helmet>

      <Container
        w={'100%'}
        maxW={{ base: '100%', md: '95vw', xl: '80vw' }}
        p={2}
      >
        <FilterPanel
          search={search}
          setSearch={setSearch}
          typeCars={typeCars}
          setTypeCars={setTypeCars}
          drivingStyle={drivingStyle}
          setDrivingStyle={setDrivingStyle}
          hasAirConditioner={hasAirConditioner}
          setHasAirConditioner={setHasAirConditioner}
          hasFridge={hasFridge}
          setHasFridge={setHasFridge}
          setIsOpenModalAddCar={setIsOpenModalAddCar}
          isGridView={isGridView}
          setIsGridView={setIsGridView}
          hasHeating={hasHeating}
          setHasHeating={setHasHeating}
        />
        <CarsBox
          filters={{
            search,
            typeCars,
            drivingStyle,
            hasAirConditioner,
            hasFridge,
          }}
          isGridView={isGridView}
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
