import Styles from "../Products/StylesProducts/AllProductsAdmin.module.css";
import { BiArchive } from "react-icons/bi";
import { GrUserAdmin } from "react-icons/gr"
const User = ({
  id,
  name,
  profile_picture,
  surname,
  email,
  country,
  city,
  address,
  admin,
  postal_code,
  createdAt,
}) => {
    let isAdmin;
  if (admin === false) {
    isAdmin = "No";
  } else if (admin === "true") {
    isAdmin = "Si";
  } else if (admin === null) {
    isAdmin = "No Definido";
  }

  const maxLength = 60;

  const shortenname = (name) => {
    if (name.length > maxLength) {
      return name.substring(0, maxLength) + "...";
    }
    return name;
  };
  return (
    <li key={id} className={Styles.order}>
      <div className={Styles.faShop}>
        <img
          src={profile_picture}
          alt="Producto"
          style={{
            width: "auto",
            height: "3rem",
          }}
        />
      </div>
      <div className={Styles.textContainer}>
        <p className="text-gray-800 font-bold">{shortenname(name)}</p>
        <p className="text-gray-400 text-sm">Pais: {country}</p>
        <p className="text-gray-400 text-sm">Email: {email}</p>
      </div>
      <p className={Styles.date}>
        <p className={Styles["text"]}>
          {}
          <br></br>
          <span className={Styles["text"]}>
            <GrUserAdmin className={Styles["icon"]} />
            <br></br>Admin {isAdmin}
          </span>
        </p>

        <a
          className={Styles["a"]}
          href={`/DashboardAdmin/UserDetails/${id}`}
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

export default User;
