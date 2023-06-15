import { configureStore } from "@reduxjs/toolkit";
import { slice } from "../slice/slice";
import { productSlice } from "../slice/productSlice";

export default configureStore({
    reducer: {
        names: slice.reducer,
        products: productSlice.reducer
    }
})
