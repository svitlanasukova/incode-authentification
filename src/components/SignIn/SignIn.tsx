import React, { useEffect, useState } from 'react';
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
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { signInSchema } from '../../schemas';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signIn } from '../../store/authentification-actions';
import { useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';

const SignIn: React.FC<{ onSetSignUp: () => void }> = ({ onSetSignUp }) => {
  const [showPassword, setShowPassword] = useState(false);
  const error = useSelector((state: RootState) => state.auth.error);
  const token = useSelector((state: RootState) => state.auth.token);
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      userName: '',
      password: ''
    },
    validationSchema: signInSchema,
    onSubmit: async (values) => {
      dispatch(signIn(values));
    }
  });
  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token]);
  const handleClickShowPassword = () => {
    setShowPassword(true);
  };
  const handleMouseDownPassword = () => {
    setShowPassword(false);
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
        <Button
          type="submit"
          variant="contained"
          style={{
            borderRadius: 0,
            marginTop: '0.8rem'
          }}>
          Sign In
        </Button>
      </form>
      <p className={styles.changeFrom}>
        I have an account. <span onClick={onSetSignUp}>Go to Sign in</span>
      </p>
    </div>
  );
};

export default SignIn;
