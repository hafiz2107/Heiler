import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { Alert } from '@material-ui/lab';
import { Link } from 'react-router-dom'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Loading } from 'react-loading-dot/lib';

import GoogleAuth from './GoogleAuth';
import logo from '../Logo/Logo.svg'
import themeImage from '../Logo/undraw_wishes_icyp 1.svg'
import useForm from './userForm';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '20%',
    },
    form: {
        width: '60%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));



export default function Login({ person }) {
    const { values, googleAuthError, authError, errors, loading, handleChange, handleSubmit } = useForm()

    console.log("The person is : ",person)
    const classes = useStyles();

    return (
        <Container className="container" maxWidth='lg' >
            <Grid container spacing={5}>

                <Grid item xs={12} md={6} sm={6} className='firstGrid'>
                    <img className='themeImage' src={themeImage} alt='' />
                </Grid>

                <Grid item xs={12} md={6} sm={6} className='secondGrid'>
                    <CssBaseline />
                    <div className={classes.paper} >
                        <img src={logo} className={classes.avatar} alt='Logo' />
                        <Typography component="h1" variant="h5">
                            Sign In
                        </Typography>

                        {/* Showing The password Error  */}

                        {authError.password && (<Alert severity="error">
                            <strong>Password incorrect</strong>
                        </Alert>)}

                        {authError.email && (<Alert severity="error">
                            <strong>Invalid Email</strong>
                        </Alert>)}

                        {googleAuthError && (<Alert severity="error">
                            <strong>{googleAuthError}</strong>
                        </Alert>)}

                        <form onSubmit={handleSubmit} className={classes.form} >
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                        id="email"
                                        inputProps={{ style: { fontSize: 12 } }}
                                        InputLabelProps={{ style: { fontSize: 12 } }}
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                        value={values.email}
                                        onChange={handleChange}
                                        error={authError.email || errors.email ? true : false}

                                    />
                                    {errors.email && <p className='error'>{errors.email}</p>}
                                </Grid>


                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                        inputProps={{ style: { fontSize: 12 } }}
                                        InputLabelProps={{ style: { fontSize: 13 } }}
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="current-password"
                                        value={values.password}
                                        onChange={handleChange}
                                        error={authError.password || errors.password ? true : false}
                                    />
                                    {errors.password && <p className='error'>{errors.password}</p>}
                                </Grid>
                            </Grid>

                            <Grid container justifyContent="center">
                                {
                                    loading ?
                                        <Loading dots={4} background='#389df5' margin='0.5rem' /> :
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            style={{ backgroundColor: '#00C9B5', color: '#fff' }}
                                            className={classes.submit}
                                        >
                                            Sign In
                                        </Button>
                                }
                            </Grid>
                            <GoogleAuth />
                            <Grid container justifyContent="center">
                                <Grid item>
                                    Don't have an account ? <Link style={{ textDecoration: 'none', color: '#00C9B5', fontWeight: '500' }} to='/signup'>Sign Up</Link>
                                </Grid>
                            </Grid>
                        </form>
                    </div>
                </Grid>
            </Grid>

        </Container>
    );
}