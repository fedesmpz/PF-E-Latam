import { configureStore } from "@reduxjs/toolkit";
import { slice } from "../slice/slice";
import { productSlice } from "../slice/productSlice";
import thunk from "redux-thunk";
import {ratingReviewSlice} from "../slice/ratingReviewSlice"

export default configureStore({
    reducer: {
        names: slice.reducer,
        products: productSlice.reducer,
        reviews: ratingReviewSlice.reducer
    },
    middleware: [thunk]
})

