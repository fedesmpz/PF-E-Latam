import Styles from "./StylesUsers/User.module.css"
import { GrUserAdmin } from "react-icons/gr"
import UserDetailsModal from "./UserDetailsModal";
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
  } else if (admin === true) {
    isAdmin = "Si";
  } else if (admin === null) {
    isAdmin = "No Definido";
  }

  const maxLength = 30;

  const shortenname = (name) => {
    if (name.length > maxLength) {
      return name.substring(0, maxLength) + "...";
    }
    return name;
  };
  return (
    <div>

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
        <p className="text-gray-800 font-bold">{shortenname(name)} {shortenname(surname)}</p>
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

<UserDetailsModal
  key={id}
            id={id}
            name={name}
            profile_picture={profile_picture}
            surname={surname}
            email={email}
            country={country}
            city={city}
            address={address}
            admin={admin}
            postal_code={postal_code}
            createdAt={createdAt}
/>
        {/* <a
          className={Styles["a"]}
          href={``}
        >
          <p className={Styles["text"]}>
            <br></br>
            <BiArchive className={Styles["icon"]} />
            <span className={Styles["text"]}>
              <br></br>Detalles
            </span>
          </p>
        </a> */}
      </p>
    </li>
    </div>
  );
};

export default User;