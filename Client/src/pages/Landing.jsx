import Link from "next/link"
import NavbarPage from "./Components/NavbarPage"
import style from "./Styles/Landing/Landing.module.css"


const Landing = () => {
    return (
        <div className={style.body}>
            <NavbarPage/>
        </div>
    )
}

export default Landing;
