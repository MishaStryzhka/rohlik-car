import { SearchIcon } from '@chakra-ui/icons';
import {
  FormControl,
  IconButton,
  Input,
  InputGroup,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { useState } from 'react';

const FormFind = ({ value, handleChange }) => {
  const [showInput, setShowInput] = useState(value ? true : false);
  const handleClick = e => {
    setShowInput(!showInput);
    handleChange("")
  };

  const handleChangeValue = e => {
    handleChange(e.target.value)
  }
  return (
    <FormControl w="320px">
      <InputGroup ml={1}>
        <IconButton
          onClick={handleClick}
          colorScheme="orange"
          aria-label="Search database"
          icon={<SearchIcon />}
        />
        {showInput && (
          <Input
          ml={1}
            value={value}
            autoComplete="false"
            onChange={handleChangeValue}
            bg="orange.100"
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
            placeholder="Find contacts by name."
          />
        )}
      </InputGroup>
    </FormControl>
  );
};

FormFind.propTypes = {
  handleChange: PropTypes.func.isRequired,
  value: PropTypes.string,
};

export default FormFind;
