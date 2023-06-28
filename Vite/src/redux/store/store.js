import { configureStore } from "@reduxjs/toolkit";
import { productSlice } from "../slice/productSlice";
import { userSlice }  from "../slice/userSlice";
import { cartSlice } from "../slice/cartSlice";
import thunk from "redux-thunk";
import { ratingReviewSlice } from "../slice/ratingReviewSlice"

export default configureStore({
    reducer: {
        products: productSlice.reducer,
        reviews: ratingReviewSlice.reducer,
        user: userSlice.reducer,
        cart: cartSlice.reducer
    },
    middleware: [thunk]
})

