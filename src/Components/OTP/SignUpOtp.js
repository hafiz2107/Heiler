import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import OTPInput from "otp-input-react";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import { SendRounded } from "@material-ui/icons"
import LoadingButton from '@mui/lab/LoadingButton'
// import { Alert } from '@material-ui/lab';
import {Alert} from '@material-ui/lab/'
import './SignUpOtp.css'
import { useTimer } from 'react-timer-hook';
import axios from "axios";
// import { useNavigate } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
    grid: {
        backgroundColor: "grey",
        height: "50vh",
        textAlign: "center"
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    },
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    }
}));

export default function SignUpOtp() {
    const classes = useStyles();


    const [OTP, setOTP] = useState("");
    const [otpError, setOtpError] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    const {
        seconds,
        start,
        restart,
    } = useTimer({ expiryTimestamp: new Date().setSeconds(new Date().getSeconds() + 30), onExpire: () => console.warn('') });

    useEffect(() => {
        // Setting Loading to true for 30 seconds on window onload
        setLoading(true)
        setTimeout(() => {
            // Starting the timer To send The OTP
            start()
            setLoading(false)
        }, 30000)
    }, []);


    // Disabling resend OTP button on a click on Resend button
    const handleClick = () => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 30000)

        // Setting Timer To restart
        const time = new Date();
        time.setSeconds(time.getSeconds() + 30);
        restart(time)

        // Send Request to resend OTP
    };
    // setLoading(true)

    // Function To submit The OTP
    const handleSubmit = async () => {
        let userId = localStorage.getItem("InsertedUser")
        userId = JSON.parse(userId);

        try {
            const config = {
                headers: {
                    "Content-Type": "application/json"
                }
            }
            axios.post('http://localhost:5000/user/verifyotp', { userId, inputOtp: OTP }, { config }).then((response) => {
                if (response.status === 200) {
                    localStorage.removeItem("InsertedUser")
                    navigate('/')
                }
                if (response.status === 201) {
                    setOtpError("Invalid OTP")
                }
            })
        } catch (err) {
            setOtpError("Invalid OTP")
            console.log("The error in verifying OTP is  : ", err.response);
        }
    }



    return (
        <Container component="main" maxWidth="sm">
            <CssBaseline />
            <div className={classes.paper}>

                <Grid
                    container
                    style={{ backgroundColor: "white" }}
                    className={classes.grid}
                    justify="center"
                    alignItems="center"
                    spacing={3}
                >
                    <Grid item container justify="center">
                        <Grid item container alignItems="center" direction="column">
                            <Grid item>
                                <Avatar className={classes.avatar}>
                                    <LockOutlinedIcon />
                                </Avatar>
                            </Grid>
                            <Grid item>
                                <Typography component="h1" variant="h5">
                                    Verification Code
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item container xs={12} justify="center">
                        <Paper elevation={0}>
                            <Typography variant="h6">
                                Please enter the verification code sent to your Email
                            </Typography>
                        </Paper>
                    </Grid>
                    {otpError &&
                        <Grid>
                            <Alert severity="error">
                                <strong>{otpError}</strong>
                            </Alert>
                        </Grid>
                    }
                    <Grid item xs={12} container justify="center" alignItems="center" direction="column" >
                        <Grid item container spacing={3} justify="center">
                            <OTPInput className="otpInput" value={OTP} onChange={setOTP} autoFocus OTPLength={4} otpType="number" disabled={false} />
                        </Grid>


                        <Grid>
                            <LoadingButton
                                onClick={(e) => {
                                    handleClick()
                                }}
                                endIcon={<SendRounded />}
                                loading={loading}
                                loadingPosition="end"
                                variant="contained"
                                style={{ float: "right", marginTop: "25px", backgroundColor: "#00C9B5" }}
                            >
                                {loading ? `Resend OTP in : ${seconds}` : "Resend OTP"}
                            </LoadingButton>
                        </Grid>

                        {/* Verify Button */}
                        <Grid container item justify="center">
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                style={{ backgroundColor: '#6BB8FF' }}
                                onClick={handleSubmit}
                            >
                                Verify
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        </Container>
    );
}

