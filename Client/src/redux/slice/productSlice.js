import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios'

export const productSlice = createSlice({
    // se genera error a no colocarle nombre al slice le colocare products ya que es la funcion de este archivo traernos los productos
        name: 'products',
        initialState: {
            products: [],
            category: [],
            detail:{},
            allProducts:[]
        },
    reducers: {
        setProductByCountryCategory:(state, action) => {
            state.category = action.payload;
        },

        setAllProductsByCountries:(state, action) => {
            state.products = action.payload;
        },

        //Creacion para todos los productos
        setAllProducts:(state, action) => {
            state.allProducts = action.payload;
        },
        
        setAllProductsByCountriesCategoryId:(state, action) => {
            state.detail = action.payload;
         
        },
        setSearchProduct:(state,action) => {
            state.products = action.payload;
        },
        setNewProduct:(state, action) => {
            state.products = [...state.products, action.payload]
        }
    }
})


export const { setProductByCountryCategory, setAllProductsByCountries,setAllProductsByCountriesCategoryId, setSearchProduct, setAllProducts, setNewProduct } = productSlice.actions;

export default productSlice.reducer;

export const axiosAllProductByCountryCategory = () => (dispatch) => {
    axios
        .get("http://localhost:8000/products/:countryId/:category")
        .then((response) => {
            dispatch(setProductByCountryCategory(response.data.data))
        })
        .catch((error) => console.log(error));
};

export const axiosAllProductsByCountries = () => (dispatch) => {
    axios
        .get(`http://localhost:8000/products/${id}`)
        .then((response) => {
            dispatch(setAllProductsByCountries(response.data))
            console.log(axiosAllProductByCountryCategory());
        })
        .catch((error) => console.log(error));
};


// esta funcion me trae todos los productos para dejarlos cargados en el home y proceder a filtrarlos según el pais

//importante para que funcione debes ir al server/controllers/get/archivo getByCountry y cambiar ARL por ARG COP por COL y MXN por MEX ya que hay un error leve en esas rutas.
export const axiosAllProducts = () => (dispatch) => {
    const urls = [
        'http://localhost:8000/products/ARG',
        'http://localhost:8000/products/COL',
        'http://localhost:8000/products/MEX'
    ];
    const requests = urls.map(url => axios.get(url));
    Promise.all(requests)
        .then((responses) => {
            const allProducts = responses.map(response => response.data);
            dispatch(setAllProducts(allProducts));
            //se realiza el console.log para verificar la información traida en el home hay otro console.log para validar actualmente es el que se esta monstrando en consola
            //console.log(products);
        })
        .catch((error) => console.log(error));
};



export const axiosAllProductByCountryCategoryId = (id, countryId, category) => (dispatch) => {
    axios
        .get(`http://localhost:8000/products/${countryId}/${category}/${id}`)
        .then((response) => {
            dispatch(setAllProductsByCountriesCategoryId(response.data))
            console.log(response.data)
    
        })
        .catch((error) => console.log(error));
};

export const axiosSearchProduct = () => (dispatch) => {
    axios
        .get("http://localhost:8000/products/search")
        .then((response) => {
            dispatch(setSearchProduct(response.data.data))
        })
        .catch((error) => console.log(error));
};

export const postProduct = (payload) => (dispatch) => {
    axios
      .post("http://localhost:8000/products/new", payload)
      .then((response) => {
            dispatch(setNewProduct(response.data.data));
      })
      .catch((error) => console.log(error));
  };