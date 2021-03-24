import { configureStore } from '@reduxjs/toolkit'
import ingredientsReducer from './ingredientSlice'

export default configureStore({
    reducer: {
        ingredients: ingredientsReducer
    }
})