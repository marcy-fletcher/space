import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faShield, faLock } from '@fortawesome/free-solid-svg-icons'

const RestrictedAccessMessage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-6 flex items-center justify-center">
            <div className="max-w-md w-full">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8 text-center transform transition-all duration-300 hover:shadow-2xl">

                    <div className="flex justify-center mb-6">
                        <div className="relative">
                            <div className="w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                                <FontAwesomeIcon
                                    icon={faShield}
                                    className="text-red-500 dark:text-red-400 text-3xl"
                                />
                            </div>
                            <div className="absolute -top-1 -right-1">
                                <FontAwesomeIcon
                                    icon={faLock}
                                    className="text-gray-500 dark:text-gray-400 text-sm"
                                />
                            </div>
                        </div>
                    </div>

                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">
                        Access Restricted
                    </h2>

                    <p className="text-gray-600 dark:text-gray-400 mb-2 text-lg">
                        Administrative Access Required
                    </p>

                    <p className="text-gray-500 dark:text-gray-500 mb-6 text-sm">
                        This area is restricted to authorized personnel only.
                    </p>

                    <button
                        onClick={() => window.history.back()}
                        className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center space-x-3 group shadow-lg hover:shadow-xl"
                    >
                        <FontAwesomeIcon
                            icon={faArrowLeft}
                            className="transition-transform duration-200 group-hover:-translate-x-1"
                        />
                        <span>Return to Safety</span>
                    </button>

                    <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            If you believe this is an error, please contact your system administrator.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RestrictedAccessMessage