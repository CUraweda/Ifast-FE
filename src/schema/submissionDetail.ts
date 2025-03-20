import * as yup from 'yup';

export const addSubmissionDetailShcema = yup.object().shape({
  submissionId: yup.string().optional(),
    name: yup.string().required('name is required'),
    qty: yup.number().required('Quantity is required'),
    categoryId: yup.string().required('Category is required'),
    amount: yup.number().required('Amount is required'),
    evidence:  yup
    .mixed<File>()
    .required()
    .defined()
    .required("Sertifikat file is required")
    .test(
      "fileSize",
      "File size must not exceed 1MB",
      (value) => value ? value.size <= 1 * 1024 * 1024 : false // 2MB limit
    )
    .test("fileType", "Only image files jpeg, jpg, png are allowed", (value) =>
      value ? ["image/jpeg", "image/png"].includes(value.type) : false
    ),
    
  });