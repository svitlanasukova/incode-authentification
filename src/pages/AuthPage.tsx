import React, { useState } from 'react';
import SignUp from '../components/SignUp/SignUp';
import SignIn from '../components/SignIn/SignIn';
import Layout from '../components/Layout/Layout';

const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(true);

  const setSignUp = () => {
    setIsSignUp(true);
  };
  const setSignIn = () => {
    setIsSignUp(false);
  };

  return (
    <Layout className="authRoot">
      {isSignUp ? <SignUp onSetSignIn={setSignIn} /> : <SignIn onSetSignUp={setSignUp} />}
    </Layout>
  );
};

export default AuthPage;
