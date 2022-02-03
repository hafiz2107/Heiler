import { createSlice } from '@reduxjs/toolkit'

export const userToAuthenticateSlice = createSlice({
    name: "userToAuthenticate",
    initialState: {},
    reducers: {
        change_UserToAuthenticate: (state, action) => {
            console.log("The action is : ", action)
            state.value = action.payload.email
        }
    }   
})

export const {change_UserToAuthenticate} = userToAuthenticateSlice.actions
export default userToAuthenticateSlice.reducer