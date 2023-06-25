import { configureStore } from "@reduxjs/toolkit";
import { productSlice } from "../slice/productSlice";
import  userSlice  from "../slice/userSlice";
import thunk from "redux-thunk";
import { ratingReviewSlice } from "../slice/ratingReviewSlice"

export default configureStore({
    reducer: {
        products: productSlice.reducer,
        reviews: ratingReviewSlice.reducer,
        user: userSlice.reducer,
    },
    middleware: [thunk]
})

