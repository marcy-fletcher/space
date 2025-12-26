import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const BackButton: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="mt-6 text-center">
            <button
                onClick={() => navigate('/')}
                className="text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 flex items-center justify-center gap-1"
            >
                <FontAwesomeIcon icon={faArrowLeft} className="w-3 h-3" />
                Back to dashboard
            </button>
        </div>
    );
};

export default BackButton;