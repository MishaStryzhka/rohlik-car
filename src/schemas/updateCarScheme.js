import * as Yup from 'yup';

export const updateCarSchema = Yup.object({
  name: Yup.string()
    .matches(
      /^(CD|CDV|OV|D|EXP)\d+$/,
      'Název musí obsahovat typ a číslo, například "CDV114"'
    )
    .required('Název je povinný'),
  type: Yup.string().required('Typ je povinný'),
  drivingStyle: Yup.string().required('Typ je povinný'),
  comment: Yup.string(),
});
