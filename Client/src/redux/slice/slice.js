import { createSlice } from "@reduxjs/toolkit";

const initialState= {
    name: "y Gabo?"
}

export const slice = createSlice({
    name: "values",
    initialState,
    reducers: {
        changeName:(state, action) => {
            state.name = action.payload;
        }
    }
})

export const { changeName } = slice.actions;

export default slice.reducer;