import * as Yup from 'yup';

export const validationRegisterFormScheme = Yup.object().shape({
  id: Yup.string().required('Povinné pole'),
  name: Yup.string(),
  surname: Yup.string(),
  email: Yup.string()
    .required('Povinné pole')
    .email('Zadejte platnou e-mailovou adresu'),
  password: Yup.string()
    .required('Povinné pole')
    .min(8, 'Heslo musí mít alespoň 8 znaků')
    .max(32, 'Heslo musí mít méně než 32 znaky')
    .matches(
      /^(?=.*[A-Z])(?=.*\d).{8,16}$/,
      'Heslo musí obsahovat alespoň 8 znaků, jedno velké písmeno a jednu číslici'
    ),
  phoneNumber: Yup.string()
    .required('Telefonní číslo je povinné')
    .matches(/^(?:\+420)?\d{9}$/, 'Zadejte platné české telefonní číslo'),
});
