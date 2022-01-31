import axios from "axios";

const validation = async (values) => {
    let errors = {};
    let valid = true;


    const checkEmailAlreadyExist = () => {
        return new Promise((resolve, reject) => {
            try {
                const config = {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
                axios.post('http://localhost:5000/user/checkemail', { email: values.email }, { config }).then((result) => {
                    if (result.status === 204) {
                        resolve(true)
                    } else {
                        reject(false)
                    }
                })
            } catch (err) {
                console.log("There are errors in email checking", err)
            }
        })
    }

    await checkEmailAlreadyExist().then((result) => {
        errors.emailAlreadyExits = "Email Already exists"
        valid = false
    }).catch((noError) => {
        valid = true
    })

    
    if (!values.username) {
        errors.username = "User Name is required";
        valid = false
    }

    if (!values.email) {
        errors.email = "Email is required"
        valid = false
    } else if (!/^[a-zA-Z0-9.!#$%&'*+=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(values.email)) {
        errors.email = "Please Enter a valid email"
        valid = false
    }

    if (!values.password) {
        errors.password = "Password is required"
        valid = false
    } else if (values.password.length < 6) {
        errors.password = "Please enter atleast 6 characters"
        valid = false
    }

    if (!values.confirmpassword) {
        errors.confirmpassword = "Password Confirmation is required"
        valid = false
    } else if (values.confirmpassword !== values.password) {
        errors.confirmpassword = "The passwords must be same"
        valid = false
    }
    
    return { errors, valid }
}

export default validation