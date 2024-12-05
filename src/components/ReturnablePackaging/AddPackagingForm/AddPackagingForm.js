import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  IconButton,
  Image,
  Input,
  Select,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import LoaderSave from 'components/Loader/LoaderSave';
import { Field, Form, Formik } from 'formik';
import React, { useRef } from 'react';
import { FaRegImages } from 'react-icons/fa';

const AddPackagingForm = ({ isLoading, value, onSubmit }) => {
  const hiddenFileInput = useRef(null);

  const handleUploadClick = () => {
    hiddenFileInput.current.click();
  };

  return (
    <Formik
      initialValues={{
        name: value?.name || '',
        type: value?.type || '',
        comment: value?.comment || '',
        img: value?.type || '',
        isReturnable: value?.isReturnable || null,
      }}
      // validationSchema={value?.name ? updateCarSchema : validationAddCarSchema}
      onSubmit={values => {
        onSubmit(values);
      }}
    >
      {({ values, handleChange, setFieldValue, errors, touched }) => {
        console.log('values.isReturnable', values.isReturnable);
        return (
          <Box as={Form} p={4} borderWidth={1} borderRadius="md" boxShadow="md">
            <VStack spacing={4} align="stretch">
              {/* Pole "název" */}
              <FormControl isInvalid={touched.name && errors.name} isRequired>
                <FormLabel>Název</FormLabel>
                <Field
                  as={Input}
                  name="name"
                  placeholder='Například "pilsner 0.5"'
                  onChange={e => setFieldValue('name', e.target.value)}
                  disabled={value?.name ? true : false}
                />
                {touched.name && errors.name ? (
                  <Box color="red.500">{errors.name}</Box>
                ) : null}
              </FormControl>

              {/* Pole "typ" */}
              <FormControl isInvalid={touched.type && errors.type} isRequired>
                <FormLabel>Typ</FormLabel>
                <Field
                  as={Select}
                  name="type"
                  placeholder="Vyberte typ"
                  disabled={value?.type ? true : false}
                >
                  <option value="crate">přepravka (basa)</option>
                  <option value="bottle">lahev</option>
                  <option value="plastic">plastový obal</option>
                </Field>
                {touched.type && errors.type ? (
                  <Box color="red.500">{errors.type}</Box>
                ) : null}
              </FormControl>

              {/* Přepínač pro "Vratný?" */}
              <FormControl display="flex" flexDirection="column">
                <FormLabel>Vratný?</FormLabel>
                <Flex gap={6} justify="center">
                  {[
                    ['true', 'vratný'],
                    ['', 'zjistit '],
                    ['false', 'nevratný'],
                  ].map(([value, name]) => (
                    <Checkbox
                      key={value}
                      value={value}
                      isChecked={values.isReturnable === value}
                      onChange={e =>
                        setFieldValue('isReturnable', e.target.value)
                      }
                    >
                      {name}
                    </Checkbox>
                  ))}
                </Flex>
              </FormControl>

              {/* Pole "Fotografie" */}
              <FormControl>
                <FormLabel>Fotografie</FormLabel>
                <Input
                  display="none"
                  type="file"
                  accept="image/*"
                  ref={hiddenFileInput}
                  onChange={e => setFieldValue('img', e.target.files[0])}
                  multiple
                  maxLength={5}
                />
                {
                  <Box mt={2} display="flex" gap={2} flexWrap="wrap">
                    {!values.img && (
                      <IconButton
                        w="85px"
                        h="85px"
                        icon={<FaRegImages color="#6da305" />}
                        fontSize="24px"
                        onClick={handleUploadClick}
                        aria-label="Připojit obrázek"
                      />
                    )}
                    {values.img && (
                      <Image
                        src={URL.createObjectURL(values.img)}
                        alt={`Preview`}
                        boxSize="85px"
                        objectFit="cover"
                        borderRadius="md"
                      />
                    )}
                  </Box>
                }
              </FormControl>

              {/* Pole "Komentář k autu" */}
              <FormControl>
                <FormLabel>Komentář k obalu</FormLabel>
                <Field
                  as={Textarea}
                  name="comment"
                  placeholder="Přidejte komentář... (volitelný)"
                />
              </FormControl>

              {/* Tlačítko odeslání */}
              <Button
                type="submit"
                bg={isLoading ? '#EDF2F7' : '#6da305'}
                color="white"
                _hover={{ bg: '#5c8e04' }}
                disabled={isLoading}
              >
                {isLoading ? (
                  <LoaderSave />
                ) : value?.name ? (
                  'Uložit změny'
                ) : (
                  'Přidat auto'
                )}
              </Button>
            </VStack>
          </Box>
        );
      }}
    </Formik>
  );
};

export default AddPackagingForm;
