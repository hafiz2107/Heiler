import { useState } from 'react';
import { useSelector } from 'react-redux'
import validation from "./validation";
import { login } from '../../Services/user.service';
import { doctorLogin } from '../../Services/doctor.service'
import { makeStyles } from '@material-ui/core/styles';


const useForm = (person) => {
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

    const classes = useStyles();

    const [values, setValues] = useState({
        email: '',
        password: '',
    })

    const googleAuthError = useSelector((state) => {
        return state.googleAuthError.error
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
            try {
                setLoading(true)

                switch (person) {
                    case 'user': {
                        login(values).then((result) => {
                            switch (result.data.message) {
                                // Success Case
                                case "Auth successfull":
                                    setLoading(false)
                                    console.log("Redirecting to HOME page");
                                    break;

                                default: return;
                            }
                        }).catch((errResponse) => {
                            switch (errResponse.response.data.message) {
                                case 'Wrong Password':
                                    setLoading(false)
                                    setAuthError({
                                        email: "",
                                        password: "Wrong Password"
                                    })
                                    break;
                                case "No user found":
                                    setLoading(false)
                                    setAuthError({
                                        password: "",
                                        email: "Invalid Email"
                                    })
                                    break;
                                default:
                                    return;
                            }
                        })
                        break;
                    }

                    case 'doctor': {
                        doctorLogin(values).then((result) => {
                            switch (result.data.message) {
                                // Success Case
                                case "Auth successfull":
                                    setLoading(false)
                                    console.log("Redirecting to HOME page");
                                    break;

                                default: return;
                            }
                        }).catch((errResponse) => {
                            switch (errResponse.response.data.message) {
                                case 'Wrong Password':
                                    setLoading(false)
                                    setAuthError({
                                        email: "",
                                        password: "Wrong Password"
                                    })
                                    break;
                                case "No user found":
                                    setLoading(false)
                                    setAuthError({
                                        password: "",
                                        email: "Invalid Email"
                                    })
                                    break;
                                default:
                                    return;
                            }
                        })
                        break;
                    }
                    default:
                        return;
                }
            } catch (err) {
                console.log("the error  !!", err)
            }
        }

    }

    return { classes, values, setValues, googleAuthError, authError, setAuthError, errors, setErrors, loading, setLoading, handleChange, handleSubmit }
}
export default useForm