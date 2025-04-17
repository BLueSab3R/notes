import * as yup from 'yup'

export const noteSchema = yup.object({
  title: yup.string()
    .required('Title is required')
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title must not exceed 100 characters'),
  content: yup.string()
    .required('Content is required')
    .min(10, 'Content must be at least 10 characters')
    .max(1000, 'Content must not exceed 1000 characters')
}) 
