import { Outlet } from "react-router-dom";

const FocusLayout = () => {
    return (
        <div className="bg-mono-200 dark:bg-mono-900 min-h-screen flex items-center justify-center">
            <Outlet />
        </div>
    );
};

export default FocusLayout;
