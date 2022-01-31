import axios from 'axios'
import { useState } from 'react'

const useForm = (validate) => {

    const [values, setValues] = useState({
        username: '',
        email: '',
        phone: '',
        password: '',
        confirmpassword: ''
    })

    // const navigate = useNavigate()

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

        const { errors, valid } = await validate(values)

        setErrors(errors)
        // Sending request if there is no error

        if (valid) {
            setLoading(true)
            const config = {
                "headers": "application/json"
            }
            try {
                axios.post('http://localhost:5000/user/registeruser', { username: values.username, email: values.email, password: values.password }, { config }).then((result) => {
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
        } 

    }

    return { handleChange, values, handleSubmit, errors, loading }
}

export default useForm