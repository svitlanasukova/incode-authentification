import * as yup from 'yup';

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
// min 8 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.

export const signUpSchema = yup.object().shape({
  fullName: yup
    .string()
    .min(3, 'Full name must be at least 3 characters long')
    .required('Required'),
  userName: yup.string().min(3, 'Username must be at least 3 characters long').required('Required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .matches(passwordRules, { message: 'Please create a stronger password' })
    .required('Required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Required')
});

export const signInSchema = yup.object().shape({
  userName: yup.string().min(3, 'Username must be at least 3 characters long').required('Required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .matches(passwordRules, { message: 'Please create a stronger password' })
    .required('Required')
});
