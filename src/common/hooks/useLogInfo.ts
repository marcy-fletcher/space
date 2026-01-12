import {useEffect} from "react";
import {type EventCode, logInfo} from "../services/logging.service.ts";

export function useLogInfo<T>(event: EventCode, metadata?: T, enabled:boolean = true) {
    useEffect(() => {
        const onLogInfo = async () => {
            if (enabled)
                await logInfo(event, metadata);
        };

        onLogInfo();
    }, [event, metadata, enabled]);
}