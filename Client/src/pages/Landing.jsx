import Link from "next/link"
import NavbarPage from "./Components/NavbarPage"
import Providers from "@/redux/provider/Provider"
import style from "./Styles/Landing/Landing.module.css"


const Landing = () => {
    return (
        <div className={style.body}>
            <NavbarPage/>
        </div>
    )
}

const LandingWithProvider = () => {
    return (
        <Providers>
            <Landing/>
        </Providers>
    );
};


export default LandingWithProvider;
