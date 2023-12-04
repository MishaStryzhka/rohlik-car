import FormContacts from 'components/FormContacts/FormContacts';
import FormFind from 'components/FormFind/FormFind';
import { useDispatch, useSelector } from 'react-redux';
import { getContacts } from 'redux/contacts/selectors';
import { addContact, fetchContacts } from 'redux/contacts/operations';
import { useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import ItemContact from 'components/ItemContact/ItemContact';
import { Helmet } from 'react-helmet';
import { Container, Heading, List, Text } from '@chakra-ui/layout';
import { Alert, AlertIcon, AlertTitle, Button } from '@chakra-ui/react';
import Contact from '../components/Contact/Contact';
import { ReactComponent as LogoSort } from '../image/sort-icon-png-19.svg';

const Cars = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showError, setShowError] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [sortContacts, setsortContacts] = useState(null);
  const [isSort, setIsSort] = useState(false);

  const location = useLocation();
  const filter = searchParams.get('filter') || '';
  // console.log('location.state', location.state);

  useEffect(() => {
    if (location?.state?.filter) {
      setSearchParams({ filter: location.state.filter });
    }
  });

  // console.log('searchParams', searchParams)

  const dispatch = useDispatch();

  const { contacts, isLoading, error } = useSelector(getContacts);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  useEffect(() => {
    setsortContacts(contacts);
  }, [contacts]);

  const onSubmit = user => {
    if (
      contacts &&
      contacts.find(contact => {
        const normalizeUser = user.name.toLowerCase();
        return contact.name.toLowerCase() === normalizeUser;
      })
    ) {
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 3000);
    } else {
      dispatch(addContact(user));
    }
  };

  const handleChangeFilter = e => {
    setSearchParams({ filter: e });
  };

  const getVizibleContacts = () => {
    if (filter) {
      const normalizedFilter = filter.toLowerCase();

      const valueFilter = searchParams.get('filter');
      if (valueFilter !== filter) {
        setSearchParams({ filter: normalizedFilter });
      }
      if (contacts) {
        return sortContacts
          ? sortContacts.filter(contact =>
              contact.name.toLowerCase().includes(normalizedFilter)
            )
          : contacts.filter(contact =>
              contact.name.toLowerCase().includes(normalizedFilter)
            );
      }
    }

    return sortContacts ? sortContacts : contacts;
  };

  const onClickBtnSort = () => {
    const inAlphabeticalOrder = [...contacts].sort(
      (firstContact, secondContact) =>
        isSort
          ? secondContact.name.localeCompare(firstContact.name)
          : firstContact.name.localeCompare(secondContact.name)
    );
    setsortContacts(inAlphabeticalOrder);
    setIsSort(!isSort);
  };

  return (
    <>
      <Helmet>
        <title>Contacts</title>
      </Helmet>

      {showError && (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>This contact is already in the phone book!</AlertTitle>
        </Alert>
      )}

      <Container mt={5} maxW="100%" display="flex">
        <Contact
          selectedContact={selectedContact}
          setSelectedContact={setSelectedContact}
        />
        <Container
          p="15px"
          w="400px"
          as="section"
          bg="orange.200"
          color="orange.900"
          borderRadius="10px"
          display="flex"
          alignItems="center"
          flexDirection="column"
        >
          <Heading as="h2" size="2xl" noOfLines={1}>
            Contacts
          </Heading>

          {contacts.length !== 0 && (
            <Container display="flex" mt={5}>
              <Button colorScheme="orange" p="1px" onClick={onClickBtnSort}>
                <LogoSort
                  style={{ width: '25px', height: '25px', fill: 'white' }}
                />
              </Button>
              <FormFind handleChange={handleChangeFilter} value={filter} />
            </Container>
          )}

          {contacts.length === 0 && (
            <Text mt={5} fontSize="2xl">
              Your contact book is empty. Add your first contact in the menu on
              the right.
            </Text>
          )}

          {isLoading && !error && <b>Request in progress...</b>}
          {error && <b>{error};</b>}

          <List mt={5}>
            {getVizibleContacts().map(contact => (
              <ItemContact
                setSelectedContact={setSelectedContact}
                key={contact.id}
                contact={contact}
              />
            ))}
          </List>
        </Container>
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
          <FormContacts onSubmit={onSubmit} name />
        </Container>
      </Container>
    </>
  );
};

export default Cars;
