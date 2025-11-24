import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFire } from "@fortawesome/free-solid-svg-icons";

interface ProfileHeaderProps {
    mobile?: boolean;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ mobile = false }) => {
    const imageSize = mobile ? "w-32 h-32" : "w-40 h-40";
    const nameSize = mobile ? "text-2xl" : "text-4xl";
    const taglineSize = mobile ? "text-base" : "text-lg";

    return (
        <div className="text-center mb-16">
            <div className="relative mb-8 max-w-xs mx-auto">
                <div className={`relative ${imageSize} rounded-full overflow-hidden shadow-lg border-2 border-red-200 dark:border-red-800 mx-auto`}>
                    <img
                        src="https://mntdvvnqrwqggrsjulph.supabase.co/storage/v1/object/public/illusrations/marcy_fletcher.webp"
                        alt="Marcy Fletcher"
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>

            <div className="space-y-4">
                <h1 className={`${nameSize} font-bold text-gray-900 dark:text-white font-serif`}>
                    Marcy Fletcher
                </h1>

                <div className="flex flex-col items-center space-y-2">
                    <p className={`${taglineSize} text-gray-600 dark:text-gray-400 font-sans`}>
                        Your Little Devil with a Pen
                    </p>

                    <div className="flex items-center gap-2 bg-red-50 dark:bg-red-900/20 px-3 py-1 rounded-full">
                        <FontAwesomeIcon icon={faFire} className="text-red-500 text-xs" />
                        <span className="text-sm font-medium text-red-700 dark:text-red-300">
                            Explicit & Dark Fiction
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileHeader;