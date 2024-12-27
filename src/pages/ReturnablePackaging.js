import { Container } from '@chakra-ui/react';
import { addReturnablePackaging } from 'app';
import ModalWrapper from 'components/Modals/Modal';
import AddPackagingForm from 'components/ReturnablePackaging/AddPackagingForm/AddPackagingForm';
import FilterPanerReturnablePackaging from 'components/ReturnablePackaging/FilterPanerReturnablePackaging/FilterPanerReturnablePackaging';
import PackagingBox from 'components/ReturnablePackaging/PackagingBox/PackagingBox';
import { useAuth } from 'hooks';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';

const ReturnablePackaging = () => {
  const [isOpenModalAddPackaging, setIsOpenModalAddPackaging] = useState(false);
  const [isLoadingAddPackaging, setIsLoadingAddPackaging] = useState(false);
  const [search, setSearch] = useState('');
  const [isGridView, setIsGridView] = useState(false);
  const { user } = useAuth();

  const handleSubmitAddPackaging = async e => {
    setIsLoadingAddPackaging(true);
    await addReturnablePackaging({ ...e, user });
    setIsOpenModalAddPackaging(false);
    setIsLoadingAddPackaging(false);
  };
  return (
    <>
      <Helmet>
        <title>Vratné obaly</title>
      </Helmet>

      <Container
        w={'100%'}
        maxW={{ base: '100%', md: '95vw', xl: '80vw' }}
        p={2}
        height="calc(100% - 65px)"
        overflow="auto"
        className="no-scrollbar"
      >
        <FilterPanerReturnablePackaging
          search={search}
          setSearch={setSearch}
          setIsOpenModalAddPackaging={setIsOpenModalAddPackaging}
          isGridView={isGridView}
          setIsGridView={setIsGridView}
        />
        <PackagingBox
          filters={{
            search,
          }}
          isGridView={isGridView}
        />
      </Container>

      {isOpenModalAddPackaging && (
        <ModalWrapper
          title="Přidat obal"
          isOpen={isOpenModalAddPackaging}
          onClose={() => setIsOpenModalAddPackaging(false)}
        >
          <AddPackagingForm
            isLoading={isLoadingAddPackaging}
            onSubmit={handleSubmitAddPackaging}
          />
        </ModalWrapper>
      )}
    </>
  );
};

export default ReturnablePackaging;
