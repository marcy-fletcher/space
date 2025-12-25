import React from 'react';

const BetaTestingBanner: React.FC = () => {
    return (
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
    );
};

export default BetaTestingBanner;