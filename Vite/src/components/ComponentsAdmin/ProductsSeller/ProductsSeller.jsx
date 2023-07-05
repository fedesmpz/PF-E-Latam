import Styles from "./ProductsSeller.module.css";
import Style from "./ProductsSeller.module.css";
import { BiArchive } from "react-icons/bi";
import { TbShoppingCartPlus, TbTruckDelivery } from "react-icons/tb";

const ProductsSeller = ({
  id,
  title,
  thumbnail,
  original_price,
  currency_id,
  price,
  sale_price,
  categories,
  catalog_listing,
  available_quantity,
  sold_quantity,
}) => {
  let countryId;
  if (currency_id === "ARS") {
    countryId = "ARG";
  } else if (currency_id === "COP") {
    countryId = "COL";
  } else if (currency_id === "MXN") {
    countryId = "MEX";
  }

  const maxLength = 60;

  const shortenTitle = (title) => {
    if (title.length > maxLength) {
      return title.substring(0, maxLength) + "...";
    }
    return title;
  };
  return (
    <li key={id} className={Style.order}>
      <div className={Style.faShop}>
        <img
          src={thumbnail}
          alt="Producto"
          style={{
            width: "auto",
            height: "3rem",
          }}
        />
      </div>
      <div className={Style.textContainer}>
        <p className={Style.textTitle}>{shortenTitle(title)}</p>
        <p className={Style.textCategory}>{categories}</p>
        <p className={Style.textPrice}>$ {price}</p>
      </div>
      <p className={Styles.date}>
        <p className={Styles.vemos}>
          {available_quantity}
          <br></br>
          <span className={Styles.vemos}>
            <TbShoppingCartPlus className={Styles.iconos} />
            <br></br>Disponibles
          </span>
        </p>

        <p className={Styles.vemos}>
          {sold_quantity}
          <br></br>
          <span className={Styles.vemos}>
            <TbTruckDelivery className={Styles.iconos} />
            <br></br>Vendidos
          </span>
        </p>

        <a
          className={Styles.ahi}
          href={`/DetailProduct?countryId=${countryId}&categories=${categories}&id=${id}`}
        >
          <p className={Styles.vemos}>
            <br></br>
            <BiArchive className={Styles.iconos} />
            <span className={Styles.vemos}>
              <br></br>Detalles
            </span>
          </p>
        </a>
      </p>
    </li>
  );
};

export default ProductsSeller;
