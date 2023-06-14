import Link from "next/link"
import style from "./styles/Landing/Landing.module.css"

const Landing = () => {
    return (
        <div className={style.body}>
            <Link href="/Home" >Home</Link>
            <h1>Esto es el Landing</h1>
        </div>

    )
}

export default Landing;