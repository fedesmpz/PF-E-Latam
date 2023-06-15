import Link from "next/link";
import { useDispatch } from "react-redux";
import Providers from "@/redux/provider/Provider"

const Product = ({ id,title, thumbnail, original_price, currency_id, price, sale_price }) => {
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(irAlosDetalles(id)); //no esta creada la funcion todavia
    };

    return (
        <div onClick={handleClick}>
         <Link href={`/produts/${id}`}>    
            <img src={thumbnail} alt={title} /></Link>
            <h2>{title}</h2>
            {sale_price ? (
                <>
                    <p>Precio original: <s>{original_price}{currency_id}</s></p>
                    <p>Oferta: {price}{currency_id}</p>
                </>
            ) : (
                <p>Precio: {original_price}{currency_id}</p>
            )}
       
        </div>
    );
}

const CreateProductWithProvider = () => {
    return (
        <Providers>
            <Product />
        </Providers>
    );
};


export default CreateProductWithProvider;