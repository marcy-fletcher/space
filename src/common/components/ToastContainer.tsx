import {ToastContainer} from "react-toastify";
import {useTheme} from "../hooks/useTheme.ts";

export default function LazyToastContainer() {
    const {theme} = useTheme();

    return (
        <ToastContainer
            autoClose={1000}
            theme={theme}
            position="bottom-right"
        />
    );
}