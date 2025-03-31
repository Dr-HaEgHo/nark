import * as yup from 'yup';



const passwordRules = /^(?=.*\d)(?=.*[a-z]).{5,}$/

export const signupSchema = yup.object().shape({
    firstname: yup.string().required('Required'),
    lastname: yup.string().required("Required"),
    email: yup.string().email("Please enter a valid email").required("Required"), 
    password: yup
        .string()
        .min(8)
        .matches(passwordRules, { message: "Passwords must contain atleast one lowercase letter and one number" })
        .required("Required"),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password'), undefined], "Passwords must match")
        .required("Required")
});

export const loginSchema = yup.object().shape({
  email: yup.string().email("Please enter a valid email").required("Required"), 
  password: yup
      .string()
      .min(8)
      .matches(passwordRules, { message: "Passwords must contain atleast one lowercase letter and one number" })
      .required("Required"),
});