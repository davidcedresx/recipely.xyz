import { configureStore } from '@reduxjs/toolkit'
import ingredientsReducer from '../features/ingredients/ingredientsSlice'
import authReducer from '../features/auth/authSlice'

export default configureStore({
    reducer: {
        ingredients: ingredientsReducer,
        auth: authReducer,
    }
})