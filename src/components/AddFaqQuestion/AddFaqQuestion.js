import React, { useRef, useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  IconButton,
  Image,
  Input,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';
import SectionSelector from 'components/SectionSelector/SectionSelector';
import { FaRegImages } from 'react-icons/fa';
import { addFaqQuestion, uploadPhotos } from 'app';
import { useAuth } from 'hooks';
import Loader from 'components/Loader/Loader';

const sections = ['Auto', 'Telefon', 'Terminál', 'Bloky', 'Vratné obaly'];

const AddFaqQuestion = ({ value, onClose }) => {
  const { user } = useAuth();
  const [imageFiles, setImageFiles] = useState([]);
  const hiddenFileInput = useRef(null);
  const [loading, setLoading] = useState(false);
  console.log('loading', loading);

  const handleFileChange = e => {
    const files = Array.from(e.target.files); // Масив файлів
    setImageFiles(prevFiles => [...prevFiles, ...files]);
  };

  const handleUploadClick = () => {
    hiddenFileInput.current.click();
  };

  const handleSubmit = async ({ section, question, answer }) => {
    if (!section || !question) {
      alert('Vyplňte všechna pole!');
      return;
    }
    setLoading(true);

    const urls = await uploadPhotos({ path: 'questions', files: imageFiles }); // Чекаємо результат

    addFaqQuestion({ section, question, answer, images: urls, user });
    alert('Otázka byla úspěšně přidána!');
    setLoading(false);
    onClose();
  };

  return (
    <Box position="relative">
      <Formik
        initialValues={{
          question: value?.question || '',
          section: value?.section || '',
          answer: value?.answer || '',
        }}
        onSubmit={values => {
          console.log('values', values);
          handleSubmit(values);
        }}
      >
        {({ values, handleChange, setFieldValue, errors, touched }) => (
          <Box as={Form}>
            <VStack spacing={4} align="stretch">
              <SectionSelector
                selectedOption={values?.section}
                setSelectedOption={e => setFieldValue('section', e)}
                options={sections}
              />

              <FormControl>
                <Field
                  as={Textarea}
                  name="question"
                  placeholder="Zadejte svou otázku"
                />
              </FormControl>

              <FormControl>
                <Field
                  as={Textarea}
                  name="answer"
                  placeholder="Zadejte odpověď (pokud víte)"
                />
              </FormControl>

              <FormControl>
                <Input
                  display="none"
                  type="file"
                  accept="image/*"
                  ref={hiddenFileInput}
                  onChange={handleFileChange}
                  multiple
                  maxLength={5}
                />
                {
                  <Box mt={2} display="flex" gap={2} flexWrap="wrap">
                    {imageFiles.length < 5 && (
                      <IconButton
                        w="85px"
                        h="85px"
                        icon={<FaRegImages color="#6da305" />}
                        fontSize="24px"
                        onClick={handleUploadClick}
                        aria-label="Připojit obrázek"
                      />
                    )}
                    {imageFiles.map((file, index) => (
                      <Image
                        key={index}
                        src={URL.createObjectURL(file)}
                        alt={`Preview ${index + 1}`}
                        boxSize="85px"
                        objectFit="cover"
                        borderRadius="md"
                      />
                    ))}
                  </Box>
                }
              </FormControl>

              <Button
                type="submit"
                bg="#6da305"
                color="white"
                _hover={{ bg: '#5c8e04' }}
              >
                {value?.question ? 'Upravit otázku' : 'Přidat otázku'}
              </Button>
            </VStack>
          </Box>
        )}
      </Formik>
      {loading && <Loader isWindow />}
    </Box>
  );
};

export default AddFaqQuestion;
