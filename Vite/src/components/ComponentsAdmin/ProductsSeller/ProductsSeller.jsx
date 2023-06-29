import Styles from "./StylesProducts/AllProductsAdmin.module.css";
import Style from "./StylesProducts/AllProductsAdmin.module.css";
import { BiArchive } from "react-icons/bi";
import { TbShoppingCartPlus, TbTruckDelivery } from "react-icons/tb";

const ProductsSeller = ({
  id,
  title,
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
      </div>
      <div className={Style.textContainer}>
        <p className="text-gray-800 font-bold">{shortenTitle(title)}</p>
        <p className="text-gray-400 text-sm">{categories}</p>
        <p className="text-gray-400 text-sm">$ {price}</p>
      </div>
      <p className={Styles.date}>
        <p className={Styles["text"]}>
          {available_quantity}
          <br></br>
          <span className={Styles["text"]}>
            <TbShoppingCartPlus className={Styles["icon"]} />
            <br></br>Disponibles
          </span>
        </p>

        <p className={Styles["text"]}>
          {sold_quantity}
          <br></br>
          <span className={Styles["text"]}>
            <TbTruckDelivery className={Styles["icon"]} />
            <br></br>Vendidos
          </span>
        </p>

        <a
          className={Styles["a"]}
          href={`/DetailProduct?countryId=${countryId}&categories=${categories}&id=${id}`}
        >
          <p className={Styles["text"]}>
            <br></br>
            <BiArchive className={Styles["icon"]} />
            <span className={Styles["text"]}>
              <br></br>Detalles
            </span>
          </p>
        </a>
      </p>
    </li>
  );
};

export default ProductsSeller;
