import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Timer } from "../Timer/Timer";
import { sendOtp, verifyOtp } from '../../Services/user.service'

import { sendDoctorOtp, verifyDoctorOtp } from '../../Services/doctor.service'

const useForm = (person) => {
    // Timer Component
    const { start, restart, seconds } = Timer()
    const [OTP, setOTP] = useState("");
    const [sendOtpSuccess, setSendOtp] = useState("")
    const [otpError, setOtpError] = useState("")
    const [loading, setLoading] = useState(false)
    const [verifyLoading, setVerifyLoading] = useState(false)
    const [authSuccess, setAuthSuccess] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
        // Setting Loading to true for 30 seconds on window onload
        setLoading(true)
        setTimeout(() => {
            // Starting the timer To send The OTP
            start()
            setLoading(false)
        }, 30000)
        // eslint-disable-next-line
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
        try {

            setSendOtp('OTP Succesfully send to you Email')
            setOtpError('')
            setOTP('')

            // Function For sending and resending OTP
            sendOtp().then((result) => {
            }).catch((err) => {

            })

        } catch (err) {
            setOTP('')
            console.log("The error in resending OTP is : ", err)
        }

    };

    const handleDoctorClick = () => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 30000)

        // Setting Timer To restart
        const time = new Date();
        time.setSeconds(time.getSeconds() + 30);
        restart(time)

        // Send Request to resend OTP
        try {
            setOtpError("")
            sendDoctorOtp().then((result) => {
            }).catch((err) => {

            })

        } catch (err) {
            setOTP('')
            console.log("The error in resending OTP is : ", err)
        }

    };

    const handleDoctorSubmit = async () => {
        if (OTP.length === 4) {
            try {
                let doctorId = localStorage.getItem("InsertedDoctor")
                doctorId = JSON.parse(doctorId);

                setVerifyLoading(true)

                verifyDoctorOtp(OTP, doctorId).then((response) => {
                    if (response.status === 200) {
                        setLoading(false)
                        setOtpError("")
                        localStorage.removeItem("InsertedDoctor")
                        localStorage.removeItem("DoctorDetails")

                        // Redirecting to login page if successfully signed in
                        setAuthSuccess(true)

                        setTimeout(() => {
                            navigate('/doctor')
                        }, 1500)
                    }
                }).catch((errResponse) => {
                    setVerifyLoading(false)
                    setOtpError(errResponse)
                })

            } catch (err) {
                setLoading(true)
                setOtpError("Invalid OTP")
            }
        } else {
            setVerifyLoading(false)
            setOtpError("")
            setAuthSuccess(false)
            setOtpError("All Digits are required")
        }
    }



    // Function To submit The OTP
    const handleSubmit = async () => {
        if (OTP.length === 4) {
            try {
                let userId = localStorage.getItem("InsertedUser")
                userId = JSON.parse(userId);
                setVerifyLoading(true)
                verifyOtp(OTP, userId).then((response) => {
                    if (response.status === 200) {
                        setLoading(false)
                        localStorage.removeItem("InsertedUser")
                        localStorage.removeItem("UserDetails")

                        // Redirecting to login page if successfully signed in
                        setAuthSuccess(true)

                        setTimeout(() => {
                            navigate('/')
                        }, 1500)
                    }
                }).catch((errResponse) => {
                    setVerifyLoading(false)
                    setOtpError(errResponse)
                })



            } catch (err) {
                setLoading(true)
                setOtpError("Invalid OTP")
            }
        } else {
            setVerifyLoading(false)
            setOtpError("")
            setAuthSuccess(false)
            setOtpError("All Digits are required")
        }
    }

    return { handleClick, handleDoctorClick, handleSubmit, handleDoctorSubmit, authSuccess, setAuthSuccess, otpError, OTP, setOTP, loading, seconds, sendOtpSuccess, verifyLoading }
};

export default useForm;