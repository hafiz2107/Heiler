import { checkDoctorMailExist } from "../../Services/doctor.service";
import { checkEmailAlreadyExist } from "../../Services/user.service";


const validation = async (values, person) => {
    let errors = {};
    let valid = true;


    switch (person) {
        case 'user': {
            await checkEmailAlreadyExist(values).then((result) => {
                errors.emailAlreadyExits = "Email Already exists"
                valid = false
            }).catch((noError) => {
                valid = true
            })
            break;
        }
        case 'doctor': {
            await checkDoctorMailExist(values).then((result) => {
                errors.emailAlreadyExits = "Email Already exists"
                valid = false
            }).catch((noError) => {
                valid = true
            })
            break;
        }
        default: return;
    }


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