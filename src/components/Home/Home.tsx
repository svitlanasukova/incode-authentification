import React from 'react';

import { useDispatch } from 'react-redux';
import { Button } from '@mui/material';
import { userLogout } from '../../store/authentification-actions';

import styles from './Home.module.scss';
import home from '../../assets/icons/home.svg';
import congratulations from '../../assets/icons/congratulations.svg';
import { AppDispatch, RootState } from '../../store';
import { useSelector } from 'react-redux';

const Home = () => {
  const dispatch: AppDispatch = useDispatch();
  const error = useSelector((state: RootState) => state.auth.error);
  const logOut = () => {
    dispatch(userLogout());
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
      {error && <p className={styles.error}>{error}</p>}
      <img src={home} alt="" className={styles.homeImg} />
    </div>
  );
};

export default Home;
