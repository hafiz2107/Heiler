import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { Alert } from '@material-ui/lab';
import { Link } from 'react-router-dom'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import logo from '../Logo/Logo.svg'
import validation from './validation';
import axios from 'axios'
import GoogleAuth from './GoogleAuth';

// import './signup.css'



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
        marginTop: theme.spacing(25),
    },
}));

export default function SignUp() {
    const classes = useStyles();

    const [values, setValues] = useState({
        email: '',
        password: '',
    })
    const [authError, setAuthError] = useState({
        password: '',
        email: ''
    });
    const [errors, setErrors] = useState({})

    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })

    }
    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors(validation(values))

        if (errors) {
            const config = {
                "headers": "application/json"
            }
            try {
                axios.post('http://localhost:5000/user/login', { ...values }, { config }).then((result) => {
                    switch (result.data.message) {
                        case "Wrong Password":
                            setAuthError({
                                ...authError,
                                password: "Wrong Password"
                            })
                            break;
                        case "No user found":
                            setAuthError({
                                ...authError,
                                email: "Invalid Email"
                            })
                            break;

                        default: return;
                    }
                })
            } catch {
                console.log("the error  !!")
            }
        } else {
            alert("hii")
        }

    }

    return (
        <Container component="main" className={classes.container} maxWidth="xs" >
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

                <form onSubmit={handleSubmit} className={classes.form} noValidate>


                    <Grid container spacing={2}>
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

                    </Grid>

                    <Grid container justifyContent="center">
                        <Button
                            type="submit"
                            variant="contained"
                            style={{ backgroundColor: '#00C9B5', color: '#fff' }}
                            className={classes.submit}
                        >
                            Sign In
                        </Button>
                    </Grid>
                    <GoogleAuth />
                    <Grid container justifyContent="center">
                        <Grid item>
                            Don't have an account ? <Link style={{ textDecoration: 'none', color: '#00C9B5', fontWeight: '500' }} to='/signup'>Sign Up</Link>
                        </Grid>
                    </Grid>
                </form>
            </div>

        </Container>
    );
}