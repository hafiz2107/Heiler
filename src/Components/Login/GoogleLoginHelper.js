import { change_GoogleAuthError } from "../../Redux/GoogleAuthError/GoogleAuthErrorSlice"
import { useDispatch } from 'react-redux'
import { handleGoogleLogin } from '../../Services/user.service';


const GoogleLoginHelper = () => {


    const dispatch = useDispatch()

    const handleLogin = (googleData) => {

        handleGoogleLogin(googleData).then((response) => {
            console.log("Teh google signup response : ", response)
        }).catch((err) => {
            const changeGoogleAuthError = () => {
                dispatch(change_GoogleAuthError({
                    googleAuthError: "We are Facing some technical issues"
                }))
            }
            changeGoogleAuthError()
        })

    }


    // If  the login fails
    const handleLoginFailure = (result) => {
        dispatch(change_GoogleAuthError({
            googleAuthError: "Oh Ooh"
        }))
    }

    return { handleLogin, handleLoginFailure }
}

export default GoogleLoginHelper