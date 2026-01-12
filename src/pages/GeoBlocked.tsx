import {cn} from "../utils/cn.ts";
import {useDocumentTitle} from "../layout/hooks/useDocumentTitle.ts";
import {ErrorCodes} from "../common/services/logging.service.ts";
import {useLogError} from "../common/hooks/useLogError.ts";

import geoBlocked from "../../public/geo-blocked.webp";

interface GeoBlockedProps {
    title?: string;
    message?: string;
    imageSrc?: string;
    className?: string;
}

const GeoBlocked = ({
                        title = "Geo Blocked",
                        message = "You are currently located in a country that is restricted from accessing this service.",
                        imageSrc = geoBlocked,
                        className
                    }: GeoBlockedProps) => {

    useDocumentTitle('Geo Blocked');
    useLogError(ErrorCodes.geoBlock);

    return (
        <div className="bg-mono-200 dark:bg-mono-900 min-h-screen flex items-center justify-center">
            <div
                className={cn(
                    "w-full min-h-[60vh] flex items-center justify-center px-4 sm:px-6 bg-mono-50 dark:bg-mono-900",
                    className
                )}
            >
                <div className="max-w-3xl w-full">
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8">
                        <div className="shrink-0 md:-mr-34 md:-mt-18 md:relative md:z-5">
                            <div className="w-78 h-78">
                                <img
                                    src={imageSrc}
                                    alt="Geo Blocked"
                                    className="w-full h-full object-contain select-none"
                                    draggable={false}
                                />
                            </div>
                        </div>

                        <div
                            className="flex-1 bg-white dark:bg-mono-800 rounded-xl md:rounded-2xl shadow-lg p-6 md:p-8 text-center md:text-left">
                            <h1 className="text-3xl md:text-4xl font-bold font-sans mb-4 flex items-center justify-center md:justify-start gap-3 text-mono-900 dark:text-mono-100">
                                {title}
                            </h1>

                            <p
                                className="text-base md:text-lg font-sans leading-relaxed mb-6 text-mono-600 dark:text-mono-400"
                            >
                                {message}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GeoBlocked;
