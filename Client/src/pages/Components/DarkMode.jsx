import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Providers from "@/redux/provider/Provider"

const DarkMode = () => {

    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState();

    useEffect(() => {
        setMounted(true);
    }, []);

    if(!mounted) return null;

    if(theme === "dark") return <div><button class="btn rounded-fill" onClick={() => setTheme("light")}><i class="bi bi-moon-fill"></i></button></div>;

    return(
        <div>
            <button class="btn rounded-fill" onClick={() => setTheme("dark")}><i class="bi bi-sun-fill"></i></button>
        </div>
    );
};

const DarkModeProvider = () => {
    return (
        <Providers>
            <DarkMode/>
        </Providers>
    );
};


export default DarkModeProvider;