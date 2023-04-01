import React, { useState } from 'react';
import { useFormik } from 'formik';

import styles from './SignUp.module.scss';
import {
  Button,
  FormHelperText,
  IconButton,
  Input,
  InputAdornment,
  InputLabel
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { signUpSchema } from '../../schemas';

const SignUp: React.FC<{ onSetIsSignUp: (value: boolean) => void }> = ({ onSetIsSignUp }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const formik = useFormik({
    initialValues: {
      fullName: '',
      userName: '',
      password: '',
      confirmPassword: ''
    },
    validationSchema: signUpSchema,
    onSubmit: (values) => {
      console.log(values);
    }
  });
  const handleClickShowPassword = () => {
    setShowPassword(true);
  };
  const handleMouseDownPassword = () => {
    setShowPassword(false);
  };
  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(true);
  };
  const handleMouseDownConfirmPassword = () => {
    setShowConfirmPassword(false);
  };
  const setSignInForm = () => {
    onSetIsSignUp(false);
  };
  return (
    <div className={styles.signup}>
      <h1>Sign Up</h1>
      <form autoComplete="off" onSubmit={formik.handleSubmit}>
        <div className={styles.field}>
          <InputLabel htmlFor="fullName">Full name</InputLabel>
          <Input
            id="fullName"
            name="fullName"
            value={formik.values.fullName}
            onChange={formik.handleChange}
            error={formik.touched.fullName && Boolean(formik.errors.fullName)}
            placeholder="Full name"
            fullWidth
          />
          <FormHelperText>{formik.touched.fullName && formik.errors.fullName}</FormHelperText>
        </div>
        <div className={styles.field}>
          <InputLabel htmlFor="userName">Username</InputLabel>
          <Input
            id="userName"
            name="userName"
            value={formik.values.userName}
            onChange={formik.handleChange}
            error={formik.touched.userName && Boolean(formik.errors.userName)}
            placeholder="Username"
            fullWidth
          />
          <FormHelperText>{formik.touched.userName && formik.errors.userName}</FormHelperText>
        </div>
        <div className={styles.field}>
          <InputLabel htmlFor="password">Password</InputLabel>
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            placeholder="Password"
            fullWidth
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}>
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
          <FormHelperText>{formik.touched.password && formik.errors.password}</FormHelperText>
        </div>
        <div className={styles.field}>
          <InputLabel htmlFor="confirmPassword">Confirm password</InputLabel>
          <Input
            id="confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            name="confirmPassword"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
            placeholder="Confirm password"
            fullWidth
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowConfirmPassword}
                  onMouseDown={handleMouseDownConfirmPassword}>
                  {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
          <FormHelperText>
            {formik.touched.confirmPassword && formik.errors.confirmPassword}
          </FormHelperText>
        </div>
        <Button
          type="submit"
          variant="contained"
          style={{
            borderRadius: 0
          }}>
          Sign Up
        </Button>
      </form>
      <p className={styles.changeFrom}>
        Don’t have account yet? <span onClick={setSignInForm}>New Account</span>
      </p>
    </div>
  );
};

export default SignUp;
