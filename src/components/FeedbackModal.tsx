import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faPaperPlane, faBug, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import {BugReportService} from "../services/bugReport.ts";

interface FeedbackModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const FeedbackModal: React.FC<FeedbackModalProps> = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        subject: '',
        message: '',
        email: '',
        includeTechnicalInfo: true
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            const result = await BugReportService.submitBugReport(formData);

            if (result.success) {
                setIsSubmitted(true);
                setTimeout(() => {
                    resetForm();
                    onClose();
                }, 2000);
            } else {
                setError(result.error || 'Failed to submit bug report');
            }
        } catch (error) {
            console.error('Error submitting bug report:', error);
            setError('An unexpected error occurred');
        } finally {
            setIsSubmitting(false);
        }
    };

    const resetForm = () => {
        setFormData({
            subject: '',
            message: '',
            email: '',
            includeTechnicalInfo: true
        });
        setIsSubmitted(false);
        setError(null);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
        }));
    };

    const handleClose = () => {
        resetForm();
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-md">
                <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-2">
                        <FontAwesomeIcon icon={faBug} className="w-4 h-4 text-red-500" />
                        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                            {isSubmitted ? 'Thank You!' : 'Report a Bug'}
                        </h2>
                    </div>
                    <button
                        onClick={handleClose}
                        className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                    >
                        <FontAwesomeIcon icon={faTimes} className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    </button>
                </div>

                {isSubmitted ? (
                    <div className="p-4 text-center">
                        <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
                            <FontAwesomeIcon icon={faPaperPlane} className="w-5 h-5 text-green-600 dark:text-green-400" />
                        </div>
                        <h3 className="font-medium text-gray-800 dark:text-gray-100 mb-1">
                            Bug Report Sent!
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Thank you for helping improve the site.
                        </p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="p-4 space-y-3">
                        {/* Technical feedback notice */}
                        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-3">
                            <div className="flex items-start gap-2">
                                <FontAwesomeIcon
                                    icon={faExclamationTriangle}
                                    className="w-3 h-3 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0"
                                />
                                <div className="text-xs text-amber-800 dark:text-amber-200">
                                    <p className="font-medium mb-1">Technical Issues Only</p>
                                    <p>
                                        For bug reports and technical issues only. Story ideas should go to the
                                        <span className="font-semibold"> 'Submit Idea' </span>
                                        section.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {error && (
                            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
                                <p className="text-xs text-red-800 dark:text-red-200">
                                    {error}
                                </p>
                            </div>
                        )}

                        <div>
                            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                What's the issue? *
                            </label>
                            <input
                                type="text"
                                id="subject"
                                name="subject"
                                required
                                value={formData.subject}
                                onChange={handleChange}
                                className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded focus:ring-1 focus:ring-pink-500 focus:border-pink-500 dark:bg-gray-700 dark:text-white"
                                placeholder="Brief description of the bug..."
                            />
                        </div>

                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Steps to reproduce *
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                required
                                rows={3}
                                value={formData.message}
                                onChange={handleChange}
                                className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded focus:ring-1 focus:ring-pink-500 focus:border-pink-500 dark:bg-gray-700 dark:text-white resize-vertical"
                                placeholder="Please describe exactly what happened and how to reproduce the issue..."
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Email (optional)
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded focus:ring-1 focus:ring-pink-500 focus:border-pink-500 dark:bg-gray-700 dark:text-white"
                                placeholder="your@email.com (for follow-up)"
                            />
                        </div>

                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="includeTechnicalInfo"
                                name="includeTechnicalInfo"
                                checked={formData.includeTechnicalInfo}
                                onChange={handleChange}
                                className="w-3 h-3 text-pink-600 border-gray-300 rounded focus:ring-pink-500"
                            />
                            <label htmlFor="includeTechnicalInfo" className="ml-2 text-xs text-gray-700 dark:text-gray-300">
                                Include browser & page info to help debug
                            </label>
                        </div>

                        <div className="flex gap-2 pt-1">
                            <button
                                type="button"
                                onClick={handleClose}
                                className="flex-1 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors font-medium"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="flex-1 px-3 py-2 text-sm bg-red-500 hover:bg-red-600 text-white rounded transition-colors disabled:opacity-50 font-medium flex items-center justify-center gap-1"
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        <FontAwesomeIcon icon={faBug} className="w-3 h-3" />
                                        Report Bug
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default FeedbackModal;