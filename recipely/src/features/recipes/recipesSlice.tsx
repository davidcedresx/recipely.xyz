import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import API from "../../api/client"

/* Thunks */

export const asyncCreate = createAsyncThunk(
  "asyncRecipeCreate",
  async (utensil: Recipe) => {
    return (await API.post("/recipes/", utensil)) as Recipe
  }
)

export const asyncFetch = createAsyncThunk("asyncRecipeFetch", async () => {
  return (await API.get("/recipes/")) as Recipe[]
})

export const asyncUpdate = createAsyncThunk(
  "asyncRecipeUpdate",
  async (utensil: Recipe) => {
    return (await API.put("/recipes/" + utensil._id, utensil)) as Recipe
  }
)

export const asyncDelete = createAsyncThunk(
  "asyncRecipeDelete",
  async (utensil: Recipe) => {
    return (await API.delete("/recipes/" + utensil._id)) as Recipe
  }
)

/* Types */

export interface Recipe {
  _id: string
  name: string
  pieces: number
}

interface State {
  recipes: Recipe[]
}

/* State */

const initialState = {
  recipes: []
} as State

export const recipesSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // create
    builder.addCase(asyncCreate.fulfilled, (state, action) => {
      console.log("creation finished", action)
      state.recipes.push(action.payload)
    })

    // update
    builder.addCase(asyncUpdate.fulfilled, (state, action) => {
      console.log("update finished", action)
      const index = state.recipes.findIndex(
        (utensil) => utensil._id === action.payload._id
      )
      state.recipes[index] = action.payload
    })

    // fetching
    builder.addCase(asyncFetch.fulfilled, (state, action) => {
      console.log("fetch ended", state, action)
      state.recipes = action.payload
    })

    // deleting
    builder.addCase(asyncDelete.fulfilled, (state, action) => {
      const index = state.recipes.findIndex(
        (utensil) => utensil._id === action.payload._id
      )
      state.recipes.splice(index, 1)
    })
  }
})

// export const { } = recipesSlice.actions

export default recipesSlice.reducer
