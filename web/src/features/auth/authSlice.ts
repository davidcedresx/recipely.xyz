import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import API from "../../api/client"

/* Thunks */

interface AsyncLogin {
    username: string,
    password: string,
    action: string
}

export const asyncLogin = createAsyncThunk('asyncLogin', async ({ username, password, action }: AsyncLogin, thunkAPI) => {
    const response = await API.post("/auth/" + action, { username, password }) as State
    return response
})

/* Types */

interface State {
    token: string
}

/* State */

const initialState = {
    token: localStorage.getItem('token') ?? ''
} as State


export const authSlice = createSlice({
    name: 'ingredients',
    initialState,
    reducers: {
        logout: (state) => {
            state.token = ''
            localStorage.removeItem('token')
        }
    },
    extraReducers: builder => {
        builder.addCase(asyncLogin.fulfilled, (state, action) => {
            const { token } = action.payload as State
            state.token = token
            localStorage.setItem('token', token)
        })

        builder.addCase(asyncLogin.rejected, (state, action) => {
            // nothing to do, handled on component
        })
    }
})

export const { logout } = authSlice.actions

export default authSlice.reducer


