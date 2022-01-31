

const validation = (values) => {
    let errors = {}, valid = true;


    if (!values.email) {
        errors.email = "Email is required"
        valid = false
    } else if (!/^[a-zA-Z0-9.!#$%&'*+=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(values.email)) {
        errors.email = "Please Enter a valid email"
        valid = false
    }

    if (!values.phone) {
        errors.phone = "Phone Number is required"
        valid = false
    } else if (values.phone.length > 10 || values.phone.length < 10) {
        errors.phone = "Enter a valid Mobile number"
        valid = false
    }


    if (!values.password) {
        errors.password = "Password is required"
        valid = false
    } else if (values.password.length < 6) {
        errors.password = "Please enter atleast 6 characters"
        valid = false
    }
    return { errors, valid }
}

export default validation