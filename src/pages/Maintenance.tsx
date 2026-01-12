import {useDocumentTitle} from "../layout/hooks/useDocumentTitle.ts";

const Maintenance = () => {

    useDocumentTitle('Maintenance');

    return (
        <div className="flex flex-col items-center justify-center w-full h-screen bg-linear-to-br from-primary-50 via-shade-50 to-primary-200 dark:from-mono-900 dark:via-mono-800 dark:to-mono-900">
            <img className="grow max-h-125 max-w-125 object-contain select-none" src="maintenance.webp" alt="Maintenance"/>
        </div>
    );
};

export default Maintenance;