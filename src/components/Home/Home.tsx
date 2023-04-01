import React from 'react';

import { useDispatch } from 'react-redux';
import { logout } from '../../store/authentication-slice';
import { Button } from '@mui/material';

import styles from './Home.module.scss';
import home from '../../assets/icons/home.svg';
import congratulations from '../../assets/icons/congratulations.svg';

const Home = () => {
  const dispatch = useDispatch();
  const logOut = () => {
    dispatch(logout());
  };
  return (
    <div className={styles.home}>
      <h1>
        Congratulations
        <img src={congratulations} alt="" />
      </h1>
      <p>
        Now you are on the main page. Soon we will provide you with detailed feedback on the result
        of your work
      </p>
      <Button
        onClick={logOut}
        variant="contained"
        style={{
          borderRadius: 0
        }}>
        Log Out
      </Button>
      <img src={home} alt="" />
    </div>
  );
};

export default Home;
