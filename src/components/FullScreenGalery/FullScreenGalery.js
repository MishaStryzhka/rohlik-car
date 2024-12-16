import { CloseIcon } from '@chakra-ui/icons';
import { Box, IconButton, Image } from '@chakra-ui/react';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

const FullScreenGalery = ({ currentIndex = 0, images, closeGalery }) => {
  console.log('images', images);
  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      width="100vw"
      height="100vh"
      bg="rgba(0, 0, 0, 0.9)"
      zIndex={99}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      {/* Кнопка закриття */}
      <IconButton
        icon={<CloseIcon />}
        position="absolute"
        top="20px"
        right="20px"
        onClick={closeGalery}
        colorScheme="whiteAlpha"
        aria-label="Close fullscreen gallery"
        zIndex={999}
      />

      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="fullscreenSwiper"
        initialSlide={currentIndex} // Встановити початковий слайд
      >
        {images.map((img, index) => (
          <SwiperSlide style={{ alignItems: 'center' }} key={index}>
            <Image
              src={img}
              alt={`Image ${index + 1}`}
              maxHeight="100%"
              m="auto"
              borderRadius="md"
              objectFit={'cover'}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default FullScreenGalery;
