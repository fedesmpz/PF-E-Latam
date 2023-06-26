import { Link } from "react-router-dom";
const NavItem = ({ text, href, active }) => {
    return (
        <Link href={href} >
        <span className={`nav__item ${active ? "active" : ""}`}>
            {text}
        </span></Link>
    );
};

export default NavItem;