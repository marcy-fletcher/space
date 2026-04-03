import {useQuery} from '@tanstack/react-query';
import {AppMeta} from "../../appMeta";


interface IpResponse {
    country: string
}

const fetchGeoLocation = async () => {
    const response = await fetch('https://get.geojs.io/v1/ip/country.json');

    if (!response.ok) {
        throw new Error('Failed to fetch geolocation data');
    }

    return await response.json();
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
    const isAvailable = !AppMeta.enableGeoCheck || (data && !blockedCountries.includes(data?.country?.toLowerCase()));

    return {isChecked, isAvailable, isLoading, error};
};

export default useGeoBlock;