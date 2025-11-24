import React from "react";

const AgeVerification: React.FC = () => {
    const handleAgeConfirm = async () => {
        localStorage.setItem('ageVerified', 'true');
        window.location.reload();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md w-full mx-auto text-center shadow-2xl">
                <div className="text-6xl mb-4">🔞</div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 font-serif">
                    Age Verification Required
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6 font-sans">
                    This website contains content intended for adults only. You must be 18 years or older to access this site.
                </p>
                <div className="space-y-4">
                    <button
                        onClick={handleAgeConfirm}
                        className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-full transition-all duration-200 transform hover:scale-105"
                    >
                        I am 18 years or older
                    </button>
                    <button
                        onClick={() => window.location.href = 'https://www.google.com'}
                        className="w-full bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500 text-gray-800 dark:text-white font-semibold py-3 px-6 rounded-full transition-all duration-200"
                    >
                        Exit Site
                    </button>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-6">
                    By entering this site, you confirm you are of legal age.
                </p>
            </div>
        </div>
    );
};

export default AgeVerification;