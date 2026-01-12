import {useEffect} from "react";
import {EventCodes, logInfo} from "../services/logging.service.ts";

export function usePageLog<T>(pageName: string, metadata?:T, enabled:boolean = true) {

    const metadataJson = JSON.stringify(metadata);

    useEffect(() => {
        const logEvent = async () => {
            if (enabled) {
                await logInfo(EventCodes.pageVisit, {...metadata, pageName: pageName});
            }
        };

        logEvent();
    }, [pageName, metadataJson, enabled]);
}