import React, { useState } from 'react';
import { Chip, Divider, Grid } from '@mui/material';
import './Login.css';
import { GoogleLogin } from 'react-google-login';
import axios from 'axios';

const GoogleAuth = () => {

    const [loginData, setLoginData] = useState(
        localStorage.getItem('loginData') ? JSON.parse(localStorage.getItem('loginData')) : null
    )

    // If the login is success
    const handleLogin = async (googleData) => {
        const config = {
            headers: {
                "headers": "application/json"
            }
        }
        const result = await axios.post('http://localhost:5000/user/googlelogin', { token: googleData.tokenId }, { config })
        console.log("the result is : ", result)
        const data = await result.JSON();
        console.log("The data is : ", data);
        setLoginData(data)
        // localStorage.setItem('loginData', JSON.stringify(data))
    }
    // If  the login fails
    const handleLoginFailure = (result) => {
        alert(result)
    }
    return (
        <>
            <Grid className='divider'>
                <Divider >
                    <Chip label="OR" />
                </Divider>
            </Grid>

            <Grid container justifyContent="center">
                <GoogleLogin
                    className='googleButton'
                    clientId='264482201490-t8im9fhn04h1v3r201ov117nd6eudbg1.apps.googleusercontent.com'
                    buttonText='Login With Google'
                    onSuccess={handleLogin}
                    onFailure={handleLoginFailure}
                >
                </GoogleLogin>
            </Grid>

        </>
    )
};

export default GoogleAuth;
