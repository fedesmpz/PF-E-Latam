import { useState } from "react";
import { useDispatch } from "react-redux";
import { axiosAllProducts } from "@/redux/slice/productSlice";
import style from "./styles/SearchBar/SearchBar.module.css";

const validate = (input) => {
    let errors = {};
    if (!input.length) errors = "Inserta un producto";
}

export default function SearchBar() {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [errors, setErrors] = useState({});

    const handleChange = (event) => {
        event.preventDefault();
        setName(event.target.value);
        setErrors(validate(event.target.value))
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(axiosAllProducts(name));
    };

    return(
        <div className={style.container}>
            <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet"/>
            
            <input type="text" placeholder="Busca un producto..." onChange={handleChange} value={name}/>
            <button className={style.btn} type="submit" onClick={event => {handleSubmit(event); setName('')}}>{<i class="fa fa-search"></i>}</button>
            {errors && <p className={style.error}>{errors}</p>}
        </div>
    )
};