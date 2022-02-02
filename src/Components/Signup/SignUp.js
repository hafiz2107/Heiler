import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import logo from '../Logo/Logo.svg'
import './signup.css'
import useForm from './useForm';
import { Link } from 'react-router-dom';
import validation from './validation';
import { Loading } from 'react-loading-dot'


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

    const { handleChange, values, handleSubmit, errors, loading ,emailError} = useForm(validation)

    return (
        <Container component="main" className={classes.container} maxWidth="xs" >

            <CssBaseline />
            <div className={classes.paper} >
                <img src={logo} className={classes.avatar} alt='Logo' />
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
            {emailError && <p>{emailError}</p>}
                <form onSubmit={handleSubmit} className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                autoComplete="fname"
                                name="username"
                                variant="standard"
                                fullWidth
                                id="username"
                                inputProps={{ style: { fontSize: 12 } }}
                                InputLabelProps={{ style: { fontSize: 12 } }}
                                label="User Name"
                                autoFocus
                                value={values.username}
                                onChange={handleChange}
                            />

                            {errors.username && <p className='error'>{errors.username}</p>}
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
                            {errors.emailAlreadyExits && <p className='error'>{errors.emailAlreadyExits}</p>}
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
                        {
                            loading ?
                                <Loading dots={4} background='#389df5' margin='0.5rem' /> :
                                <Button
                                    type="submit"
                                    variant="contained"
                                    style={{ backgroundColor: '#00C9B5', color: '#fff' }}
                                    className={classes.submit}
                                >
                                    Signup
                                </Button>
                        }

                    </Grid>
                    <Grid>

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