import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { visitService } from "../services/visit.ts";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const VisitTracker: React.FC = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [isTracking, setIsTracking] = useState(true);

    useEffect(() => {
        const trackVisit = async () => {
            try {
                const linkName = searchParams.get('link');

                if (!linkName) {
                    setIsTracking(false);
                    setTimeout(() => navigate('/'), 500);
                    return;
                }

                await visitService.trackVisit(linkName);
                setIsTracking(false);

                navigate('/');

            } catch (err) {
                setIsTracking(false);
                setTimeout(() => navigate('/'), 500);
            }
        };

        trackVisit();
    }, [searchParams, navigate]);

    return (
        <div className="container mx-auto px-4 py-24 max-w-4xl min-h-screen flex items-center justify-center">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border-2 border-gray-100 dark:border-gray-700 text-center w-full max-w-md">
                {isTracking ? (
                    <div className="flex flex-col items-center gap-4">
                        <FontAwesomeIcon
                            icon={faSpinner}
                            className="w-8 h-8 text-primary-500 dark:text-primary-400 animate-spin"
                        />
                        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 font-serif">
                            Processing
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 font-sans">
                            Please wait a moment...
                        </p>
                    </div>
                ) : (
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                            <div className="w-6 h-6 rounded-full bg-green-500 animate-pulse"></div>
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 font-serif">
                            Redirecting
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 font-sans">
                            Taking you to the homepage...
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default VisitTracker;