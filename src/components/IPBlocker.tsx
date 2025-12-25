import React, { useEffect, useState, ReactNode, useRef } from 'react';

interface IPBlockerProps {
    children: ReactNode;
    blockedCountries: string[];
}

interface CacheData {
    countryCode: string;
    timestamp: number;
}

const IPBlocker: React.FC<IPBlockerProps> = ({ children, blockedCountries }) => {
    const [isBlocked, setIsBlocked] = useState<boolean | null>(null);
    const [message, setMessage] = useState<string>('');
    const cacheChecked = useRef(false);
    const CACHE_DURATION = 24 * 60 * 60 * 1000;
    const CACHE_KEY = 'ip_blocker_country_cache';

    useEffect(() => {
        const checkIP = async () => {
            const cached = getCachedCountry();
            if (cached && !cacheChecked.current) {
                cacheChecked.current = true;
                handleCountryCheck(cached.countryCode);
                return;
            }

            try {
                const response = await fetch('https://ipwhois.app/json/');
                if (!response.ok) throw new Error(`HTTP ${response.status}`);

                const data = await response.json();
                const countryCode = data.country_code?.toUpperCase() || '';
                const countryName = data.country || 'Unknown';

                cacheCountry(countryCode);
                handleCountryCheck(countryCode, countryName);
            } catch (error) {
                console.error('Failed to fetch IP information:', error);
                setIsBlocked(false);
                setMessage('Unable to verify location - default access granted');
            }
        };

        const handleCountryCheck = (countryCode: string, countryName?: string) => {
            const name = countryName || countryCode;
            if (blockedCountries.includes(countryCode)) {
                setIsBlocked(true);
                if (countryCode === 'RU') {
                    setMessage(`Access is prohibited due to Russian law regarding LGBTQ+ content`);
                } else {
                    setMessage(`Access restricted from ${name} (${countryCode})`);
                }
            } else {
                setIsBlocked(false);
                setMessage(`Access granted from ${name} (${countryCode})`);
            }
        };

        checkIP();
    }, [blockedCountries]);

    const cacheCountry = (countryCode: string) => {
        const cacheData: CacheData = { countryCode, timestamp: Date.now() };
        try {
            localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
        } catch (e) {
            console.warn('Failed to cache country data:', e);
        }
    };

    const getCachedCountry = (): CacheData | null => {
        try {
            const cached = localStorage.getItem(CACHE_KEY);
            if (!cached) return null;

            const cacheData: CacheData = JSON.parse(cached);
            return Date.now() - cacheData.timestamp > CACHE_DURATION ? null : cacheData;
        } catch (e) {
            console.warn('Failed to read cache:', e);
            return null;
        }
    };

    if (isBlocked === null) {
        return (
            <div>
                <p>Checking access permissions...</p>
                {message && <p>{message}</p>}
            </div>
        );
    }

    if (isBlocked) {
        return (
            <div>
                <p>Access Restricted</p>
                <p>Your location is not permitted to access this content.</p>
                {message && <p>{message}</p>}
                <p>If you believe this is an error, please contact me.</p>
            </div>
        );
    }

    return <>{children}</>;
};

export default IPBlocker;