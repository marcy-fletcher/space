import React, {useEffect} from 'react';
import ProfileHeader from "../components/about-page/ProfileHeader.tsx";
import ContactSection from "../components/about-page/ContactSection.tsx";
import CommissionsSection from "../components/about-page/CommissionsSection.tsx";
import AccountSection from "../components/about-page/AccountSection.tsx";
import LibrarySection from "../components/about-page/LibrarySection.tsx";
import {useDebugLog} from "../hooks/useDebugLog.ts";

const AboutPage: React.FC = () => {
    const { debugPageLoad } = useDebugLog();

    useEffect(() => {
        debugPageLoad('about');
    }, []);

    return (
        <div className="min-h-screen text-gray-800 dark:text-gray-200 transition-colors">
            <div className="hidden lg:block">
                <div className="container mx-auto px-6 py-12 max-w-6xl">
                    <ProfileHeader />

                    <div className="grid grid-cols-3 gap-8">
                        <div className="space-y-8">
                            <ContactSection />
                            <CommissionsSection />
                            <AccountSection />
                        </div>

                        <div className="col-span-2">
                            <LibrarySection />
                        </div>
                    </div>
                </div>
            </div>

            <div className="lg:hidden">
                <div className="container mx-auto px-4 py-8">
                    <ProfileHeader mobile />
                    <ContactSection mobile />
                    <CommissionsSection mobile />
                    <AccountSection mobile />
                    <LibrarySection mobile />
                </div>
            </div>
        </div>
    );
};

export default AboutPage;