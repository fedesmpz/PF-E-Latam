import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { allReviewById, findProduct } from "../../redux/slice/productSlice";
import Styles from './ReviewUsuario.module.css'


const ReviewUsuario = () => {
    const { userId } = useSelector((state) => state.user.userData)
    const review = useSelector((state) => state.products.allReviewById)
    const productos = useSelector((state) => state.products.productById);
    const dispatch = useDispatch()
    const [reviewWithProduct, setReviewWithProduct] = useState([]);
    const [searchedProductIds, setSearchedProductIds] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
  
    useEffect(() => {
        if (userId) {
            dispatch(allReviewById(userId))
        }
    }, [dispatch, userId])

    useEffect(() => {
        const productsIds = review.flatMap((rev) => rev.productId)
        productsIds.forEach((product) => {
            if (!searchedProductIds.includes(product)) {
                dispatch(findProduct(product))
                setSearchedProductIds(prevIds => [...prevIds, product])
            }
        })
    }, [dispatch, review, searchedProductIds])

    useEffect(() => {
        if (productos) {
            if (!allProducts.some(prod => prod.id === productos.id)) {
                setAllProducts(prevProducts => [...prevProducts, productos]);
            }
        }
    }, [productos])

    useEffect(() => {
        if (allProducts.length > 0) {
            const reviewWithProductTemp = review.map(rev => {
                const product = allProducts.find(prod => prod.id === rev.productId);
                return product ? { ...rev, product } : rev;
            });
            setReviewWithProduct(reviewWithProductTemp);
        }
    }, [allProducts, review])
   
    return (
        <div className={Styles.container}>
            <h1 className={Styles.titleSales}>Tus reviews</h1>
            <div>
                {reviewWithProduct?.map((item, index) => {
                    const date = new Date(item.createdAt);
                    const localDate = date.toLocaleString();
                    return (
                        <div className={Styles.productContainer} key={index}>
                            <p>Nombre del producto: {item.product?.title}</p>
                            <img className={Styles.image} src={item.product?.thumbnail} alt={item.product?.title} />
                            <div className={Styles.dataContainer}>

                            <p>Tu puntaje: {item.rating}</p>
                            <p>Tu comentario: {item.review_description}</p>
                            <p>Fecha: {localDate}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    )

}

export default ReviewUsuario

