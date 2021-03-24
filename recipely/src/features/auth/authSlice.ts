import { createSlice } from '@reduxjs/toolkit'

interface State {
    token: string
}

const initialState = {
    token: ''
} as State

export const authSlice = createSlice({
    name: 'ingredients',
    initialState,
    reducers: {
        login: (state, action) => {
            const { token } = action.payload
            state.token = token
            localStorage.setItem('token', token)
        },
        logout: (state) => {
            state.token = ''
            localStorage.removeItem('token')
        }
    }
})

export const { login, logout } = authSlice.actions

export default authSlice.reducer
