import React, { useState } from 'react';
import { useFormik } from 'formik';

import styles from './SignIn.module.scss';
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
import { signInSchema } from '../../schemas';

const SignIn: React.FC<{ onSetIsSignUp: (value: boolean) => void }> = ({ onSetIsSignUp }) => {
  const [showPassword, setShowPassword] = useState(false);
  const formik = useFormik({
    initialValues: {
      userName: '',
      password: ''
    },
    validationSchema: signInSchema,
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
  const setSignUpForm = () => {
    onSetIsSignUp(true);
  };
  return (
    <div className={styles.signin}>
      <h1>Sign In</h1>
      <form autoComplete="off" onSubmit={formik.handleSubmit}>
        <div className={styles.field}>
          <InputLabel htmlFor="userName">User Name</InputLabel>
          <Input
            id="userName"
            name="userName"
            value={formik.values.userName}
            onChange={formik.handleChange}
            error={formik.touched.userName && Boolean(formik.errors.userName)}
            placeholder="Example Name"
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
        <Button
          type="submit"
          variant="contained"
          style={{
            borderRadius: 0
          }}>
          Sign In
        </Button>
      </form>
      <p className={styles.changeFrom}>
        I have an account. <span onClick={setSignUpForm}>Go to Sign in</span>
      </p>
    </div>
  );
};

export default SignIn;
