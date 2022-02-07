import axios from 'axios'


const config = {
    headers: {
        "Content-Type": "application/json"
    }
}
const server = 'http://localhost:5000/doctor';

// Function TO login User
const doctorLogin = (values) => {
    return new Promise((resolve, reject) => {
        axios.post(`${server}/login`, { ...values }, { config }).then((response) => {
            // Resolving If the details are true
            resolve(response)
        }).catch((errResponse) => {
            // Rejecting if the details are false
            reject(errResponse)
        })
    })
}

// Function To handle Sign UP
const doctorSignUp = (values) => {
    return new Promise((resolve, reject) => {
        axios.post(`${server}/sendOtp`, { username: values.username, email: values.email, password: values.password }, { config }).then((result) => {
            if (result.status === 200) {
                resolve(result)
            } else if (result.status === 201) {
                resolve(result)
            }
        }).catch((err) => {
            console.log("The error is : ", err)
            reject(err)
        })
    })
}

const checkDoctorMailExist = (values) => {
    return new Promise((resolve, reject) => {
        try {
            axios.post(`${server}/checkemail`, { email: values.email }, { config }).then((result) => {
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

const sendDoctorOtp = () => {
    return new Promise((resolve, reject) => {
        let values = JSON.parse(localStorage.getItem("DoctorDetails"))

        axios.post(`${server}/sendOtp`, { username: values.username, email: values.email, password: values.password }, { config }).then((result) => {
            resolve(result)
        }).catch((err) => {
            reject(err)
        })
    })
}

const verifyDoctorOtp = (OTP, doctorId) => {
    console.log("IDDD : ", doctorId)
    return new Promise((resolve, reject) => {
        axios.post(`${server}/verifyotp`, { doctorId, inputOtp: OTP }, { config }).then((response) => {
            if (response.status === 200) {
                resolve(response)
            }
        }).catch((errResponse) => {
            reject("Invalid OTP")
        })
    })
}



export { doctorLogin, doctorSignUp, checkDoctorMailExist,sendDoctorOtp, verifyDoctorOtp }