'use client'
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { axiosAllProducts } from "../../redux/slice/productSlice"
import Link from "next/link";
import style from "./Styles/Home/Home.module.css"

const Home = () => {
    // const dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch(axiosAllProducts())
    // })

    return (
        <div className={style.body}>
            <h1>Esto es el Home</h1>
            <Link href="/" >Landing</Link>
            <Link href="/CreateProduct" >CreateProduct</Link>
        </div>
    )
}

export default Home;