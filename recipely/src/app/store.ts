import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import authReducer from '../features/auth/authSlice'
import ingredientsReducer from '../features/ingredients/ingredientsSlice'

const store = configureStore({
    reducer: {
        ingredients: ingredientsReducer,
        auth: authReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>() // Export a hook that can be reused to resolve types

export default store