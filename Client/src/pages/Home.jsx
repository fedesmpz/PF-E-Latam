'use client'
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { axiosAllProducts } from "../redux/slice/productSlice"
import CreateProduct from "./CreateProduct/CreateProduct";
import style from "./styles/Home/Home.module.css"

const Home = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(axiosAllProducts())
    })

    return (
        <div className={style.body}>
            <h1>Esto es el Home</h1>
            <CreateProduct></CreateProduct>
        </div>
    )
}

export default Home;