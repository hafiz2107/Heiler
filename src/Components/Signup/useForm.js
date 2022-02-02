import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const useForm = (validate) => {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        username: '',
        email: '',
        phone: '',
        password: '',
        confirmpassword: ''
    })

    
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)
    const [emailError , setEmailError] = useState("")

    // Making a controlled component
    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { errors, valid } = await validate(values)

        setErrors(errors)
        // Sending request if there is no error

        if (valid) {
            setLoading(true)
            const config = {
                "headers": "application/json"
            }
            try {
                axios.post('http://localhost:5000/user/sendOtp', { username: values.username, email: values.email, password: values.password }, { config }).then((result) => {
                    if (result.status === 200) {
                        setLoading(false)
                        // Redirecting to the OTP Page if Success 
                        localStorage.setItem("InsertedUser", JSON.stringify(result.data))
                        navigate('/otp')
                    } else if (result.status === 201) {
                        setLoading(false)
                        setEmailError(result.data.message)
                    } else {
                        setLoading(false)
                        // Showing an OTP send error if failed
                    }
                })
            } catch {

            }
        }

    }

    return { handleChange, values, handleSubmit, errors, loading ,emailError}
}

export default useForm