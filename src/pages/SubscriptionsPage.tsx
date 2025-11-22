import React, {useEffect, useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { faDeviantart, faDiscord } from '@fortawesome/free-brands-svg-icons';
import {logging} from "../services/logging.ts";

const SubscriptionsPage: React.FC = () => {
    const [showContactModal, setShowContactModal] = useState(false);
    const [copyFeedback, setCopyFeedback] = useState('');

    useEffect(() => {
        const log = async () => {
            await logging.logUserAction('Page Accessed', 'User accessed the Subscriptions section');
        };

        log();
    }, []);

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

            <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800 rounded-xl p-6 mb-8 text-center shadow-lg transition-all duration-300 hover:shadow-xl">
                <div className="flex items-center justify-center mb-3">
                    <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mr-3">
                        <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-green-800 dark:text-green-200 font-serif">
                        Testing Phase Active
                    </h3>
                </div>
                <p className="text-green-700 dark:text-green-300 font-sans text-lg leading-relaxed">
                    <span className="font-semibold">All content is currently available free of charge.</span><br/>
                    During this testing period, no payment is required to access any tier.
                </p>
                <div className="mt-4 flex justify-center">
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200 text-sm font-medium">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                        Beta Testing Mode
                    </div>
                </div>
            </div>

            <div className="space-y-6 mb-8">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-5 shadow-lg border border-pink-200 dark:border-gray-700 transition-all duration-300">
                    <h2 className="text-2xl font-bold text-pink-600 dark:text-pink-400 mb-3 font-serif">
                        The Acolyte
                    </h2>
                    <p className="text-gray-700 dark:text-gray-300 font-sans">
                        The standard account tier - most of my work is available here. Just create an account, and you're good to go!
                    </p>
                </div>

                <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-6">
                    <p className="text-yellow-800 dark:text-yellow-200 font-sans text-sm">
                        <strong>Important Note:</strong> The presence of certain themes, characters, or actions in my works does not mean that I support, approve of, or promote them. Everything presented is fictional or a creative interpretation intended for entertainment purposes only.
                    </p>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg p-5 shadow-lg border border-red-200 dark:border-red-800 transition-all duration-300">
                    <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-3 font-serif">
                        The High Priest
                    </h2>
                    <p className="text-gray-700 dark:text-gray-300 font-sans mb-3">
                        This content may include offensive, sensitive, or controversial themes - primarily involving satire or mockery of political beliefs and social norms, slurs, and various -phobias, sometimes presented intensely by characters. It may be particularly offensive to a modern Western audience.
                    </p>

                    <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-400 dark:border-red-500 p-4 my-4 rounded-r-lg">
                        <div className="flex items-start">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-red-400 dark:text-red-300" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-red-700 dark:text-red-200 font-medium">
                                    I generally do not recommend this tier if you are easily affected by social or political topics.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg p-5 shadow-lg border border-purple-200 dark:border-purple-800 transition-all duration-300">
                    <h2 className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-3 font-serif">
                        The Cult Leader
                    </h2>
                    <p className="text-gray-700 dark:text-gray-300 font-sans mb-3">
                        This tier may contain extremely brutal and graphic depictions of mental and physical abuse and violence of various kinds, and is significantly more unhinged than the previous tier.
                    </p>

                    <div className="bg-purple-50 dark:bg-purple-900/20 border-l-4 border-purple-500 dark:border-purple-400 p-4 my-4 rounded-r-lg">
                        <div className="flex items-start">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-purple-500 dark:text-purple-300" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-purple-800 dark:text-purple-200 font-semibold">
                                    Strong Recommendation Against
                                </p>
                                <p className="text-sm text-purple-700 dark:text-purple-300 mt-1">
                                    I strongly advise against accessing this tier <u>unless you are absolutely sure this is what you want and are actively seeking it</u>.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
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