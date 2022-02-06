import React from 'react';
import { Chip, Divider, Grid } from '@mui/material';
import { GoogleLogin } from 'react-google-login';

import './Login.css';
import GoogleLoginHelper from './GoogleLoginHelper';

const GoogleAuth = () => {

    const { handleLogin, handleLoginFailure } = GoogleLoginHelper()


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
                    onSuccess={(googleData) => {
                        handleLogin(googleData)
                    }}
                    onFailure={(failureReason) => {
                        handleLoginFailure(failureReason)
                    }}
                >
                </GoogleLogin>
            </Grid>

        </>
    )
};

export default GoogleAuth;
