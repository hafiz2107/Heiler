import { createSlice } from '@reduxjs/toolkit'

export const googleAuthErrorSlice = createSlice({
    name: "googleAuthError",
    initialState: { error: "" },
    reducers: {
        change_GoogleAuthError: (state, action) => {
            state.error = action.payload.googleAuthError
        }
    }
})

export const { change_GoogleAuthError } = googleAuthErrorSlice.actions

export default googleAuthErrorSlice.reducer