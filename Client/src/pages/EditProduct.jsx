'use client'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editProduct } from "../redux/slice/productSlice"
import { useRouter } from "next/router";
import Providers from "@/redux/provider/Provider";

const EditProduct = () => {
    const router = useRouter();
    const { id } = router.query;
    console.log(id)
    const productDetail = useSelector((state) => state.products.detail);

    return (
        <div>
            <h1>Editar producto</h1>
            <p>Aca viene el form pre-cargado con la data del producto</p>
        </div>
    )
}

const EditProductWithProvider = () => {
    return (
      <Providers>
        <EditProduct />
      </Providers>
    );
  };
  
  export default EditProductWithProvider;
  
