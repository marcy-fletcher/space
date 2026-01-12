import {useEffect} from "react";
import {type ErrorCode, logError} from "../services/logging.service.ts";

export function useLogError<T>(event: ErrorCode, metadata?: T, enabled:boolean = true) {
    useEffect(() => {
        const onLogError = async () => {
            if (enabled)
                await logError(event, metadata);
        };

        onLogError();
    }, [event, metadata, enabled]);
}