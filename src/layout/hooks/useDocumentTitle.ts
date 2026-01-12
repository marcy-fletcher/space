import { useEffect } from "react";
import { AppMeta } from "../../appMeta.ts";

export function useDocumentTitle(title?: string, postfix = AppMeta.appName) {
    useEffect(() => {
        if (!title)
            return;

        const previousTitle = document.title;

        document.title = `${title} - ${postfix}`;

        return () => {
            document.title = previousTitle;
        };
    }, [title, postfix]);
}