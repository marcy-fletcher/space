// pages/InvitesPage.tsx
import React, { useEffect, useState } from 'react';
import { Invite } from '../types/invite';
import {InviteService, UseInviteResult} from '../services/invites';
import InviteHeader from "../components/invites-page/InviteHeader.tsx";
import UseInviteForm from "../components/invites-page/UseInviteForm.tsx"; // Import new component
import ErrorAlert from "../components/invites-page/ErrorAlert.tsx";
import InviteTable from "../components/invites-page/InviteTable.tsx";
import BackButton from "../components/invites-page/BackButton.tsx";

const InvitesPage: React.FC = () => {
    const [invites, setInvites] = useState<Invite[]>([]);
    const [loading, setLoading] = useState(true);
    const [creating, setCreating] = useState(false);
    const [usingInvite, setUsingInvite] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [creationError, setCreationError] = useState<string | null>(null);

    const loadInvites = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await InviteService.getInvites();
            setInvites(data);
        } catch {
            setError('Failed to load invites');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadInvites();
    }, []);

    const handleCreateInvite = async () => {
        setCreating(true);
        setCreationError(null); // Clear any previous error
        try {
            const result = await InviteService.createInvite();
            if (result.success) {
                setInvites(prev => [result.invite!, ...prev]);
            }
            else {
                // Display error with result.message
                setCreationError(result.message || 'Failed to create invite');
            }
        } catch (error) {
            console.error('Failed to create invite:', error);
            setCreationError('An unexpected error occurred while creating invite');
        } finally {
            setCreating(false);
        }
    };

    const handleUseInvite = async (key: string): Promise<UseInviteResult> => {
        setUsingInvite(true);
        try {
            const result = await InviteService.useInvite(key);
            const success = result && !result.error;

            if (success) {
                await loadInvites();
            }
            return result;
        } catch (error) {
            console.error('Failed to use invite:', error);
            return {
                success: false,
                error: true,
                message: 'Internal error'
            }
        } finally {
            setUsingInvite(false);
        }
    };

    const handleExpireInvite = async (key: string) => {
        const success = await InviteService.expireInvite(key);
        if (success) {
            setInvites(prev =>
                prev.map(inv =>
                    inv.key === key
                        ? { ...inv, expiresAt: new Date().toISOString() }
                        : inv
                )
            );
        }
    };

    const copyToClipboard = async (key: string) => {
        await navigator.clipboard.writeText(key);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-8 px-4">
            <div className="max-w-4xl mx-auto">
                <InviteHeader creating={creating} onCreate={handleCreateInvite} />

                {/* Display creation error if it exists */}
                {creationError && (
                    <div className="mb-6">
                        <ErrorAlert message={creationError} />
                    </div>
                )}

                {/* New Use Invite Form Section */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">
                        Use Invite Key
                    </h2>
                    <UseInviteForm
                        onUseInvite={handleUseInvite}
                        disabled={usingInvite}
                    />
                </div>

                {/* Existing Invites Table Section */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">
                        Manage Invites
                    </h2>

                    {error && <ErrorAlert message={error} />}

                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                        <InviteTable
                            invites={invites}
                            loading={loading}
                            onCopy={copyToClipboard}
                            onExpire={handleExpireInvite}
                        />
                    </div>
                </div>

                <BackButton />
            </div>
        </div>
    );
};

export default InvitesPage;