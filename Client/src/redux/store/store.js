import { configureStore } from "@reduxjs/toolkit";
import { cartSlice } from "../slice/cartSlice";
import { productSlice } from "../slice/productSlice";
import thunk from "redux-thunk";
import { ratingReviewSlice } from "../slice/ratingReviewSlice"

export default configureStore({
    reducer: {
        carts: cartSlice.reducer,
        products: productSlice.reducer,
        reviews: ratingReviewSlice.reducer
    },
    middleware: [thunk]
})

