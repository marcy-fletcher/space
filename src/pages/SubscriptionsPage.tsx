import React, { useEffect, useState } from 'react';
import { useDebugLog } from "../hooks/useDebugLog.ts";
import LoadingSpinner from "../components/story/LoadingSpinner.tsx";
import { useAuth } from "../contexts/AuthContext.tsx";
import { UserService } from "../services/user.ts";
import { UserSubscription } from "../types/userSubscription.ts";
import PageHeader from "../components/subscriptions-page/PageHeader.tsx";
import BetaTestingBanner from "../components/subscriptions-page/BetaTestingBanner.tsx";
import TierCard from "../components/subscriptions-page/TierCard.tsx";
import WarningNote from "../components/subscriptions-page/WarningNote.tsx";
import { useNavigate } from 'react-router-dom';
import {tierDetails} from "../types/subscription.ts";

const SubscriptionsPage: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [userSubscription, setUserSubscription] = useState<UserSubscription>();
    const { debugPageLoad } = useDebugLog();
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        debugPageLoad('subscriptions');

        async function fetchData() {
            try {
                if (!user || !user.id) {
                    return;
                }

                const userTier = await UserService.getUserSubscription(user.id);
                if (userTier) {
                    setUserSubscription(userTier);
                }
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [user]);

    const handleRequestTier = (tierId: string) => {
        navigate(`/subscriptions/request#tier=${tierId}`);
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="container mx-auto px-4 py-12 max-w-3xl">
            <PageHeader
                title="Account Tiers"
                subtitle="Choose the experience that's right for you"
            />

            <BetaTestingBanner />

            <div className="space-y-6 mb-8">
                {tierDetails.map((tier, index) => (
                    <TierCard
                        id={tier.id}
                        level={tier.level}
                        userLevel={userSubscription?.level}
                        key={index}
                        title={tier.title}
                        color={tier.color as "pink" | "red" | "purple"}
                        description={tier.description}
                        warning={tier.warning}
                        onRequestTier={handleRequestTier}
                    />
                ))}

                <WarningNote />
            </div>
        </div>
    );
};

export default SubscriptionsPage;