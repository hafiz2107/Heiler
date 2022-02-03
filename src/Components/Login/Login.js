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
import { Loading } from 'react-loading-dot/lib';
import themeImage from '../Logo/undraw_wishes_icyp 1.svg'


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



export default function Login() {
    const classes = useStyles();

    const [values, setValues] = useState({
        email: '',
        password: '',
    })

    // Errors send from backend 
    // Wrong password or email error
    const [authError, setAuthError] = useState({
        password: '',
        email: ''
    });
    // State to manage the validation
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })

    }
    const handleSubmit = (e) => {
        e.preventDefault();

        const { errors, valid } = validation(values)

        setErrors(errors)

        if (valid) {
            const config = {
                "headers": "application/json"
            }
            try {
                setLoading(true)
                axios.post('http://localhost:5000/user/login', { ...values }, { config }).then((result) => {
                    switch (result.data.message) {
                        case "Wrong Password":
                            setLoading(false)
                            setAuthError({
                                ...authError,
                                password: "Wrong Password"
                            })
                            break;
                        case "No user found":
                            setLoading(false)
                            setAuthError({
                                ...authError,
                                email: "Invalid Email"
                            })
                            break;
                        // Success Case
                        case "Auth successfull":
                            setLoading(false)
                            console.log("Redirecting to HOME page");
                            break;

                        default: return;
                    }
                })
            } catch (err) {
                console.log("the error  !!", err)
            }
        } else {
            alert("else")
        }

    }

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

                        <form onSubmit={handleSubmit} className={classes.form} noValidate>


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
                                    />
                                    {errors.email && <p className='error'>{errors.email}</p>}
                                </Grid>


                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                        inputProps={{ style: { fontSize: 12 } }}
                                        InputLabelProps={{ style: { fontSize: 12 } }}
                                        InputProps={{
                                            classes: {
                                                notchedOutline: classes.notchedOutline
                                            }
                                        }}
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