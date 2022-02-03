import { configureStore } from '@reduxjs/toolkit'
import userToAuthenticateReducer from './LoggedInUser/userToAuthenticate'

export default configureStore({
    reducer: {
        userToAuthenticate: userToAuthenticateReducer,
    }
})