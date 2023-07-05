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
  superAdmin
}) => {
    let isAdmin;
  if (admin === false) {
    isAdmin = "No";
  } else if (admin === true) {
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
    <div className={Styles.allUsers}>
    <li key={id} className={Styles.order}>
      <div className={Styles.details}>
      <div className={Styles.faShop}>
              <img
                src={profile_picture}
                alt="img"
              />
            </div>
            <div className={Styles.textContainer}>
              <p className={Styles.name}>{shortenname(name)}</p>
              <p className={Styles.email}>{email}</p>
              <p className={Styles.country}>{country}</p>
            </div>
      </div>
      <div className={Styles.data}>
        {
          admin &&  
          <span className={Styles.adminIcon}>
          <GrUserAdmin className={Styles["icon"]} />
          Admin
        </span>
        }
        <UserDetailsModal
          key={id}
                    id={id}
                    userId={id}
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
                    superAdmin={superAdmin}
        />
      </div>
    </li>
</div>
  );
};

export default User;