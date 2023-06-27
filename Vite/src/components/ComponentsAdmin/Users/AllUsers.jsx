import User from "./User";
import Styles from "../Products/StylesProducts/AllProductsAdmin.module.css";

const AllUsers = ({ currentProducts }) => {
   return (
    <div className={Styles.container}>
    <ul>
        {currentProducts.map(
        ({
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
        }) => (
            <User
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
        )
        )}
    </ul>
    </div>
);
};

export default AllUsers;
