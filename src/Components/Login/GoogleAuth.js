import React from 'react';
import { Chip, Divider, Grid } from '@mui/material';
import './Login.css';
import GoogleButton from 'react-google-button'

const GoogleAuth = () => {
    return (
        <>
            <Grid className='divider'>
                <Divider >
                    <Chip label="OR" />
                </Divider>
            </Grid>

            <Grid container justifyContent="center">
                <GoogleButton className='googleButton' style={{ width: '250px', backgroundColor: '#fff', color: 'black', borderRadius: '20px',marginBottom:'8%'}}
                    onClick={() => { console.log('Google button clicked') }}
                />
            </Grid>

        </>
    )
};

export default GoogleAuth;
