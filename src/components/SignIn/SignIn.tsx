import React, { useState } from 'react';
import { useFormik } from 'formik';
import axios from '../../api/axios';

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
import { useDispatch } from 'react-redux';
import { login } from '../../store/authentication-slice';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

const SignIn: React.FC<{ onSetSignUp: (value: boolean) => void }> = ({ onSetSignUp }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      userName: '',
      password: ''
    },
    validationSchema: signInSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          '/auth/login',
          JSON.stringify({
            username: values.userName,
            password: values.password
          }),
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );

        if (response.status === 201) {
          dispatch(login(response.data));
          console.log(response.data);
          setError('');
          navigate('/');
        }
      } catch (error) {
        const err = error as AxiosError;
        if (!err?.response) {
          setError('No server response.');
        } else if (err.response.status === 404) {
          setError('User not found');
        } else if (err.response.status === 401) {
          setError('Invalid username or password');
        } else {
          setError('Signing in failed!');
        }
      }
    }
  });
  const handleClickShowPassword = () => {
    setShowPassword(true);
  };
  const handleMouseDownPassword = () => {
    setShowPassword(false);
  };
  const setSignUpForm = () => {
    onSetSignUp(true);
  };
  return (
    <div className={styles.signin}>
      <h1>Sign In</h1>
      {error && <p className={styles.error}>{error}</p>}
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
