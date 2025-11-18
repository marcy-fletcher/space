import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {IdeaService} from "../services/ideas.ts";

const SubmitIdeaPage: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ nickname: '', idea: '', includeNickname: false });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const IDEA_CHARACTER_LIMIT = 2000;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.idea.length > IDEA_CHARACTER_LIMIT) {
            return;
        }

        setIsSubmitting(true);

        try {

            const result = await IdeaService.submitIdea({
                nickname: formData.nickname,
                idea: formData.idea,
                include_nickname: formData.includeNickname
            });

            if (!result)
                throw Error();

            setSubmitStatus('success');
            setFormData({ nickname: '', idea: '', includeNickname: false });
            setTimeout(() => setSubmitStatus('idle'), 5000);
        } catch {
            setSubmitStatus('error');
            setTimeout(() => setSubmitStatus('idle'), 5000);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;

        if (name === 'idea' && value.length > IDEA_CHARACTER_LIMIT) {
            return;
        }

        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
        }));
    };

    const inputClasses = "w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300";
    const buttonClasses = "flex-1 font-semibold py-4 px-8 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5";

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl min-h-screen">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-100 dark:border-gray-700">
                <header className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">Submit An Idea</h1>
                    <p className="text-gray-600 dark:text-gray-300">
                        Share your creative ideas. I'm not accepting commissions, but I'd love to consider writing your idea.
                    </p>
                </header>

                {submitStatus !== 'idle' && (
                    <div className={`mb-6 p-4 rounded-xl border ${
                        submitStatus === 'success'
                            ? 'bg-green-100 dark:bg-green-900 border-green-400 text-green-700 dark:text-green-300'
                            : 'bg-red-100 dark:bg-red-900 border-red-400 text-red-700 dark:text-red-300'
                    }`}>
                        {submitStatus === 'success' ? 'Thank you! Your idea has been submitted.' : 'Error submitting idea. Please try again.'}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="nickname" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Nickname (Optional)
                            </label>
                            <input
                                type="text"
                                id="nickname"
                                name="nickname"
                                value={formData.nickname}
                                onChange={handleChange}
                                placeholder="Enter nickname for credit"
                                className={inputClasses}
                            />
                        </div>

                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="includeNickname"
                                name="includeNickname"
                                checked={formData.includeNickname}
                                onChange={handleChange}
                                className="w-4 h-4 text-primary-600 bg-gray-100 dark:bg-gray-700 border-gray-300 rounded focus:ring-primary-500"
                            />
                            <label htmlFor="includeNickname" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                                Feature me as author if selected
                            </label>
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label htmlFor="idea" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Your Idea *
                                </label>
                                <span className={`text-sm ${
                                    formData.idea.length > IDEA_CHARACTER_LIMIT
                                        ? 'text-red-500 font-semibold'
                                        : 'text-gray-500 dark:text-gray-400'
                                }`}>
                                    {formData.idea.length} / {IDEA_CHARACTER_LIMIT}
                                </span>
                            </div>
                            <textarea
                                id="idea"
                                name="idea"
                                value={formData.idea}
                                onChange={handleChange}
                                required
                                rows={6}
                                placeholder={`Describe your story idea in detail... (${IDEA_CHARACTER_LIMIT} characters maximum)`}
                                className={`${inputClasses} resize-vertical min-h-[150px] ${
                                    formData.idea.length > IDEA_CHARACTER_LIMIT
                                        ? 'border-red-300 dark:border-red-500 focus:ring-red-500'
                                        : ''
                                }`}
                            />
                            {formData.idea.length > IDEA_CHARACTER_LIMIT && (
                                <p className="mt-2 text-sm text-red-500">
                                    Idea exceeds character limit. Please shorten your idea to {IDEA_CHARACTER_LIMIT} characters.
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
                        <p className="text-sm text-blue-700 dark:text-blue-300">
                            💡 <strong>Tip:</strong> Include character dynamics, settings, or specific scenarios.
                        </p>
                    </div>

                    <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                        <p className="text-sm text-yellow-700 dark:text-yellow-300">
                            <strong>Note:</strong> I welcome any ideas, but I do not commit to writing them. Your idea may appeal to me, or it may not.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 pt-4">
                        <button
                            type="submit"
                            disabled={isSubmitting || !formData.idea.trim() || formData.idea.length > IDEA_CHARACTER_LIMIT}
                            className={`${buttonClasses} bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white disabled:transform-none`}
                        >
                            {isSubmitting ? (
                                <span className="flex items-center justify-center gap-2">
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"/>
                                    Submitting...
                                </span>
                            ) : 'Submit Idea'}
                        </button>

                        <button
                            type="button"
                            onClick={() => navigate('/')}
                            className={`${buttonClasses} bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200`}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SubmitIdeaPage;