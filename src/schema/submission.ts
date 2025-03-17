import * as yup from 'yup';

export const addSubmissionShcema = yup.object().shape({
    projectId: yup
      .string()
      .required('Project required'),
    date: yup.string().required('date is required'),
    activity: yup.string().required('activity is required'),
    description: yup.string().required('description is required'),
    typeId: yup.string().required('typeis required'),
  });