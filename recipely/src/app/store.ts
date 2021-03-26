import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import { useDispatch } from 'react-redux'
import authReducer from '../features/auth/authSlice'
import ingredientsReducer from '../features/ingredients/ingredientsSlice'
import utensilsReducer from '../features/utensils/utensilsSlice'

// import storage from 'redux-persist/lib/storage'
// import { persistReducer } from 'redux-persist'


// const persistConfig = {
//     key: 'root',
//     storage
// };

const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    auth: authReducer,
    utensils: utensilsReducer
})

// const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: rootReducer
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>() // Export a hook that can be reused to resolve types

export default store