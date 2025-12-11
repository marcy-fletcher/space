import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { IdeaService } from "../services/ideas.ts";
import {useDebugLog} from "../hooks/useDebugLog.ts";

const SubmitIdeaPage: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ nickname: '', idea: '', includeNickname: false });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const { debugPageLoad } = useDebugLog();

    const IDEA_CHARACTER_LIMIT = 2000;
    const isIdeaValid = formData.idea.trim() && formData.idea.length <= IDEA_CHARACTER_LIMIT;

    useEffect(() => {
        debugPageLoad('submit_idea')
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isIdeaValid) return;

        setIsSubmitting(true);
        try {
            const result = await IdeaService.submitIdea({
                nickname: formData.nickname,
                idea: formData.idea,
                include_nickname: formData.includeNickname
            });

            if (!result) throw Error();

            setSubmitStatus('success');
            setFormData({ nickname: '', idea: '', includeNickname: false });
            setTimeout(() => setSubmitStatus('idle'), 3000);
        } catch {
            setSubmitStatus('error');
            setTimeout(() => setSubmitStatus('idle'), 3000);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;

        if (name === 'idea' && value.length > IDEA_CHARACTER_LIMIT) return;

        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
        }));
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-8 px-4">
            <div className="max-w-lg mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 bg-white dark:bg-gray-800 rounded-full px-4 py-2 shadow-sm border border-gray-200 dark:border-gray-700 mb-4">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            No account required
                        </span>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        Share Your Idea
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                        Creative ideas welcome. No commissions, but I'd love to consider writing yours.
                    </p>
                </div>

                {/* Status Alert */}
                {submitStatus !== 'idle' && (
                    <div className={`p-3 rounded-lg mb-6 border ${
                        submitStatus === 'success'
                            ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-700 dark:text-green-300'
                            : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-700 dark:text-red-300'
                    }`}>
                        {submitStatus === 'success' ? '✅ Idea submitted successfully!' : '❌ Failed to submit idea. Please try again.'}
                    </div>
                )}

                {/* Form Card */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Nickname Field */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Nickname <span className="text-gray-400 text-xs">(optional)</span>
                            </label>
                            <input
                                type="text"
                                name="nickname"
                                value={formData.nickname}
                                onChange={handleChange}
                                placeholder="How should we credit you?"
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-transparent text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            />
                        </div>

                        {/* Author Toggle */}
                        <label className="flex items-center gap-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors cursor-pointer">
                            <input
                                type="checkbox"
                                name="includeNickname"
                                checked={formData.includeNickname}
                                onChange={handleChange}
                                className="w-4 h-4 text-blue-600 bg-gray-100 dark:bg-gray-700 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <span className="text-sm text-gray-700 dark:text-gray-300">
                                Feature me as author if selected
                            </span>
                        </label>

                        {/* Idea Field */}
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Your Idea *
                                </label>
                                <span className={`text-xs ${
                                    formData.idea.length > IDEA_CHARACTER_LIMIT ? 'text-red-500' : 'text-gray-500'
                                }`}>
                                    {formData.idea.length}/{IDEA_CHARACTER_LIMIT}
                                </span>
                            </div>
                            <textarea
                                name="idea"
                                value={formData.idea}
                                onChange={handleChange}
                                required
                                rows={5}
                                placeholder="Describe your story idea in detail... (character dynamics, settings, scenarios)"
                                className={`w-full px-3 py-2 border rounded-lg bg-transparent text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none ${
                                    formData.idea.length > IDEA_CHARACTER_LIMIT
                                        ? 'border-red-300 dark:border-red-500'
                                        : 'border-gray-300 dark:border-gray-600'
                                }`}
                            />
                        </div>

                        {/* Tips */}
                        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
                            <p className="text-xs text-blue-700 dark:text-blue-300">
                                💡 <strong>Tip:</strong> Include character dynamics, settings, or specific scenarios for better context.
                            </p>
                        </div>

                        {/* Note */}
                        <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
                            <p>I welcome any ideas but don't commit to writing them. Your idea may or may not appeal to me.</p>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3 pt-2">
                            <button
                                type="button"
                                onClick={() => navigate('/')}
                                className="flex-1 py-2.5 px-4 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors font-medium"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting || !isIdeaValid}
                                className="flex-1 py-2.5 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-lg transition-all font-medium flex items-center justify-center gap-2"
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        Submitting...
                                    </>
                                ) : (
                                    'Submit Idea'
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SubmitIdeaPage;