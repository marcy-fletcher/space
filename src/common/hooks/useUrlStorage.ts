import {useSearchParams} from "react-router-dom";
import {useEffect} from "react";

export const useUrlStorage = <T extends Record<string, string>>(
    params: T,
    setParams: (params: T) => void,
    initialized: boolean
) => {
    const [queryParams, setQueryParams] = useSearchParams();

    const setParamsFromUrl = () => {
        const paramsFromUrl = Object.keys(params).reduce((acc, key) => {
            const value = queryParams.get(key);

            if (value) {
                acc[key as keyof T] = value as T[keyof T];
            } else {
                acc[key as keyof T] = undefined;
            }

            return acc;
        }, {} as Partial<T>);

        if (paramsFromUrl) {
            setParams(paramsFromUrl as T);
        }
    }

    useEffect(setParamsFromUrl, [queryParams]);
    useEffect(() => {
        if (!initialized) {
            return;
        }

        const newQueryParams = new URLSearchParams();

        Object.keys(params).forEach((key) => {
            if (params[key]) {
                newQueryParams.set(key, params[key]);
            }
        });

        if (newQueryParams.toString() === queryParams.toString()) {
            return;
        }

        setQueryParams(newQueryParams);
    }, [params, initialized])
}