import * as yup from 'yup';

export const addUserShcema = yup.object().shape({
    email: yup
      .string()
      .required('Email is required')
      .email('Invalid email format'),
    password: yup.string().required('Password is required'),
    confirm_password: yup
      .string()
      .required('Confirm password is required')
      .oneOf([yup.ref('password'),], 'Passwords do not match'),
    fullName: yup.string().required('Full name is required'),
    phoneWA: yup.string().required('Phone number (WA) is required'),
    nik: yup.string().required('NIK is required'),
    divisionId: yup.string().required('Division ID is required'),
  });