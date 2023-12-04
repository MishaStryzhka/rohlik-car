import { Container, Heading, List, ListItem, Stack } from '@chakra-ui/layout';
import iconContact from '../../image/iconContact.png';
import {
  Button,
  FormErrorMessage,
  IconButton,
  Image,
  Input,
  InputGroup,
  Skeleton,
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import { CiEdit } from 'react-icons/ci';
import { fetchUpdateContact, removeContact } from 'redux/contacts/operations';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { Field, Form, Formik } from 'formik';

const Contact = ({ selectedContact, setSelectedContact }) => {
  const dispatch = useDispatch();
  const [isActiveEdit, setIsActiveEdit] = useState(false);

  const handleClickBtnRemoveContact = () => {
    if (selectedContact) {
      dispatch(removeContact(selectedContact.id));
      setSelectedContact(null);
    }
  };

  const handleClickBtnEditContact = () => {
    if (selectedContact) {
      setIsActiveEdit(!isActiveEdit);
    }
  };

  const handleSubmitEdit = (e, { resetForm }) => {
    dispatch(fetchUpdateContact({ ...e, id: selectedContact.id }));
    setSelectedContact({ ...e, id: selectedContact.id });
    setIsActiveEdit(false);
    resetForm();
  };

  return (
    <>
      <Container
        p="15px"
        w="400px"
        as="section"
        bg="orange.100"
        color="orange.900"
        borderRadius="10px"
        display="flex"
        alignItems="center"
        flexDirection="column"
      >
        <Container w="100%" display="flex" justifyContent="space-between">
          <IconButton
            onClick={handleClickBtnEditContact}
            colorScheme="orange"
            aria-label="Search database"
            icon={<CiEdit />}
          />
          <Heading as="h2" size="1xl" noOfLines={1}>
            Contact
          </Heading>
          <IconButton
            onClick={handleClickBtnRemoveContact}
            colorScheme="orange"
            aria-label="Search database"
            icon={<DeleteIcon />}
          />
        </Container>

        <Image
          mt={5}
          border="1px"
          borderColor="orange.900"
          boxSize="100px"
          src={iconContact}
          alt=""
        />

        {!isActiveEdit && !selectedContact && (
          <Stack alignItems="center" padding={4} spacing={2} w="100%">
            <Skeleton
              w="250px"
              borderRadius="10px"
              height="40px"
              isLoaded={false}
            ></Skeleton>
            <Skeleton
              w="330px"
              borderRadius="10px"
              height="30px"
              isLoaded={false}
              bg="green.500"
              color="white"
              fadeDuration={1}
            ></Skeleton>
            <Skeleton
              w="330px"
              borderRadius="10px"
              height="30px"
              isLoaded={false}
              fadeDuration={4}
              bg="blue.500"
              color="white"
            ></Skeleton>
            <Skeleton
              w="330px"
              borderRadius="10px"
              height="30px"
              isLoaded={false}
              fadeDuration={4}
              bg="blue.500"
              color="white"
            ></Skeleton>
            <Skeleton
              w="330px"
              borderRadius="10px"
              height="30px"
              isLoaded={false}
              fadeDuration={4}
              bg="blue.500"
              color="white"
            ></Skeleton>
            <Skeleton
              w="330px"
              borderRadius="10px"
              height="30px"
              isLoaded={false}
              fadeDuration={4}
              bg="blue.500"
              color="white"
            ></Skeleton>
          </Stack>
        )}
        {!isActiveEdit && selectedContact && (
          <>
            <Heading mt={5} as="h4" size="1xl" noOfLines={1}>
              {selectedContact.name}
            </Heading>

            <List w="100%" p="15px" spacing={3}>
              {/* <ListItem
                display="flex"
                alignItems="baseline"
                justifyContent="space-between"
                borderBottom="2px solid black"
              >
                {selectedContact.name}
              </ListItem> */}
              <ListItem
                display="flex"
                alignItems="baseline"
                justifyContent="space-between"
                borderBottom="2px solid black"
              >
                last name
              </ListItem>
              <ListItem
                display="flex"
                alignItems="baseline"
                justifyContent="space-between"
                borderBottom="2px solid black"
              >
                {selectedContact.number}
              </ListItem>
              <ListItem
                display="flex"
                alignItems="baseline"
                justifyContent="space-between"
                borderBottom="2px solid black"
              >
                Email
              </ListItem>
              <ListItem
                display="flex"
                alignItems="baseline"
                justifyContent="space-between"
                borderBottom="2px solid black"
              >
                Address
              </ListItem>
              <ListItem
                display="flex"
                alignItems="baseline"
                justifyContent="space-between"
                borderBottom="2px solid black"
              >
                Birthday
              </ListItem>
            </List>
          </>
        )}
        {isActiveEdit && (
          <Formik
            initialValues={{
              name: selectedContact.name,
              number: selectedContact.number,
            }}
            onSubmit={handleSubmitEdit}
          >
            {props => (
              <Form>
                <Field name="name">
                  {({ field }) => (
                    <InputGroup>
                      <Input
                        bg="orange.200"
                        borderColor="orange.300"
                        sx={{
                          ':hover': {
                            borderColor: 'orange.500',
                          },
                          ':focus-visible': {
                            borderColor: 'orange.500',
                            borderWidth: '2px',
                            boxShadow: 'none',
                          },
                        }}
                        color="orange.900"
                        mt={5}
                        h="30px"
                        {...field}
                        placeholder="First name"
                      />
                    </InputGroup>
                  )}
                </Field>
                <Field name="lastName">
                  {({ field, form }) => (
                    <InputGroup>
                      <Input
                        disabled={true}
                        bg="orange.200"
                        borderColor="orange.300"
                        sx={{
                          ':hover': {
                            borderColor: 'orange.500',
                          },
                          ':focus-visible': {
                            borderColor: 'orange.500',
                            borderWidth: '2px',
                            boxShadow: 'none',
                          },
                        }}
                        color="orange.900"
                        mt={4}
                        h="30px"
                        {...field}
                        placeholder='"Last name" Sorry! (under development).'
                      />
                      <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                    </InputGroup>
                  )}
                </Field>
                <Field name="number">
                  {({ field }) => (
                    <InputGroup mt={2} minW="330px">
                      <Input
                        bg="orange.200"
                        borderColor="orange.300"
                        sx={{
                          ':hover': {
                            borderColor: 'orange.500',
                          },
                          ':focus-visible': {
                            borderColor: 'orange.500',
                            borderWidth: '2px',
                            boxShadow: 'none',
                          },
                        }}
                        color="orange.900"
                        h="30px"
                        {...field}
                        placeholder="Number"
                      />
                    </InputGroup>
                  )}
                </Field>
                <Field name="email">
                  {({ field }) => (
                    <InputGroup mt={2} minW="330px">
                      <Input
                        disabled={true}
                        bg="orange.200"
                        borderColor="orange.300"
                        sx={{
                          ':hover': {
                            borderColor: 'orange.500',
                          },
                          ':focus-visible': {
                            borderColor: 'orange.500',
                            borderWidth: '2px',
                            boxShadow: 'none',
                          },
                        }}
                        color="orange.900"
                        h="30px"
                        {...field}
                        placeholder='"Email" Sorry! (under development)'
                      />
                    </InputGroup>
                  )}
                </Field>
                <Field name="address">
                  {({ field }) => (
                    <InputGroup mt={2} minW="330px">
                      <Input
                        disabled={true}
                        bg="orange.200"
                        borderColor="orange.300"
                        sx={{
                          ':hover': {
                            borderColor: 'orange.500',
                          },
                          ':focus-visible': {
                            borderColor: 'orange.500',
                            borderWidth: '2px',
                            boxShadow: 'none',
                          },
                        }}
                        color="orange.900"
                        h="30px"
                        {...field}
                        placeholder='"Address" Sorry! (under development)'
                      />
                    </InputGroup>
                  )}
                </Field>
                <Field name="birthday">
                  {({ field }) => (
                    <InputGroup mt={2} minW="330px">
                      <Input
                        disabled={true}
                        bg="orange.200"
                        borderColor="orange.300"
                        sx={{
                          ':hover': {
                            borderColor: 'orange.500',
                          },
                          ':focus-visible': {
                            borderColor: 'orange.500',
                            borderWidth: '2px',
                            boxShadow: 'none',
                          },
                        }}
                        color="orange.900"
                        h="30px"
                        {...field}
                        placeholder='"Birthday" Sorry! (under development)'
                      />
                    </InputGroup>
                  )}
                </Field>
                <Button
                  mt={8}
                  mx="calc(50% - 40px)"
                  colorScheme="orange"
                  isLoading={props.isSubmitting}
                  type="submit"
                >
                  Save
                </Button>
              </Form>
            )}
          </Formik>
        )}
      </Container>
    </>
  );
};

export default Contact;
