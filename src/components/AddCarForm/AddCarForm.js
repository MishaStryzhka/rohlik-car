import React from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Switch,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';
import { validationAddCarSchema } from 'schemas/addCarSchema';

const AddCarForm = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={{
        name: '',
        type: '',
        hasAirConditioner: false,
        hasFridge: false,
        comment: '',
        drivingStyle: '',
      }}
      validationSchema={validationAddCarSchema}
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
              />
              {touched.name && errors.name ? (
                <Box color="red.500">{errors.name}</Box>
              ) : null}
            </FormControl>

            {/* Pole "typ" */}
            <FormControl isInvalid={touched.type && errors.type} isRequired>
              <FormLabel>Typ</FormLabel>
              <Field as={Select} name="type" placeholder="Vyberte typ">
                <option value="CD">CD</option>
                <option value="CDV">CDV</option>
                <option value="OV">OV</option>
                <option value="D">D</option>
                <option value="EXP">EXP</option>
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

            {/* Pole "Komentář k autu" */}
            <FormControl>
              <FormLabel>Komentář k autu</FormLabel>
              <Field
                as={Textarea}
                name="comment"
                placeholder="Přidejte komentář..."
              />
            </FormControl>

            {/* Tlačítko odeslání */}
            <Button
              type="submit"
              bg="#6da305"
              color="white"
              _hover={{ bg: '#5c8e04' }}
            >
              Přidat auto
            </Button>
          </VStack>
        </Box>
      )}
    </Formik>
  );
};

export default AddCarForm;
