import {lazy, type ReactNode} from 'react';
import useGeoBlock from "../hooks/useGeoBlock.ts";

const GeoBlocked = lazy(() => import("../../pages/GeoBlocked.tsx"));
const Loader = lazy(() => import("./Loader.tsx"));

interface GeoCheckProps {
    children: ReactNode;
}

const GeoCheck = ({children}:GeoCheckProps) => {

    const {isChecked, isAvailable} = useGeoBlock();

    if (!isChecked) {
        return <Loader className="w-full h-screen" />
    }

    if (!isAvailable) {
        return <GeoBlocked/>;
    }

    return (
        <div>
            {children}
        </div>
    );
};

export default GeoCheck;