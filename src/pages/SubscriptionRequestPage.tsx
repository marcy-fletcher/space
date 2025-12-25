import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { SubscriptionsService } from "../services/subscriptions.ts";
import { useAuth } from "../contexts/AuthContext.tsx";
import LoadingSpinner from "../components/story/LoadingSpinner.tsx";
import {TierDetails, tierDetails} from "../types/subscription.ts";


const SubscriptionRequestPage: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [selectedTier, setSelectedTier] = useState<TierDetails | null>(null);
    const [userMessage, setUserMessage] = useState('');
    const [hasAgreed, setHasAgreed] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [submitSuccess, setSubmitSuccess] = useState<{
        show: boolean;
        message: string;
        isManualReview: boolean;
    }>({
        show: false,
        message: '',
        isManualReview: false
    });

    const maxAutoUpgrade = 500;

    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useAuth();

    useEffect(() => {
        const hash = location.hash;
        const tierMatch = hash.match(/tier=([a-f0-9-]+)/);
        const tierId = tierMatch ? tierMatch[1] : null;

        if (!tierId || !user) {
            navigate('/upgrade');
            return;
        }

        const tier = tierDetails.find(t => t.id === tierId);

        if (!tier) {
            navigate('/upgrade');
            return;
        }

        setSelectedTier(tier);
        setLoading(false);
    }, [location.hash, user, navigate]);

    const handleAgreeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setHasAgreed(e.target.checked);
    };

    const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setUserMessage(e.target.value);
        if (submitError) setSubmitError(null);
    };

    const handleSubmit = async () => {
        if (!hasAgreed) {
            setSubmitError('You must agree to the disclaimer before proceeding.');
            return;
        }

        if (selectedTier && selectedTier?.level > 500 && !userMessage.trim()) {
            setSubmitError('Please leave a message explaining why you want access to this tier.');
            return;
        }

        if (!selectedTier) {
            setSubmitError('No tier selected.');
            return;
        }

        setIsSubmitting(true);
        setSubmitError(null);

        try {
            const message = selectedTier && selectedTier?.level > maxAutoUpgrade ? userMessage.trim() : '';
            await SubscriptionsService.requestSubscription(selectedTier.id, message);

            const successMessage = selectedTier && selectedTier?.level > maxAutoUpgrade
                ? 'Subscription request submitted! Your request will be manually reviewed.'
                : 'Subscription activated successfully! You now have access to this tier.';

            setSubmitSuccess({
                show: true,
                message: successMessage,
                isManualReview: selectedTier && selectedTier?.level > maxAutoUpgrade
            });

            setTimeout(() => {
                navigate('/');
            }, 3000);

        } catch (error) {
            setSubmitError(error instanceof Error ? error.message : 'Failed to submit request. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleGoBack = () => {
        navigate('/upgrade');
    };

    const handleSuccessDismiss = () => {
        setSubmitSuccess({ show: false, message: '', isManualReview: false });
        navigate('/');
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    if (!selectedTier) {
        return (
            <div className="min-h-screen flex items-center justify-center px-4">
                <div className="text-center max-w-md">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                        Tier not found
                    </h2>
                    <button
                        onClick={handleGoBack}
                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                    >
                        ← Return to Subscriptions
                    </button>
                </div>
            </div>
        );
    }

    const disclaimer = tierDetails.find(x => x.id === selectedTier.id)?.description;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-6 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto">
                {submitSuccess.show ? (
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
                        <div className="p-8 text-center">
                            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/30 mb-6">
                                <svg className="h-8 w-8 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>

                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                {submitSuccess.isManualReview ? 'Request Submitted!' : 'Success!'}
                            </h2>

                            <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                                {submitSuccess.message}
                            </p>

                            {submitSuccess.isManualReview && (
                                <div className="mb-8 p-4 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-xl">
                                    <p className="text-sm text-purple-700 dark:text-purple-300">
                                        You will receive an email notification once your request has been reviewed.
                                    </p>
                                </div>
                            )}

                            <div className="space-y-4">
                                <button
                                    onClick={handleSuccessDismiss}
                                    className="w-full py-3 px-4 bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 text-white font-semibold rounded-xl transition-colors duration-200"
                                >
                                    Continue to Home
                                </button>

                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    Redirecting in 3 seconds...
                                </p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="mb-8">
                            <div className="flex items-center gap-3 mb-4">
                                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {selectedTier.title}
                                </h1>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
                            <div className="p-6">
                                <div className="mb-6">
                                    <div className="flex items-start gap-3 mb-4">
                                        <div className="flex-shrink-0">
                                            <svg className="w-5 h-5 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                            Content Warning
                                        </h3>
                                    </div>

                                    <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4">
                                        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                                            {disclaimer}
                                        </p>
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <label className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-900/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-900/70 cursor-pointer transition-colors">
                                        <input
                                            type="checkbox"
                                            checked={hasAgreed}
                                            onChange={handleAgreeChange}
                                            disabled={isSubmitting}
                                            className="mt-1 h-4 w-4 text-red-600 rounded focus:ring-red-500 dark:focus:ring-red-400"
                                        />
                                        <span className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                                            I have read and understood the content warning above. I confirm that I want to access this tier and accept that the content may be offensive or disturbing.
                                        </span>
                                    </label>
                                </div>

                                {selectedTier && selectedTier?.level > maxAutoUpgrade && (
                                    <div className="mb-6">
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Why do you want access? *
                                        </label>
                                        <textarea
                                            rows={3}
                                            value={userMessage}
                                            onChange={handleMessageChange}
                                            disabled={isSubmitting}
                                            placeholder="Please explain why you want access to this tier..."
                                            className="w-full px-4 py-3 text-sm border border-gray-300 dark:border-gray-600 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:text-white disabled:opacity-50 resize-none"
                                        />
                                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                            This tier requires manual review. Your message will help with the approval process.
                                        </p>
                                    </div>
                                )}

                                <div className="mb-6">
                                    <div className={`flex items-start gap-3 p-4 rounded-xl ${
                                        selectedTier && selectedTier?.level > maxAutoUpgrade
                                            ? 'bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800'
                                            : 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
                                    }`}>
                                        <div className="flex-shrink-0">
                                            {selectedTier && selectedTier?.level > maxAutoUpgrade ? (
                                                <svg className="w-5 h-5 text-purple-600 dark:text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                                </svg>
                                            ) : (
                                                <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                            )}
                                        </div>
                                        <p className={`text-sm ${
                                            selectedTier && selectedTier?.level > maxAutoUpgrade
                                                ? 'text-purple-700 dark:text-purple-300'
                                                : 'text-green-700 dark:text-green-300'
                                        }`}>
                                            {selectedTier && selectedTier?.level > maxAutoUpgrade
                                                ? 'This tier requires manual review. Your request will be personally evaluated by the creator.'
                                                : 'This tier is automatically approved upon submission. You will get immediate access.'
                                            }
                                        </p>
                                    </div>
                                </div>

                                {submitError && (
                                    <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
                                        <p className="text-sm text-red-600 dark:text-red-400">{submitError}</p>
                                    </div>
                                )}

                                <button
                                    onClick={handleSubmit}
                                    disabled={isSubmitting || !hasAgreed || (selectedTier && selectedTier?.level > maxAutoUpgrade && !userMessage.trim())}
                                    className={`w-full py-3 px-4 rounded-xl text-sm font-semibold text-white transition-all duration-200 ${
                                        isSubmitting
                                            ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed'
                                            : 'bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed'
                                    }`}
                                >
                                    {isSubmitting ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                            </svg>
                                            Processing...
                                        </span>
                                    ) : (
                                        selectedTier && selectedTier?.level > maxAutoUpgrade ? 'Submit for Review' : 'Activate Subscription'
                                    )}
                                </button>

                                <p className="mt-4 text-center text-xs text-gray-500 dark:text-gray-400">
                                    By submitting, you agree to disclaimer
                                </p>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default SubscriptionRequestPage;