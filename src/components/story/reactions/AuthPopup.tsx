import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSignInAlt, faXmark} from "@fortawesome/free-solid-svg-icons";

interface AuthPopupProps {
    show: boolean;
    onClose: () => void;
}

const AuthPopup: React.FC<AuthPopupProps> = ({ show, onClose }) => {
    if (!show) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 m-4 max-w-sm w-full shadow-2xl border border-gray-200 dark:border-gray-700 transform animate-scale-in">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center">
                            <FontAwesomeIcon
                                icon={faSignInAlt}
                                className="w-4 h-4 text-white"
                            />
                        </div>
                        <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200">
                            Sign In Required
                        </h3>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 flex items-center justify-center transition-colors duration-200"
                    >
                        <FontAwesomeIcon
                            icon={faXmark}
                            className="w-4 h-4 text-gray-500 dark:text-gray-400"
                        />
                    </button>
                </div>

                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                    You need to be signed in to react to this story.
                    Please log in or create an account to continue.
                </p>
            </div>
        </div>
    );
};

export default AuthPopup;