
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { doctorSignUp } from '../../Services/doctor.service'
import { userSignUp } from '../../Services/user.service'

const useForm = (validate, person) => {
    const navigate = useNavigate()
    const [values, setValues] = useState({
        username: '',
        email: '',
        phone: '',
        password: '',
        confirmpassword: ''
    })


    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)
    const [emailError, setEmailError] = useState("")

    // Making a controlled component
    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { errors, valid } = await validate(values, person)

        setErrors(errors)
        // Sending request if there is no error

        if (valid) {
            setLoading(true)

            try {
                switch (person) {
                    case 'user': {
                        userSignUp(values).then((result) => {
                            setLoading(false)
                            // Redirecting to the OTP Page if Success 
                            localStorage.setItem("UserDetails", JSON.stringify(values))
                            localStorage.setItem("InsertedUser", JSON.stringify(result.data))
                            navigate('/otp')
                        }).catch((result) => {
                            setLoading(false)
                            setEmailError(result.data.message)
                        })
                        break;
                    }

                    case 'doctor': {
                        doctorSignUp(values).then((result) => {
                            setLoading(false)
                            // Redirecting to the OTP Page if Success 
                            localStorage.setItem("DoctorDetails", JSON.stringify(values))
                            localStorage.setItem("InsertedDoctor", JSON.stringify(result.data))
                            navigate('/doctorotp')
                        }).catch((result) => {
                            setLoading(false)
                            setEmailError(result.data.message)
                        })
                        break;
                    }

                    default: return;
                }
            } catch (err) {
                console.log("the error in signup is : ", err)
            }
        }

    }

    return { handleChange, values, handleSubmit, errors, loading, emailError }
}

export default useForm