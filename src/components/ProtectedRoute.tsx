import { Navigate } from 'react-router-dom';
import { useAuth } from "../contexts/AuthContext.tsx";
import React, { useEffect, useState } from "react";
import { UserService } from "../services/user.ts";
import { UserSubscription } from "../types/userSubscription.ts";
import LoadingSpinner from "./story/LoadingSpinner.tsx";

interface ProtectedRouteProps {
    children: React.ReactNode;
    requiredTier?: number | null;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
                                                           children,
                                                           requiredTier = null
                                                       }) => {
    const { user, isAuthenticated } = useAuth();
    const [subscription, setSubscription] = useState<UserSubscription | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchSubscription = async () => {
            if (!requiredTier || !user?.id) {
                setIsLoading(false);
                return;
            }

            try {
                setIsLoading(true);
                setError(null);
                const subData = await UserService.getUserSubscription(user.id);
                setSubscription(subData);
            } catch (err) {
                console.error('Failed to fetch subscription:', err);
                setError('Failed to verify subscription');
                setSubscription(null);
            } finally {
                setIsLoading(false);
            }
        };

        fetchSubscription();
    }, [user?.id, requiredTier]);

    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    if (requiredTier && error) {
        console.error('Subscription verification failed:', error);
        return <Navigate to="/" replace />;
    }

    if (requiredTier) {
        if (!subscription) {
            return <Navigate to="/" replace />;
        }

        if (subscription.level < requiredTier) {
            return <Navigate to="/" replace />;
        }
    }

    return <>{children}</>;
};

export default ProtectedRoute;