import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import API from "../../api/client"

/* Thunks */

export const asyncCreate = createAsyncThunk('asyncIngredientCreate', async (ingredient: Ingredient) => {
    return await API.post("/ingredients/", ingredient) as Ingredient
})

export const asyncFetch = createAsyncThunk('asyncIngredientFetch', async () => {
    return await API.get("/ingredients/") as Ingredient[]
})

export const asyncUpdate = createAsyncThunk('asyncIngredientUpdate', async (ingredient: Ingredient) => {
    return await API.put("/ingredients/" + ingredient._id, ingredient) as Ingredient
})

export const asyncDelete = createAsyncThunk('asyncIngredientDelete', async (ingredient: Ingredient) => {
    return await API.delete("/ingredients/" + ingredient._id) as Ingredient
})

/* Types */

enum Unit {
    KG,
    GR,
    LT,
    ML,
    UNIT
}

export interface Ingredient {
    _id: string
    name: string
    price: number
    amount: number
    unit: Unit
}

interface State {
    ingredients: Ingredient[]
}

/* State */

const initialState = {
    ingredients: []
} as State

export const ingredientsSlice = createSlice({
    name: 'ingredients',
    initialState,
    reducers: {},
    extraReducers: builder => {
        // create
        builder.addCase(asyncCreate.fulfilled, (state, action) => {
            console.log('creation finished', action)
            state.ingredients.push(action.payload)
        })

        // update
        builder.addCase(asyncUpdate.fulfilled, (state, action) => {
            console.log('update finished', action)
            const index = state.ingredients.findIndex(ingredient => ingredient._id === action.payload._id)
            state.ingredients[index] = action.payload
        })

        // fetching
        builder.addCase(asyncFetch.fulfilled, (state, action) => {
            console.log('fetch ended', state, action)
            state.ingredients = action.payload
        })

        // deleting
        builder.addCase(asyncDelete.fulfilled, (state, action) => {
            const index = state.ingredients.findIndex(ingredient => ingredient._id === action.payload._id)
            state.ingredients.splice(index, 1)
        })

    }
})

// export const { } = ingredientsSlice.actions

export default ingredientsSlice.reducer
