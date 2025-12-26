import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey, faCheckCircle, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import {UseInviteResult} from "../../services/invites.ts";

interface UseInviteFormProps {
    onUseInvite: (key: string) => Promise<UseInviteResult>;
    disabled?: boolean;
}

const UseInviteForm: React.FC<UseInviteFormProps> = ({ onUseInvite, disabled = false }) => {
    const [inviteKey, setInviteKey] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [result, setResult] = useState<{
        type: 'success' | 'error' | null;
        message: string;
    }>({ type: null, message: '' });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!inviteKey.trim()) {
            setResult({
                type: 'error',
                message: 'Please enter an invite key'
            });
            return;
        }

        setSubmitting(true);
        setResult({ type: null, message: '' });

        try {
            const result = await onUseInvite(inviteKey.trim());
            if (result && !result.error) {
                setResult({
                    type: 'success',
                    message: 'Invite key used successfully!'
                });
                setInviteKey('');
            } else {
                setResult({
                    type: 'error',
                    message: result.message ?? 'Failed to use invite key. It may be invalid, expired, or already used.'
                });
            }
        } catch {
            setResult({
                type: 'error',
                message: 'An error occurred while using the invite key.'
            });
        } finally {
            setSubmitting(false);
        }
    };

    const handlePaste = async () => {
        try {
            const text = await navigator.clipboard.readText();
            setInviteKey(text);
            setResult({ type: null, message: '' });
        } catch {
            setResult({
                type: 'error',
                message: 'Unable to paste from clipboard'
            });
        }
    };

    return (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800 mb-6">
            <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <FontAwesomeIcon
                        icon={faKey}
                        className="w-5 h-5 text-blue-600 dark:text-blue-400"
                    />
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                        Use an Invite Key
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Enter an invite key to register a new account
                    </p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex gap-2">
                    <div className="flex-1">
                        <input
                            type="text"
                            value={inviteKey}
                            onChange={(e) => {
                                setInviteKey(e.target.value);
                                setResult({ type: null, message: '' });
                            }}
                            placeholder="Enter invite key (e.g., 123e4567-e89b-12d3-a456-426614174000)"
                            className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-600 dark:focus:border-blue-600 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-200"
                            disabled={submitting || disabled}
                        />
                    </div>
                    <button
                        type="button"
                        onClick={handlePaste}
                        className="px-4 py-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={submitting || disabled}
                    >
                        Paste
                    </button>
                    <button
                        type="submit"
                        disabled={!inviteKey.trim() || submitting || disabled}
                        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-600"
                    >
                        {submitting ? 'Processing...' : 'Use Key'}
                    </button>
                </div>

                {result.type && (
                    <div className={`flex items-center gap-2 p-3 rounded-lg ${
                        result.type === 'success'
                            ? 'bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300 border border-green-200 dark:border-green-800'
                            : 'bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300 border border-red-200 dark:border-red-800'
                    }`}>
                        <FontAwesomeIcon
                            icon={result.type === 'success' ? faCheckCircle : faExclamationTriangle}
                            className="w-4 h-4"
                        />
                        <span className="text-sm font-medium">{result.message}</span>
                    </div>
                )}

                <div className="text-xs text-gray-500 dark:text-gray-400 pt-2 border-t border-gray-200 dark:border-gray-700">
                    <p>• Invite keys are case-sensitive</p>
                    <p>• Each key can only be used once</p>
                    <p>• Keys expire after their set date</p>
                </div>
            </form>
        </div>
    );
};

export default UseInviteForm;