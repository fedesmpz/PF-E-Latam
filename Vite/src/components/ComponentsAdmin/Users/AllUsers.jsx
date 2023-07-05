import User from "./User";
import Styles from "../Products/StylesProducts/AllProductsAdmin.module.css";

const AllUsers = ({ currentUsers }) => {
   return (
    <ul>
        {currentUsers.map(
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
            superAdmin
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
            superAdmin={superAdmin}
            />
        )
        )}
    </ul>
);
};

export default AllUsers;
