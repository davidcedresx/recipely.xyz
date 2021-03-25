import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import API from "../../api/client"

/* Thunks */

export const asyncCreate = createAsyncThunk('asyncCreate', async (ingredient: Ingredient) => {
    return await API.post("/ingredients/", ingredient) as Ingredient[]
})

export const asyncFetch = createAsyncThunk('asyncFetch', async () => {
    return await API.get("/ingredients/") as Ingredient[]
})

export const asyncUpdate = createAsyncThunk('asyncUpdate', async (ingredient: Ingredient) => {
    return await API.put("/ingredients/" + ingredient._id, ingredient) as Ingredient[]
})

export const asyncDelete = createAsyncThunk('asyncDelete', async (ingredient: Ingredient) => {
    return await API.delete("/ingredients/" + ingredient._id) as Ingredient[]
})

/* Types */

enum Unit {
    KG,
    GR,
    LT,
    ML,
    UNIT
}

interface Ingredient {
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
        // creation
        builder.addCase(asyncCreate.pending, (state, action) => {
            console.log('creation started', action)
        })
        builder.addCase(asyncCreate.fulfilled, (state, action) => {
            console.log('creation finished', action)
        })
        builder.addCase(asyncCreate.rejected, (state, action) => {
            console.log('creation finished', action)
        })

        // fetching
        builder.addCase(asyncFetch.pending, (state, action) => {
            console.log('fetch started', action)
        })
        builder.addCase(asyncFetch.fulfilled, (state, action) => {
            console.log('fetch ended', action)
            state.ingredients = action.payload
        })
        builder.addCase(asyncFetch.rejected, (state, action) => {
            console.log('fetch failed', action)
        })

    }
})

// export const { } = ingredientsSlice.actions

export default ingredientsSlice.reducer
