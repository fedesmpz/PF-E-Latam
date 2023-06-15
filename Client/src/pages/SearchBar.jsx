import { useState } from "react";
import { useDispatch } from "react-redux";
import { axiosAllProducts } from "@/redux/slice/productSlice";
import style from "./styles/SearchBar/SearchBar.module.css";

export default function SearchBar() {
    const dispatch = useDispatch();
    const [name, setName] = useState('');

    const handleInputChange = (event) => {
        event.preventDefault();
        setName(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!name.length) return alert('Insert a product');
        dispatch(axiosAllProducts(name));
    };

    return(
        <div className={style.container}>
            <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet"/>
            
            <input type="text" placeholder="Search a product..." onChange={handleInputChange} value={name}/>
            <button className={style.btn} type="submit" onClick={event => {handleSubmit(event); setName('')}}>{<i class="fa fa-search"></i>}</button>
        </div>
    )
};