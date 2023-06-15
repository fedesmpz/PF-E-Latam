import Link from "next/link"
import NavbarPage from "./NavbarPage"
import style from "./Styles/Landing/Landing.module.css"


const Landing = () => {
    return (
        <div className={style.body}>
            <NavbarPage/>
        </div>
    )
}

export default Landing;
