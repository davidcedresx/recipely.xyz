import { createSlice } from '@reduxjs/toolkit'

interface State {
    ingredients: Array<unknown>
}

const initialState = {
    ingredients: []
} as State

export const ingredientsSlice = createSlice({
    name: 'ingredients',
    initialState,
    reducers: {
        setAll: (state, action) => {
            state.ingredients = action.payload
        },
        add: (state, action) => {
            state.ingredients.push(action.payload)
        }
    }
})

export const { setAll, add } = ingredientsSlice.actions

export default ingredientsSlice.reducer
