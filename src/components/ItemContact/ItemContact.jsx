import css from './ItemContact.module.css';
import { Button } from '@chakra-ui/react';

const ItemContact = ({ contact, setSelectedContact }) => {
  const handelClickBtnContact = () => {
    setSelectedContact(contact)
  };

  return (
    <li className={css.item} key={contact.id} id={contact.id}>
      <Button colorScheme="orange.900" variant="link" onClick={handelClickBtnContact}>
        {contact.name}
      </Button>
    </li>
  );
};

export default ItemContact;
