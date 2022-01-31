import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress'
import Backdrop from '@material-ui/core/Backdrop'

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import logo from '../Logo/Logo.svg'
import validation from './validation';
import './signup.css'
import useForm from './useForm';
import { Link } from 'react-router-dom';





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
        width: '80%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    container: {
        marginTop: theme.spacing(20),
    },
}));

export default function SignUp() {
    const classes = useStyles();

    const { handleChange, values, handleSubmit, errors, loading } = useForm(validation)

    return (
        <Container component="main" className={classes.container} maxWidth="xs" >
            {
                loading && (<Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={loading}

                >
                    <CircularProgress color="inherit" />
                </Backdrop>)
            }
            <CssBaseline />
            <div className={classes.paper} >
                <img src={logo} className={classes.avatar} alt='Logo' />
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>

                <form onSubmit={handleSubmit} className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="fname"
                                name="firstName"
                                variant="standard"
                                fullWidth
                                id="firstName"
                                inputProps={{ style: { fontSize: 12 } }}
                                InputLabelProps={{ style: { fontSize: 12 } }}
                                label="First Name"
                                autoFocus
                                value={values.firstName}
                                onChange={handleChange}
                            />
                            {errors.firstName && <p className='error'>{errors.firstName}</p>}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="standard"
                                fullWidth
                                id="lastName"
                                inputProps={{ style: { fontSize: 12 } }}
                                InputLabelProps={{ style: { fontSize: 12 } }}
                                label="Last Name"
                                name="lastName"
                                autoComplete="lname"
                                value={values.lastName}
                                onChange={handleChange}
                            />
                            {errors.lastName && <p className='error'>{errors.lastName}</p>}
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="standard"
                                fullWidth
                                id="email"
                                inputProps={{ style: { fontSize: 12 } }}
                                InputLabelProps={{ style: { fontSize: 12 } }}
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                value={values.email}
                                onChange={handleChange}
                            />
                            {errors.email && <p className='error'>{errors.email}</p>}
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                variant="standard"
                                fullWidth
                                id="phone"
                                inputProps={{ style: { fontSize: 12 } }}
                                InputLabelProps={{ style: { fontSize: 12 } }}
                                label="Phone Number"
                                type="tel"
                                name="phone"
                                autoComplete="phone"
                                value={values.phone}
                                onChange={handleChange}
                            />
                            {errors.phone && <p className='error'>{errors.phone}</p>}
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                variant="standard"
                                fullWidth
                                inputProps={{ style: { fontSize: 12 } }}
                                InputLabelProps={{ style: { fontSize: 12 } }}
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={values.password}
                                onChange={handleChange}
                            />
                            {errors.password && <p className='error'>{errors.password}</p>}
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                variant="standard"
                                fullWidth
                                inputProps={{ style: { fontSize: 12 } }}
                                InputLabelProps={{ style: { fontSize: 12 } }}
                                name="confirmpassword"
                                label="Confirm Password"
                                type="password"
                                id="confirmPassword"
                                autoComplete="current-password"
                                value={values.confirmpassword}
                                onChange={handleChange}
                            />
                            {errors.confirmpassword && <p className='error'>{errors.confirmpassword}</p>}
                        </Grid>
                    </Grid>

                    <Grid container justifyContent="center">
                        <Button
                            type="submit"
                            variant="contained"
                            style={{ backgroundColor: '#00C9B5', color: '#fff' }}
                            className={classes.submit}
                        >
                            Sign Up
                        </Button>
                    </Grid>
                    <Grid container justifyContent="center">
                        <Grid item>
                            Already have an account ?<Link style={{ textDecoration: 'none', color: '#00C9B5', fontWeight: '500' }} to='/'> Sign in</Link>
                        </Grid>
                    </Grid>
                </form>
            </div>

        </Container>
    );
}