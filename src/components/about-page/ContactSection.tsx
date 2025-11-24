import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPalette, faComment, faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";

interface ContactSectionProps {
    mobile?: boolean;
}

const ContactSection: React.FC<ContactSectionProps> = ({ mobile = false }) => {
    const containerClass = mobile ? "mb-6" : "bg-gray-50 dark:bg-gray-800 rounded-2xl p-6";
    const iconSize = mobile ? "w-6 h-6" : "w-8 h-8";
    const titleSize = mobile ? "text-lg" : "text-xl";

    return (
        <section className={containerClass}>
            <div className="flex items-center gap-3 mb-4">
                <div className={`${iconSize} bg-red-500 rounded flex items-center justify-center`}>
                    <FontAwesomeIcon icon={faEnvelope} className="text-white text-xs" />
                </div>
                <h3 className={`${titleSize} font-bold text-gray-900 dark:text-white`}>
                    Find Me
                </h3>
            </div>

            <div className="space-y-3">
                <a
                    href="https://www.deviantart.com/marcyfletcher"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 hover:border-red-300 transition-colors"
                >
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-pink-500 rounded-lg flex items-center justify-center">
                            <FontAwesomeIcon icon={faPalette} className="text-white" />
                        </div>
                        <div>
                            <p className="font-semibold text-gray-900 dark:text-white">DeviantArt</p>
                            <p className="text-gray-500 dark:text-gray-400 text-sm">@marcyfletcher</p>
                        </div>
                    </div>
                    <FontAwesomeIcon icon={faExternalLinkAlt} className="text-gray-400 text-sm" />
                </a>

                <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                            <FontAwesomeIcon icon={faComment} className="text-white" />
                        </div>
                        <div>
                            <p className="font-semibold text-gray-900 dark:text-white">Discord</p>
                            <p className="text-gray-500 dark:text-gray-400 text-sm">@masha.fin</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;