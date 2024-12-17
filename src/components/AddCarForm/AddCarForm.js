import React from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Switch,
  VStack,
} from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';
import { validationAddCarSchema } from 'schemas/addCarScheme';
import { updateCarSchema } from 'schemas/updateCarScheme';
import { TYPES_CAR } from 'data';

const AddCarForm = ({ value, onSubmit }) => {
  return (
    <Formik
      initialValues={{
        name: value?.name || '',
        type: value?.type || '',
        hasAirConditioner: value?.hasAirConditioner || false,
        hasFridge: value?.hasFridge || false,
        hasHeating: value?.hasHeating || false,
        hasSoundProofed: value?.hasSoundProofed || false,
        comment: value?.comment || '',
        drivingStyle: value?.drivingStyle || '',
      }}
      validationSchema={value?.name ? updateCarSchema : validationAddCarSchema}
      onSubmit={values => {
        onSubmit(values);
      }}
    >
      {({ values, handleChange, setFieldValue, errors, touched }) => (
        <Box as={Form} p={4} borderWidth={1} borderRadius="md" boxShadow="md">
          <VStack spacing={4} align="stretch">
            {/* Pole "název" */}
            <FormControl isInvalid={touched.name && errors.name} isRequired>
              <FormLabel>Název (obsahuje typ a číslo)</FormLabel>
              <Field
                as={Input}
                name="name"
                placeholder="Například CDV114"
                onChange={e =>
                  setFieldValue('name', e.target.value.toUpperCase())
                }
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
                {TYPES_CAR.map((typeCar, index) => (
                  <option key={index} value={typeCar}>
                    {typeCar}
                  </option>
                ))}
              </Field>
              {touched.type && errors.type ? (
                <Box color="red.500">{errors.type}</Box>
              ) : null}
            </FormControl>

            {/* Přepínač pro "Klimatizace" */}
            <FormControl display="flex" alignItems="center">
              <FormLabel mb="0">Klimatizace</FormLabel>
              <Field
                as={Switch}
                name="hasAirConditioner"
                colorScheme="green"
                isChecked={values.hasAirConditioner}
                onChange={() =>
                  setFieldValue('hasAirConditioner', !values.hasAirConditioner)
                }
              />
            </FormControl>

            {/* Přepínač pro "Topení" */}
            <FormControl display="flex" alignItems="center">
              <FormLabel mb="0">Topení</FormLabel>
              <Field
                as={Switch}
                name="hasHeating"
                colorScheme="green"
                isChecked={values.hasHeating}
                onChange={() => setFieldValue('hasHeating', !values.hasHeating)}
              />
            </FormControl>

            {/* Přepínač pro "Vestavba (ledničce)" */}
            <FormControl display="flex" alignItems="center">
              <FormLabel mb="0">Vestavba (ledničce)</FormLabel>
              <Field
                as={Switch}
                name="hasFridge"
                colorScheme="green"
                isChecked={values.hasFridge}
                onChange={() => setFieldValue('hasFridge', !values.hasFridge)}
              />
            </FormControl>

            {/* Přepínač pro "Odhlučněné" */}
            <FormControl display="flex" alignItems="center">
              <FormLabel mb="0">Odhlučněné</FormLabel>
              <Field
                as={Switch}
                name="hasSoundProofed"
                colorScheme="green"
                isChecked={values.hasSoundProofed}
                onChange={() =>
                  setFieldValue('hasSoundProofed', !values.hasSoundProofed)
                }
              />
            </FormControl>

            {/* Styl jízdy */}
            <FormControl>
              <FormLabel>Styl jízdy</FormLabel>
              <Field
                as={Select}
                name="drivingStyle"
                placeholder="Vyberte styl jízdy"
              >
                <option value="A">A</option>
                <option value="A/B">A/B</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="0">0</option>
              </Field>
            </FormControl>

            {/* Pole "Komentář k autu"
            <FormControl>
              <FormLabel>Komentář k autu</FormLabel>
              <Field
                as={Textarea}
                name="comment"
                placeholder="Přidejte komentář..."
              />
            </FormControl> */}

            {/* Tlačítko odeslání */}
            <Button
              type="submit"
              bg="#6da305"
              color="white"
              _hover={{ bg: '#5c8e04' }}
            >
              {value?.name ? 'Uložit změny' : 'Přidat auto'}
            </Button>
          </VStack>
        </Box>
      )}
    </Formik>
  );
};

export default AddCarForm;
