const axios = require('axios');
const { Product } = require("../../db")
const {
    URL_BASE_AR_COMPUTERS,
    URL_BASE_AR_CEL,
    URL_BASE_AR_VIDEO,
    URL_BASE_AR_ELEC,
    URL_BASE_MX_COMPUTERS,
    URL_BASE_MX_CEL,
    URL_BASE_MX_VIDEO,
    URL_BASE_MX_ELEC,
    URL_BASE_COL_CEL,
    URL_BASE_COL_VIDEO,
    URL_BASE_COL_ELEC
} = require("./endpoints");

const getProducts = async () => {
    try {
        const { data } = await axios.get(URL_BASE_COL_ELEC);
        const products = data.results?.map((product) => {
            const productAttributes = product?.attributes?.map((att) => {
                return {
                    name: att.name,
                    value: att.value_name
                }
            })
            const attributesToString = JSON.stringify(productAttributes)
            return {
                id: product?.id,
                title: product?.title,
                thumbnail: product?.thumbnail,
                original_price: product?.original_price ? product?.original_price : 0,
                categories: "Electrónica",
                country: "Colombia",
                currency_id: product?.currency_id,
                price: product?.price,
                sale_price: false,
                available_quantity: product?.available_quantity,
                sold_quantity: product?.sold_quantity,
                official_store_name: product?.official_store_name,
                shipping: product?.shipping?.free_shipping,
                attributes: attributesToString,
                catalog_listing: product?.catalog_listing,
                discounts: product?.discounts,
                promotions: product?.promotions,
            }
        })
        // ESTO NO SE VUELVE A CORRER. YA ESTA POBLADA LA DB
        // const savedProducts = await Product.bulkCreate(products)
        // return savedProducts
    } catch (error) {
        console.error(`Error en la solicitud GET: ${error.message} ${error}`)
        throw error;
    }
}

module.exports = getProducts;
