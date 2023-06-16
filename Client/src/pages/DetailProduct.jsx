"use client"
import { axiosAllProductByCountryCategoryId } from "@/redux/slice/productSlice";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"
import { useRouter } from "next/router";
import Providers from "@/redux/provider/Provider"
import { all } from "axios";
const DetailProduct = () => {

    const dispatch = useDispatch()
    const router = useRouter()
    const { id } = router.query
    const { categories } = router.query
    const { countryId } = router.query



    const productDetail = useSelector((state) => state.products.detail)

    useEffect(() => {
        dispatch(axiosAllProductByCountryCategoryId(id, countryId, categories));
        // return () => dispatch(cleanDetail())  CREAR PARA LIMPIAR DETALLES
    }, [dispatch, id, countryId, categories]);

    console.log(productDetail.attributes);
    const attributes = productDetail.attributes ? JSON.parse(productDetail.attributes) : [];

    const renderedAttributes = attributes.map(attribute => {
        const attributeName = attribute.name;
        const attributeValue = attribute.value;
        return `${attributeName}: ${attributeValue}`;
    });


    console.log(renderedAttributes)

    return (
        <div>
            {
                productDetail?.title ? (
                    <>
                        <img src={productDetail.thumbnail} alt={productDetail.title} />
                        <h1>{productDetail.title}</h1>
                        <br />
                        {renderedAttributes.map((attribute, index) => (
                            <h2 key={index}>{attribute}</h2>
                        ))}
                        <br />
                        <h2>Precio Orginal: {productDetail.original_price} {productDetail.currency_id}</h2>
                        <h2>Precio en Sale: {productDetail.price}{productDetail.currency_id}</h2>
                        <h2>Cantidad disponible: {productDetail.available_quantity} unidades</h2>
                        <h2>Ya vendidas: {productDetail.sold_quantity} unidades</h2>
                        <h2>Store Oficial: {productDetail.official_store_name}</h2>
                        <h2>{productDetail.shipping}</h2>
                        <h2>Pais: {productDetail.country}</h2>
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