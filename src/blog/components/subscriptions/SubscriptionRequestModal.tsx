import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faCheckCircle, faClock } from '@fortawesome/free-solid-svg-icons';
import type { SubscriptionKey } from "../../../auth/types/subscription.ts";
import Button from "../../../common/components/Button.tsx";
import Card from "../../../layout/Card.tsx";
import Header from "../../../common/components/Header.tsx";

interface SubscriptionRequestModalProps {
    isOpen: boolean;
    onClose: () => void;
    tier: SubscriptionKey;
    onSubmitRequest: (tier: SubscriptionKey) => Promise<void>;
}

export default function SubscriptionRequestModal({
                                                     isOpen,
                                                     onClose,
                                                     tier,
                                                     onSubmitRequest,
                                                 }: SubscriptionRequestModalProps) {
    const [agreed, setAgreed] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    if (!isOpen) return null;

    const getTierTitle = () => {
        if (tier === 'high-priest') return 'The High Priest';
        if (tier === 'cult-leader') return 'The Cult Leader';
        return 'Unknown Tier';
    };

    const getRulesContent = () => {
        if (tier === 'high-priest') {
            return (
                <>
                    <p className="font-medium mb-3">By requesting this tier you confirm that:</p>
                    <ul className="space-y-2.5 text-sm text-gray-700 dark:text-gray-300">
                        <li className="flex items-start">
                            <FontAwesomeIcon icon={faCheckCircle} className="mr-2.5 mt-1 text-green-500 flex-shrink-0" />
                            <span>I am 18 years or older</span>
                        </li>
                        <li className="flex items-start">
                            <FontAwesomeIcon icon={faCheckCircle} className="mr-2.5 mt-1 text-green-500 flex-shrink-0" />
                            <span>I understand this tier contains offensive, controversial and provocative content including satire, political mockery, slurs, and various phobias</span>
                        </li>
                        <li className="flex items-start">
                            <FontAwesomeIcon icon={faCheckCircle} className="mr-2.5 mt-1 text-green-500 flex-shrink-0" />
                            <span>I accept that access to this tier may be revoked if I violate community guidelines</span>
                        </li>
                    </ul>
                </>
            );
        }

        if (tier === 'cult-leader') {
            return (
                <>
                    <p className="font-medium mb-3">By requesting this tier you confirm that:</p>
                    <ul className="space-y-2.5 text-sm text-gray-700 dark:text-gray-300">
                        <li className="flex items-start">
                            <FontAwesomeIcon icon={faCheckCircle} className="mr-2.5 mt-1 text-green-500 flex-shrink-0" />
                            <span>I am 18 years or older</span>
                        </li>
                        <li className="flex items-start">
                            <FontAwesomeIcon icon={faCheckCircle} className="mr-2.5 mt-1 text-green-500 flex-shrink-0" />
                            <span>I am comfortable with extremely graphic, brutal and disturbing content including detailed depictions of physical and psychological <strong>abuse, violence, torture</strong> and other extreme themes</span>
                        </li>
                        <li className="flex items-start">
                            <FontAwesomeIcon icon={faCheckCircle} className="mr-2.5 mt-1 text-green-500 flex-shrink-0" />
                            <span>I will not share this content with minors or in public spaces where it may be accessed by unprepared viewers</span>
                        </li>
                        <li className="flex items-start">
                            <FontAwesomeIcon icon={faCheckCircle} className="mr-2.5 mt-1 text-green-500 flex-shrink-0" />
                            <span>I accept immediate and permanent ban risk if I attempt to misuse or redistribute this content inappropriately</span>
                        </li>
                    </ul>
                </>
            );
        }

        return <p>No specific rules defined for this tier.</p>;
    };

    const handleSubmit = async () => {
        if (!agreed) return;

        setSubmitting(true);
        try {
            await onSubmitRequest(tier);
            onClose();
        } catch (err) {
            console.error(err);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <Card className="relative max-w-lg w-full max-h-[90vh] overflow-y-auto">

                <Header className="sticky top-0 px-6 py-4 flex items-center justify-between z-10">
                    {getTierTitle()} subscription
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-xl"
                        aria-label="Close"
                    >
                        <FontAwesomeIcon icon={faXmark} />
                    </button>
                </Header>

                <div className="px-6 py-6 space-y-6">
                    <div className="prose dark:prose-invert prose-sm max-w-none">
                        {getRulesContent()}
                    </div>

                    <div className="pt-4 border-t border-gray-200 dark:border-gray-800 space-y-6">
                        <label className="flex items-start gap-3 cursor-pointer group">
                            <input
                                type="checkbox"
                                checked={agreed}
                                onChange={(e) => setAgreed(e.target.checked)}
                                className="mt-1.5 h-5 w-5 rounded border-gray-300 text-green-600 focus:ring-green-500 dark:border-gray-600 dark:bg-gray-700"
                            />
                            <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-gray-100">
                                I have read and understood the rules above. I confirm that I want to request access to <strong>{getTierTitle()}</strong> and I accept all associated risks and responsibilities.
                            </span>
                        </label>

                        <Card className="bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-lg p-4 text-sm text-amber-800 dark:text-amber-200">
                            <div className="flex items-start gap-3">
                                <FontAwesomeIcon icon={faClock} className="mt-0.5 text-amber-600 dark:text-amber-400 flex-shrink-0" />
                                <p>
                                    <strong>Important:</strong> Subscription requests are manually reviewed. Review usually takes up to 24 hours, though it may occasionally be faster or slower.
                                </p>
                            </div>
                        </Card>
                    </div>
                </div>

                <div className="flex flex-1">
                    <Button
                        className="w-full"
                        variant="submit"
                        disabled={!agreed || submitting}
                        onClick={handleSubmit}
                    >
                        {submitting ? 'Submitting...' : 'Submit Request'}
                    </Button>
                </div>
            </Card>
        </div>
    );
}