import React from 'react';
import Login from '../../../Components/Login/Login'
import './Login.css'

const LoginScreen = () => {
  return (
    <div className='loginScreen'>
      <Login person='doctor'/>
    </div>
  );
};

export default LoginScreen;
