import { Provider } from "react-redux";
import store from "../store/store";
import { ThemeProvider } from "next-themes";
import { useState, useEffect } from "react";

// const Providers = ({children}) => {
//     return <Provider store={store}>
//         {children}
//     </Provider>
// }

const Providers = ({ children }) => {

    const [mounted, setMounted] = useState();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return <Provider store={store}>{children}</Provider>;

    return (
        <Provider store={store}>
            <ThemeProvider>{children}</ThemeProvider>
        </Provider>
    )
}

export default Providers;