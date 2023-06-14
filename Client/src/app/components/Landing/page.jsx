import Link from "next/link";

const links = [{
    label: 'Ingresar',
    route: '/home'
}]

const Landing = () => {
    return (
        <div>
            <h1>Bienvedidos a E-Latam </h1>
            {links?.map(({ label, route }, index) => (
                <Link href={route} key={index}>
                    <button>{label}</button>
                </Link>                
            ))}
        </div>
    )
}

export default Landing;