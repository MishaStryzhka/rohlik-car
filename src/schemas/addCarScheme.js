import { TYPES_CAR } from 'data';
import { checkNameUnique } from 'helpers/checkNameUnique';
import * as Yup from 'yup';

const carTypeRegex = new RegExp(`^(${TYPES_CAR.join('|')})\\d+$`);

export const validationAddCarSchema = Yup.object({
  name: Yup.string()
    .matches(
      carTypeRegex,
      'Název musí obsahovat typ a číslo, například "CDV114"'
    )
    .required('Název je povinný')
    .test('unique', 'Toto auto již existuje', async value => {
      if (!value) return false;
      const isUnique = await checkNameUnique(value);
      return isUnique;
    }),
  type: Yup.string().required('Typ je povinný'),
  drivingStyle: Yup.string().required('Typ je povinný'),
  comment: Yup.string(),
});
