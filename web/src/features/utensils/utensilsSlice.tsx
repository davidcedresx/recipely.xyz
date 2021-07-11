import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import API from "../../api/client"

/* Thunks */

export const asyncCreate = createAsyncThunk(
  "asyncUtensilCreate",
  async (utensil: Utensil) => {
    return (await API.post("/utensils/", utensil)) as Utensil
  }
)

export const asyncFetch = createAsyncThunk("asyncUtensilFetch", async () => {
  return (await API.get("/utensils/")) as Utensil[]
})

export const asyncUpdate = createAsyncThunk(
  "asyncUtensilUpdate",
  async (utensil: Utensil) => {
    return (await API.put("/utensils/" + utensil._id, utensil)) as Utensil
  }
)

export const asyncDelete = createAsyncThunk(
  "asyncUtensilDelete",
  async (utensil: Utensil) => {
    return (await API.delete("/utensils/" + utensil._id)) as Utensil
  }
)

/* Types */

export interface Utensil {
  _id: string
  name: string
  price: number
  amount: number
}

interface State {
  utensils: Utensil[]
}

/* State */

const initialState = {
  utensils: []
} as State

export const utensilsSlice = createSlice({
  name: "utensils",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // create
    builder.addCase(asyncCreate.fulfilled, (state, action) => {
      console.log("creation finished", action)
      state.utensils.push(action.payload)
    })

    // update
    builder.addCase(asyncUpdate.fulfilled, (state, action) => {
      console.log("update finished", action)
      const index = state.utensils.findIndex(
        (utensil) => utensil._id === action.payload._id
      )
      state.utensils[index] = action.payload
    })

    // fetching
    builder.addCase(asyncFetch.fulfilled, (state, action) => {
      console.log("fetch ended", state, action)
      state.utensils = action.payload
    })

    // deleting
    builder.addCase(asyncDelete.fulfilled, (state, action) => {
      const index = state.utensils.findIndex(
        (utensil) => utensil._id === action.payload._id
      )
      state.utensils.splice(index, 1)
    })
  }
})

// export const { } = utensilsSlice.actions

export default utensilsSlice.reducer
