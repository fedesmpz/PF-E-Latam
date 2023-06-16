import { configureStore } from "@reduxjs/toolkit";
import { slice } from "../slice/slice";
import { productSlice } from "../slice/productSlice";
import thunk from "redux-thunk";

export default configureStore({
    reducer: {
        names: slice.reducer,
        products: productSlice.reducer
    },
    middleware: [thunk]
})

