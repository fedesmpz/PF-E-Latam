"use client"
import { axiosAllProductByCountryCategoryId } from "@/redux/slice/productSlice";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"
import { useRouter } from "next/router";
import Providers from "@/redux/provider/Provider"
const DetailProduct =()=>{

const dispatch = useDispatch()
const router= useRouter()
const {id}= router.query
const {categories}= router.query
const {countryId}=router.query



const productDetail = useSelector((state)=>state.products.detail)

 useEffect(() => {
      dispatch(axiosAllProductByCountryCategoryId(id, countryId, categories));
    // return () => dispatch(cleanDetail())  CREAR PARA LIMPIAR DETALLES
  }, [dispatch, id, countryId, categories]);
  console.log(productDetail)


    return(
        <div>
           {
            productDetail?.title ?(
                <>
                <img src={productDetail.thumbnail} alt={productDetail.title} />
                <h1>{productDetail.title}</h1>
                <h1>{productDetail.attributes}</h1>
                <h2>{productDetail.original_price}{productDetail.currency_id}</h2>
                <h2>{productDetail.price}{productDetail.currency_id}</h2>
                <h2>{productDetail.available_quantity}</h2>
                <h2>{productDetail.sold_quantity}</h2>
                <h2>{productDetail.official_store_name}</h2>
                <h2>{productDetail.shipping}</h2>
                <h2>{productDetail.country}</h2>
                </>
            ) : (
                <h2>Loading... </h2> // MODIFICAR ESTO OBVIAMENTE
            )
           }
        </div>
    )
}


const DetailProductWithProvider = () => {
    return (
        <Providers>
            <DetailProduct />
        </Providers>
    );
};


export default DetailProductWithProvider;