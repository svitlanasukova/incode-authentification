import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';

import {
  Button,
  FormHelperText,
  IconButton,
  Input,
  InputAdornment,
  InputLabel
} from '@mui/material';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';

import { signUp } from '../../store/authentification-actions';
import { AppDispatch, RootState } from 'store';
import { signUpSchema } from '../../schemas';

import styles from './styles.module.scss';

const SignUp: React.FC<{ onSetSignIn: () => void }> = ({ onSetSignIn }) => {
  const dispatch: AppDispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const error = useSelector((state: RootState) => state.auth.error);
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  const formik = useFormik({
    initialValues: {
      fullName: '',
      userName: '',
      password: '',
      confirmPassword: ''
    },
    validationSchema: signUpSchema,
    onSubmit: async (values) => {
      dispatch(signUp(values));
    }
  });

  useEffect(() => {
    if (isAuthenticated) {
      onSetSignIn();
    }
  }, [isAuthenticated]);

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
  return (
    <div className={styles.signup}>
      <h1>Sign Up</h1>
      {error && <p className={styles.error}>{error}</p>}
      <form autoComplete="off" onSubmit={formik.handleSubmit}>
        <div className={styles.field}>
          <InputLabel htmlFor="fullName">Full Name</InputLabel>
          <Input
            id="fullName"
            name="fullName"
            value={formik.values.fullName}
            onChange={formik.handleChange}
            error={formik.touched.fullName && Boolean(formik.errors.fullName)}
            placeholder="Example Name"
            fullWidth
          />
          <FormHelperText>{formik.touched.fullName && formik.errors.fullName}</FormHelperText>
        </div>
        <div className={styles.field}>
          <InputLabel htmlFor="userName">User Name</InputLabel>
          <Input
            id="userName"
            name="userName"
            value={formik.values.userName}
            onChange={formik.handleChange}
            error={formik.touched.userName && Boolean(formik.errors.userName)}
            placeholder="Example123"
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
            placeholder="***************"
            fullWidth
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}>
                  {showPassword ? <VisibilityOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
                </IconButton>
              </InputAdornment>
            }
          />
          <FormHelperText>{formik.touched.password && formik.errors.password}</FormHelperText>
        </div>
        <div className={styles.field}>
          <InputLabel htmlFor="confirmPassword">Confirm Password</InputLabel>
          <Input
            id="confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            name="confirmPassword"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
            placeholder="***************"
            fullWidth
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowConfirmPassword}
                  onMouseDown={handleMouseDownConfirmPassword}>
                  {showConfirmPassword ? <VisibilityOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
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
            borderRadius: 0,
            marginTop: '0.8rem'
          }}>
          Sign Up
        </Button>
      </form>
      <p className={styles.changeFrom}>
        I have an account. <span onClick={onSetSignIn}>Go to Sign in</span>
      </p>
    </div>
  );
};

export default SignUp;
