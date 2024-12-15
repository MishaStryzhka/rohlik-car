import { Container } from '@chakra-ui/react';
import { useState } from 'react';
import { Helmet } from 'react-helmet';
import ModalWrapper from 'components/Modals/Modal';
import AddCarForm from 'components/AddCarForm/AddCarForm';
import { addsNewCar } from 'app';
import CarsBox from 'components/CarsBox/CarsBox';
import FilterPanel from 'components/FilterPanel/FilterPanel';
import ModalScan from 'components/Modals/ModalScan/ModalScan';
import { Outlet } from 'react-router-dom';

const Cars = () => {
  const [isOpenModalAddCar, setIsOpenModalAddCar] = useState(false);
  const [isOpenModalScan, setIsOpenModalScan] = useState(false);
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
        p={0}
        position="relative"
        overflow="auto"
        height="100vh"
      >
        <Outlet />
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
          hasSoundProofed={hasSoundProofed}
          setHasSoundProofed={setHasSoundProofed}
          setIsOpenModalScan={setIsOpenModalScan}
        />
        <CarsBox
          filters={{
            search,
            typeCars,
            drivingStyle,
            hasAirConditioner,
            hasHeating,
            hasFridge,
            hasSoundProofed,
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
      {isOpenModalScan && (
        <ModalScan
          isOpen={isOpenModalScan}
          onClose={() => setIsOpenModalScan(false)}
        ></ModalScan>
      )}
    </>
  );
};

export default Cars;
