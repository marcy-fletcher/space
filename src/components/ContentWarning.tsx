import {useNavigate } from 'react-router-dom';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faExclamationTriangle, faEye, faEyeSlash, faShieldAlt} from "@fortawesome/free-solid-svg-icons";
import {getWarningLevelColor} from "./WarningSection.tsx";
import {Post} from "../types/post.ts";

interface ContentWarningProps {
    id: string;
    warnings: Post['warnings'];
    setHasAgreedToWarnings: (isAgreed: boolean) => void;
    setShowWarningModal: (show: boolean) => void;
}

const ContentWarning = ({id, warnings, setHasAgreedToWarnings, setShowWarningModal} : ContentWarningProps) => {

    const navigate = useNavigate();
    const handleAgreeToWarnings = () => {
        if (!id) return;

        const agreedStories = JSON.parse(localStorage.getItem('agreedWarnings') || '{}');
        agreedStories[id] = true;
        localStorage.setItem('agreedWarnings', JSON.stringify(agreedStories));

        setHasAgreedToWarnings(true);
        setShowWarningModal(false);
    };

    const handleDisagreeToWarnings = () => {
        navigate('/');
    };

    const getWarningLevelIcon = (level: string) => {
        switch (level) {
            case 'mild':
            case 'moderate':
                return <FontAwesomeIcon icon={faExclamationTriangle} className="text-yellow-500" />;
            case 'graphic':
            case 'extreme':
                return <FontAwesomeIcon icon={faExclamationTriangle} className="text-white" />;
            default:
                return <FontAwesomeIcon icon={faExclamationTriangle} className="text-gray-500" />;
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 max-w-2xl w-full shadow-2xl border-2 border-red-200 dark:border-red-900">
                <div className="text-center mb-8">
                    <div className="w-20 h-20 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-6">
                        <FontAwesomeIcon
                            icon={faExclamationTriangle}
                            className="text-red-500 dark:text-red-400 text-3xl"
                        />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4 font-serif">
                        Content Warnings And Terms
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 font-sans text-lg">
                        This story contains content that requires your acknowledgment before reading.
                    </p>
                </div>

                <div className="mb-8">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4 font-sans">
                        Content Warnings:
                    </h3>
                    <div className="space-y-3 mb-6">
                        {warnings && warnings.map((warning, index) => (
                            <div
                                key={index}
                                className={`flex items-center gap-3 p-4 rounded-xl ${getWarningLevelColor(warning.level)}`}
                            >
                                {getWarningLevelIcon(warning.level)}
                                <div>
                                    <span className="font-semibold capitalize">{warning.type}</span>
                                    <span className="ml-2 text-sm opacity-80 capitalize">({warning.level})</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-4 mb-8">
                    <div className="flex items-start gap-3">
                        <FontAwesomeIcon
                            icon={faShieldAlt}
                            className="text-yellow-500 mt-1 flex-shrink-0"
                        />
                        <div>
                            <p className="text-yellow-800 dark:text-yellow-200 text-sm font-semibold mb-1">
                                Important Acknowledgement
                            </p>
                            <p className="text-yellow-700 dark:text-yellow-300 text-sm">
                                <b>By proceeding, you acknowledge that this is a work of fiction</b>.
                                <br/>
                                <br/>
                                The views expressed
                                within are part of the story and do not represent the beliefs or opinions of the
                                author. You agree to engage with this content responsibly and solely for the purpose
                                of entertainment.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        onClick={handleDisagreeToWarnings}
                        className="flex-1 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600
                                     text-gray-800 dark:text-gray-200 font-semibold py-4 px-6 rounded-xl
                                     transition-all duration-300 font-sans flex items-center justify-center gap-2"
                    >
                        <FontAwesomeIcon icon={faEyeSlash} />
                        I Disagree, Go Back
                    </button>
                    <button
                        onClick={handleAgreeToWarnings}
                        className="flex-1 bg-gradient-to-r from-red-500 to-red-600
                                     hover:from-red-600 hover:to-red-700
                                     text-white font-semibold py-4 px-6 rounded-xl
                                     transition-all duration-300 shadow-md hover:shadow-xl
                                     transform hover:-translate-y-1 font-sans flex items-center justify-center gap-2"
                    >
                        <FontAwesomeIcon icon={faEye} />
                        I Understand & Agree to Terms
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ContentWarning;