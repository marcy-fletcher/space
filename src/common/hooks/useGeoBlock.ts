import {useQuery} from '@tanstack/react-query';
import {AppMeta} from "../../appMeta";


interface IpResponse {
    countryCode: string
}

const fetchGeoLocation = async () => {
    const response = await fetch('http://ip-api.com/json/');

    if (!response.ok) {
        throw new Error('Failed to fetch geolocation data');
    }

    return response.json();
};

const useGeoBlock = () => {
    const {data, error, isLoading} = useQuery<IpResponse, Error>({
            queryKey: ['geo-check'],
            queryFn: () => fetchGeoLocation(),
            staleTime: 5 * 60 * 1000,
            refetchInterval: 5 * 60 * 1000,
            enabled: AppMeta.enableGeoCheck,
            retry: 1
        }
    );

    const blockedCountries: string[] = AppMeta.blockedCountries;
    const isChecked = !AppMeta.enableGeoCheck || (!!data || error);
    const isAvailable = !AppMeta.enableGeoCheck || (data && !blockedCountries.includes(data?.countryCode?.toLowerCase()));

    return {isChecked, isAvailable, isLoading, error};
};

export default useGeoBlock;