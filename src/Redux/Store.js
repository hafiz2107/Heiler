import { configureStore } from '@reduxjs/toolkit'
import googleAuthErrorReducer from './GoogleAuthError/GoogleAuthErrorSlice'

export default configureStore({
    reducer: {
        googleAuthError: googleAuthErrorReducer,
    }
})