import React from 'react';
import Login from '../../../Components/Login/Login'
import './Login.css'

const LoginScreen = ({ person }) => {

  return (
    <div className='loginScreen'>
      <Login person={person} />
    </div>
  );
};

export default LoginScreen;
