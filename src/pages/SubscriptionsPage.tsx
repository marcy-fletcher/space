import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { faDeviantart, faDiscord } from '@fortawesome/free-brands-svg-icons';

const SubscriptionsPage: React.FC = () => {
    const [showContactModal, setShowContactModal] = useState(false);
    const [copyFeedback, setCopyFeedback] = useState('');

    const copyDiscordTag = () => {
        navigator.clipboard.writeText('@masha.fin');
        setCopyFeedback('Copied to clipboard!');
        setTimeout(() => setCopyFeedback(''), 2000);
    };

    const closeModal = () => {
        setShowContactModal(false);
        setCopyFeedback('');
    };

    return (
        <div className="container mx-auto px-4 py-12 max-w-3xl">
            <header className="text-center mb-12">
                <h1 className="text-6xl md:text-7xl font-bold text-transparent bg-clip-text
                             bg-gradient-to-r from-pink-600 via-purple-600 to-pink-600
                             dark:text-gray-100
                             mb-4 font-serif tracking-tight transition-all duration-500">
                    Account Tiers
                </h1>
                <p className="text-xl text-pink-600 dark:text-pink-200 font-light font-sans transition-colors duration-300">
                    Choose the experience that's right for you
                </p>
                <div className="mt-6 flex justify-center gap-2">
                    <div className="w-16 h-1 bg-gradient-to-r from-transparent via-pink-400 dark:via-pink-500 to-transparent rounded-full transition-all duration-300"></div>
                    <div className="w-1 h-1 bg-pink-400 dark:bg-pink-500 rounded-full mt-0 transition-all duration-300"></div>
                    <div className="w-16 h-1 bg-gradient-to-r from-transparent via-pink-400 dark:via-pink-500 to-transparent rounded-full transition-all duration-300"></div>
                </div>
            </header>

            <div className="space-y-6 mb-8">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-5 shadow-lg border border-pink-200 dark:border-gray-700 transition-all duration-300">
                    <h2 className="text-2xl font-bold text-pink-600 dark:text-pink-400 mb-3 font-serif">
                        The Acolyte
                    </h2>
                    <p className="text-gray-700 dark:text-gray-300 font-sans">
                        The standard, free account tier. Most of my works are available here.
                    </p>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg p-5 shadow-lg border border-red-200 dark:border-red-800 transition-all duration-300">
                    <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-3 font-serif">
                        The High Priest
                    </h2>
                    <p className="text-gray-700 dark:text-gray-300 font-sans mb-3">
                        For those who want more risky content.
                    </p>
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded p-3">
                        <p className="text-red-700 dark:text-red-300 font-semibold font-sans text-sm">
                            ⚠️ WARNING: Offensive themes may appear, so if you're easily upset, think twice before choosing this tier.
                        </p>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg p-5 shadow-lg border border-purple-200 dark:border-purple-800 transition-all duration-300">
                    <h2 className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-3 font-serif">
                        The Cult Leader
                    </h2>
                    <p className="text-gray-700 dark:text-gray-300 font-sans mb-3">
                        For those who are ready for absolutely anything.
                    </p>
                    <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded p-3">
                        <p className="text-purple-700 dark:text-purple-300 font-semibold font-sans text-sm">
                            🚨 EXTREME WARNING: Offensive themes, brutality, violence, and other triggers may appear in the fiction for this tier. If you hesitate even for a moment about whether this is right for you, do not upgrade to this tier.
                        </p>
                    </div>
                </div>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-6">
                <p className="text-yellow-800 dark:text-yellow-200 font-sans text-sm">
                    <strong>Important Note:</strong> The presence of certain themes, characters, or actions in my works does not mean that I support, approve of, or promote them. Everything presented is fictional or a creative interpretation intended for entertainment purposes only.
                </p>
            </div>

            <div className="text-center">
                <button
                    onClick={() => setShowContactModal(true)}
                    className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 dark:from-pink-600 dark:to-purple-700 dark:hover:from-pink-700 dark:hover:to-purple-800 text-white px-8 py-3 rounded-full transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl text-lg font-semibold"
                >
                    Get an upgrade
                </button>
            </div>

            {showContactModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 transition-all duration-300">
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-md w-full shadow-xl transform transition-all duration-300 scale-100">
                        <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 font-serif text-center">
                            Contact Me to Upgrade
                        </h3>

                        <div className="space-y-4 mb-6">

                            <div className="flex items-center justify-between bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
                                <div className="flex items-center space-x-3">
                                    <FontAwesomeIcon
                                        icon={faDiscord}
                                        className="text-2xl text-indigo-500"
                                    />
                                    <span className="text-gray-700 dark:text-gray-300 font-mono">
                                        @masha.fin
                                    </span>
                                </div>
                                <button
                                    onClick={copyDiscordTag}
                                    className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg transition-colors duration-200"
                                >
                                    <FontAwesomeIcon icon={faCopy} />
                                    <span>Copy</span>
                                </button>
                            </div>

                            <a
                                href="https://www.deviantart.com/marcyfletcher"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-between bg-gray-100 dark:bg-gray-700 rounded-lg p-4 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200 no-underline"
                            >
                                <div className="flex items-center space-x-3">
                                    <FontAwesomeIcon
                                        icon={faDeviantart}
                                        className="text-2xl text-green-500"
                                    />
                                    <span className="text-gray-700 dark:text-gray-300">
                                        marcyfletcher
                                    </span>
                                </div>
                                <span className="text-blue-500 dark:text-blue-400 font-semibold">
                                    Visit
                                </span>
                            </a>
                        </div>

                        {copyFeedback && (
                            <div className="bg-green-100 dark:bg-green-900 border border-green-200 dark:border-green-800 rounded-lg p-3 mb-4 text-center">
                                <p className="text-green-700 dark:text-green-300 font-semibold">
                                    {copyFeedback}
                                </p>
                            </div>
                        )}

                        <p className="text-gray-600 dark:text-gray-400 text-center mb-6 font-sans">
                            Contact me through either platform to discuss an account upgrade options.
                        </p>

                        <button
                            onClick={closeModal}
                            className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 dark:from-pink-600 dark:to-purple-700 dark:hover:from-pink-700 dark:hover:to-purple-800 text-white px-4 py-2 rounded-full transition-all duration-200 transform hover:scale-105"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SubscriptionsPage;