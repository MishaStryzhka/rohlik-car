import React, { useEffect, useRef, useState } from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';
import { getCarByName } from 'app';
import { getColorDrivingStyle } from 'helpers/getColorDrivingStyle';
import { FaBox, FaSnowflake } from 'react-icons/fa';
import { GiHotSurface } from 'react-icons/gi';
import { MdVolumeOff } from 'react-icons/md';

const AnnotatedImage = ({ imageSrc, annotations, renderComponent }) => {
  const [carList, setCarList] = useState([]);
  const containerRef = useRef(null);
  console.log('carList', carList);

  useEffect(() => {
    const container = containerRef.current;

    if (container) {
      container.style.position = 'relative';
      container.style.display = 'inline-block';
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('annotations', annotations);

        // Виконуємо запити до Firebase паралельно
        const dataCarList = await Promise.all(
          annotations.map(async annotation => {
            const detectedText = annotation.description.replace(/\s+/g, ''); // Видаляємо пробіли
            const result = await getCarByName(detectedText); // Запит до Firebase

            // Повертаємо об'єкт тільки якщо знайдено результат
            if (result) {
              return { data: result, annotation };
            }
            return null; // Якщо нічого не знайдено, повертаємо null
          })
        );

        // Фільтруємо `null`, щоб зберегти тільки валідні результати
        setCarList(dataCarList.filter(item => item !== null));
      } catch (error) {
        console.error('Error fetching car data:', error);
      }
    };

    if (annotations && annotations.length > 0) {
      fetchData(); // Викликаємо асинхронну функцію тільки якщо є анотації
    }
  }, [annotations]);

  const calculateRotation = vertices => {
    const dx = vertices[1].x - vertices[0].x; // Різниця по X
    const dy = vertices[1].y - vertices[0].y; // Різниця по Y
    return (Math.atan2(dy, dx) * 180) / Math.PI; // Обчислення кута в градусах
  };

  return (
    <Box ref={containerRef} key="132">
      {/* Відображення зображення */}
      <img
        src={imageSrc}
        alt="Annotated"
        style={{ maxWidth: '100%', maxHeight: '100%', display: 'block' }}
      />

      {/* Відображення накладених елементів */}
      {carList.map((car, index) => {
        console.log('car', car);
        const vertices = car?.annotation?.boundingPoly?.vertices;

        if (!vertices) return <div key={index}></div>;

        // Обчислюємо позицію компонента
        const left = vertices[0].x; // x координата верхнього лівого кута
        const top = vertices[0].y; // y координата верхнього лівого кута
        const width = vertices[1].x - vertices[0].x; // Різниця між x правого і лівого кута
        const height = vertices[2].y - vertices[0].y;

        const rotation = calculateRotation(vertices);

        return (
          <Box
            key={index}
            position="absolute"
            left={`${left}px`}
            top={`${top}px`}
            width={`${width}px`}
            height={`${height}px`}
            transform={`rotate(${rotation}deg)`}
            background="rgba(255, 255, 255, 0.8)"
            border={`2px solid ${getColorDrivingStyle(car.data.drivingStyle)}`}
            padding="8px"
            // borderRadius="8px"
            borderLeftRadius="8px"
            borderBottomRightRadius="8px"
            zIndex={10}
            bg="transparent"
          >
            <Flex
              w={'fit-content'}
              alignItems="center"
              justify="space-between"
              gap={1}
              position="absolute"
              top="-29px"
              right="-2px"
              bg={getColorDrivingStyle(car.data.drivingStyle)}
              p="3px"
              borderTopRadius={'3px'}
            >
              {/* Name */}
              <Text
                fontWeight="bold"
                fontSize={14}
                // color={getColorDrivingStyle(car.data.drivingStyle)}
              >
                {car.data.name} ({car.data.drivingStyle})
              </Text>

              <Box display="flex" gap={1}>
                {/* Перемикачі */}
                <Box display="flex" alignItems="center">
                  <FaSnowflake
                    color={car.data.hasAirConditioner ? 'green' : 'red'}
                  />
                </Box>

                {'hasHeating' in car.data && (
                  <Box display="flex" alignItems="center">
                    <GiHotSurface
                      color={car.data.hasHeating ? 'green' : 'red'}
                    />
                  </Box>
                )}

                <Box display="flex" alignItems="center">
                  <FaBox color={car.data.hasFridge ? 'green' : 'red'} />
                </Box>

                {'hasSoundProofed' in car.data && (
                  <Box display="flex" alignItems="center">
                    <MdVolumeOff
                      color={car.data.hasSoundProofed ? 'green' : 'red'}
                    />
                  </Box>
                )}
              </Box>
            </Flex>
          </Box>
        );
      })}
    </Box>
  );
};

export default AnnotatedImage;
