import * as yup from 'yup';

export const addRoleShcema = yup.object().shape({
    code: yup
      .string()
      .required('code is required'),
    name: yup.string().required('name is required'),
    description: yup.string().required('description is required'),
  });