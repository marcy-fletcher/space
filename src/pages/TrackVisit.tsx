import {useNavigate, useSearchParams} from "react-router-dom";
import {useEffect} from "react";
import {useMutation} from "@tanstack/react-query";
import {trackVisit} from "../common/services/logging.service.ts";
import Loader from "../common/components/Loader.tsx";

const TrackVisit = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const {mutate} = useMutation({
        mutationFn: trackVisit
    });

    const linkName = searchParams.get('link');

    useEffect(() => {
        async function onTrack() {
            if (linkName) {
                mutate(linkName)
            }

            console.log('Link', linkName);
            await navigate('/');
        }
        onTrack();
    }, [linkName])

    return <Loader/>;
};

export default TrackVisit;