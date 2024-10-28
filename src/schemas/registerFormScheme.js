import * as Yup from 'yup';

export const validationRegisterFormScheme = Yup.object().shape({
  id: Yup.string().matches(/^\d{5}$/, 'id must be exactly 5 digits'),
  name: Yup.string(),
  surname: Yup.string(),
  email: Yup.string()
    .required('Required field')
    .email('Enter a valid email address'),
  password: Yup.string()
    .required('Pin is required')
    .matches(/^\d{6}$/, 'Pin must be exactly 6 digits'),
  phoneNumber: Yup.string()
    .required('Phone number is required')
    .matches(/^(?:\+420)?\d{9}$/, 'Enter a valid Czech phone number'),
});
