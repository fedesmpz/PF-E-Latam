import Link from "next/link";
import { useDispatch } from "react-redux";
const Product = ({ id,title, thumbnail, original_price, currency_id, price, sale_price, }) => {
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(irAlosDetalles(id)); //no esta creada la funcion todavia
    };

    return (
        <div onClick={handleClick}>
        <Link href={`/produts/${currency_id}/${id}`}>
            <div>
                <img src={thumbnail} alt={title} />
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
        </Link>
        </div>
    );
}

export default Product;