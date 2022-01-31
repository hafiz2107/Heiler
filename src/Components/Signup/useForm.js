import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const useForm = (validate) => {


    const [values, setValues] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        confirmpassword: ''
    })

    const navigate = useNavigate()

    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)

    // Making a controlled component
    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        setErrors(validate(values))
        // Sending request if there is no error
        if (!errors) {
            setLoading(true)

            const config = {
                "headers": "application/json"
            }
            try {
                axios.post('http://localhost:5000/user/registeruser', { firstName: values.firstName, lastName: values.lastName, email: values.email, phone: values.phone, password: values.password }, { config }).then((result) => {
                    if (result.status === 200) {
                        setLoading(false)
                        alert("Success")
                    } else {
                        alert("Failed")
                        setLoading(false)
                    }
                })
            } catch {

            }
        } else {
            alert("error")
        }

    }

    return { handleChange, values, handleSubmit, errors, loading }
}

export default useForm