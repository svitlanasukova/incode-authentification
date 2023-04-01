import React, { useState } from 'react';
import SignUp from '../components/SignUp/SignUp';
import SignIn from '../components/SignIn/SignIn';
import Layout from '../components/Layout/Layout';

const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(true);

  return (
    <Layout className="authRoot">
      {isSignUp ? <SignUp onSetSignIn={setIsSignUp} /> : <SignIn onSetSignUp={setIsSignUp} />}
    </Layout>
  );
};

export default AuthPage;
