import { TYPES_CAR } from 'data';
import * as Yup from 'yup';

const carTypeRegex = new RegExp(`^(${TYPES_CAR.join('|')})\\d+$`);

export const updateCarSchema = Yup.object({
  name: Yup.string()
    .matches(
      carTypeRegex,
      'Název musí obsahovat typ a číslo, například "CDV114"'
    )
    .required('Název je povinný'),
  type: Yup.string().required('Typ je povinný'),
  drivingStyle: Yup.string().required('Typ je povinný'),
  comment: Yup.string(),
});
