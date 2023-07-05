import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { allReviewById, findProduct } from "../../redux/slice/productSlice";
import Styles from './ReviewUsuario.module.css'
import 'starability/starability-css/starability-slot.css';

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
            <h1 className={Styles.title}>Mis reseñas</h1>
            <div>
                {reviewWithProduct?.map((item, index) => {
                    const date = new Date(item.createdAt);
                    const localDate = date.toLocaleString();
                    return (
                        <div className={Styles.reviewContainer} key={index}>
                            <p className={Styles.localDate}>{localDate}</p>
                            <div className={Styles.leftContainer}>
                                <div className={Styles.imgContainer}>
                                <img src={item.product?.thumbnail} alt={item.product?.title} />
                                </div>
                                <div className={Styles.dataContainer}>
                                <p className={Styles.productTitle}>{item.product?.title}</p>
                                {item.rating === 5 &&
                                    <div className={Styles.stars}>
                                        <fieldset className="starability-slot">
                                        <label title="Terrible">1 star</label>
                                        <label title="Not good">2 stars</label>
                                        <label title="Average">3 stars</label>
                                        <label title="Very good">4 stars</label>
                                        <label title="Amazing">5 stars</label>
                                        </fieldset>
                                    </div>
                                }
                                {item.rating === 4 &&
                                    <div className={Styles.stars}>
                                        <fieldset className="starability-slot">
                                        <label title="Terrible">1 star</label>
                                        <label title="Not good">2 stars</label>
                                        <label title="Average">3 stars</label>
                                        <label title="Very good">4 stars</label>
                                        </fieldset>
                                    </div>
                                }
                                {item.rating === 3 &&
                                    <div className={Styles.stars}>
                                        <fieldset className="starability-slot">
                                        <label title="Terrible">1 star</label>
                                        <label title="Not good">2 stars</label>
                                        <label title="Average">3 stars</label>
                                        </fieldset>
                                    </div>
                                }
                                {item.rating === 2 &&
                                    <div className={Styles.stars}>
                                        <fieldset className="starability-slot">
                                        <label title="Terrible">1 star</label>
                                        <label title="Not good">2 stars</label>
                                        </fieldset>
                                    </div>
                                }
                                {item.rating === 1 &&
                                    <div className={Styles.stars}>
                                        <fieldset className="starability-slot">
                                        <label title="Terrible">1 star</label>
                                        </fieldset>
                                    </div>
                                }
                                <p className={Styles.review}>"{item.review_description}"</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    )

}

export default ReviewUsuario

