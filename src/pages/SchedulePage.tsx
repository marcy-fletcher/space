import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCalendar,
    faCheckCircle,
    faPlayCircle,
    faBook,
    faGlobe,
    faCrown,
    faArrowLeft,
    faExternalLinkAlt,
    faStar
} from '@fortawesome/free-solid-svg-icons';
import { faDeviantart } from '@fortawesome/free-brands-svg-icons';
import { WritingProject } from "../types/schedule.ts";
import { ScheduleService } from '../services/schedule';
import LoadingSpinner from '../components/story/LoadingSpinner.tsx';
import ErrorState from '../components/story/ErrorState.tsx';
import {useDebugLog} from "../hooks/useDebugLog.ts";

const SchedulePage: React.FC = () => {
    const [projects, setProjects] = useState<WritingProject[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const { debugLog } = useDebugLog();

    useEffect(() => {
        const loadProjects = async () => {
            try {
                setLoading(true);
                setError(null);

                const projectsData = await ScheduleService.getWritingProjects();
                setProjects(projectsData);

                debugLog('load_schedule');
            } catch (err) {
                console.error('Error loading writing projects:', err);
                setError('Failed to load writing schedule. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        loadProjects();
    }, []);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const getStatusConfig = (status: WritingProject['status']) => {
        switch (status) {
            case 'planned':
                return {
                    icon: faBook,
                    text: 'Planned',
                    class: 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300',
                    iconClass: 'text-gray-500'
                };
            case 'started':
                return {
                    icon: faPlayCircle,
                    text: 'In Progress',
                    class: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
                    iconClass: 'text-blue-500'
                };
            case 'completed':
                return {
                    icon: faCheckCircle,
                    text: 'Completed',
                    class: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300',
                    iconClass: 'text-green-500'
                };
            default:
                return {
                    icon: faBook,
                    text: 'Planned',
                    class: 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300',
                    iconClass: 'text-gray-500'
                };
        }
    };

    const getTierConfig = (tierId: string) => {
        switch (tierId) {
            case 'the-acolyte':
                return {
                    class: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-700 hover:bg-blue-200 dark:hover:bg-blue-800/50 transition-colors duration-300',
                    iconClass: 'text-blue-500'
                };
            case 'the-high-priest':
                return {
                    class: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-700 hover:bg-amber-200 dark:hover:bg-amber-800/50 transition-colors duration-300',
                    iconClass: 'text-amber-500'
                };
            case 'the-cult-leader':
                return {
                    class: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border-red-200 dark:border-red-700 hover:bg-red-200 dark:hover:bg-red-800/50 transition-colors duration-300',
                    iconClass: 'text-red-500'
                };
            default:
                return {
                    class: 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600',
                    iconClass: 'text-gray-500'
                };
        }
    };

    const isWebsiteExclusive = (project: WritingProject) => {
        return project.platforms.includes('website') &&
            project.platforms.length === 1 &&
            !project.platforms.includes('deviantart');
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return <ErrorState error={error} isStoryUnavailable={false} />;
    }

    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl min-h-screen">
            <div className="mb-8">
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400
                     hover:text-primary-700 dark:hover:text-primary-300
                     font-medium transition-colors duration-300 group font-sans"
                >
                    <FontAwesomeIcon
                        icon={faArrowLeft}
                        className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300"
                    />
                    Back to all stories
                </Link>
            </div>

            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-100 font-serif mb-4">
                    Writing Schedule
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-400 font-sans max-w-2xl mx-auto">
                    All stories sorted by planned publication date
                </p>
            </div>

            <div className="space-y-6">
                {projects.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border-2 border-gray-100 dark:border-gray-700">
                            <FontAwesomeIcon
                                icon={faBook}
                                className="w-12 h-12 text-gray-400 dark:text-gray-500 mb-4"
                            />
                            <h3 className="text-xl font-bold text-gray-600 dark:text-gray-400 font-serif mb-2">
                                No projects found
                            </h3>
                            <p className="text-gray-500 dark:text-gray-500 font-sans">
                                There are no writing projects in the schedule yet.
                            </p>
                        </div>
                    </div>
                ) : (
                    projects.map((project) => {
                        const statusConfig = getStatusConfig(project.status);
                        const tierConfig = getTierConfig(project.subscription.requiredTierId);
                        const websiteExclusive = isWebsiteExclusive(project);
                        const isFreeTier = project.subscription.requiredTierLevel === 0;

                        return (
                            <div
                                key={project.id}
                                className={`bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border-2 hover:shadow-xl transition-all duration-300 ${
                                    websiteExclusive
                                        ? 'border-primary-300 dark:border-primary-600 bg-gradient-to-r from-white to-primary-50 dark:from-gray-800 dark:to-primary-900/20 relative overflow-hidden'
                                        : 'border-gray-100 dark:border-gray-700'
                                }`}
                            >

                                {websiteExclusive && (
                                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary-400 rounded-full blur-sm animate-pulse"></div>
                                )}

                                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                                    <div className="flex-1">
                                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                                            <div className="flex items-center gap-3">
                                                <h3 className={`text-xl font-bold font-serif ${
                                                    websiteExclusive
                                                        ? 'text-primary-700 dark:text-primary-300'
                                                        : 'text-gray-800 dark:text-gray-100'
                                                }`}>
                                                    {project.title}
                                                </h3>
                                            </div>

                                            <div className="flex flex-wrap gap-2">
                                                {websiteExclusive && (
                                                    <div className="lg:hidden flex items-center gap-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                                                        <FontAwesomeIcon icon={faStar} className="w-3 h-3" />
                                                        <span>Exclusive</span>
                                                    </div>
                                                )}

                                                {isFreeTier ? (
                                                    <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium border ${tierConfig.class}`}>
                                                        {project.subscription.requiredTierLevel !== 0 && <FontAwesomeIcon icon={faCrown}
                                                                                                                          className={`w-3 h-3 ${tierConfig.iconClass}`}/>}
                                                        <span>{project.subscription.requiredTierTitle}</span>
                                                    </div>
                                                ) : (
                                                    <Link
                                                        to="/upgrade"
                                                        className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium border ${tierConfig.class} cursor-pointer`}
                                                    >
                                                        <FontAwesomeIcon icon={faCrown} className={`w-3 h-3 ${tierConfig.iconClass}`}/>
                                                        <span>{project.subscription.requiredTierTitle}</span>
                                                    </Link>
                                                )}
                                            </div>
                                        </div>

                                        {project.description && (
                                            <p className={`font-sans mb-4 ${
                                                websiteExclusive
                                                    ? 'text-primary-600 dark:text-primary-400'
                                                    : 'text-gray-600 dark:text-gray-400'
                                            }`}>
                                                {project.description}
                                            </p>
                                        )}

                                        <div className="flex flex-wrap items-center gap-3">
                                            <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${statusConfig.class}`}>
                                                <FontAwesomeIcon icon={statusConfig.icon} className={`w-3 h-3 ${statusConfig.iconClass}`} />
                                                <span>{statusConfig.text}</span>
                                            </div>

                                            <div className="flex gap-2">
                                                {project.platforms.includes('website') && (
                                                    <div className={`flex items-center gap-1 p-2 rounded-lg text-xs font-medium min-w-[80px] justify-center border ${
                                                        websiteExclusive
                                                            ? 'bg-primary-200 dark:bg-primary-800 text-primary-800 dark:text-primary-200 border-primary-300 dark:border-primary-600 font-semibold shadow-sm'
                                                            : 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 border-primary-200 dark:border-primary-700'
                                                    }`}>
                                                        <FontAwesomeIcon
                                                            icon={websiteExclusive ? faStar : faGlobe}
                                                            className={`w-3 h-3 ${websiteExclusive ? 'text-primary-600 dark:text-primary-400' : ''}`}
                                                        />
                                                        <span>Website{websiteExclusive ? ' Only' : ''}</span>
                                                    </div>
                                                )}
                                                {project.platforms.includes('deviantart') && (
                                                    <div className="flex items-center gap-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 p-2 rounded-lg text-xs font-medium min-w-[80px] justify-center border border-orange-200 dark:border-orange-700">
                                                        <FontAwesomeIcon icon={faDeviantart} className="w-3 h-3" />
                                                        <span>DeviantArt</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap gap-3 mt-4 text-sm font-sans">
                                            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg ${
                                                websiteExclusive
                                                    ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                                                    : 'bg-gray-50 dark:bg-gray-700/50 text-gray-600 dark:text-gray-400'
                                            }`}>
                                                <FontAwesomeIcon
                                                    icon={faCalendar}
                                                    className={`w-3 h-3 ${
                                                        websiteExclusive ? 'text-primary-500' : 'text-blue-500'
                                                    }`}
                                                />
                                                <span>Planned: {formatDate(project.plannedDate)}</span>
                                            </div>

                                            {project.startDate && (
                                                <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-700/50 px-3 py-1.5 rounded-lg text-gray-600 dark:text-gray-400">
                                                    <FontAwesomeIcon icon={faPlayCircle} className="w-3 h-3 text-green-500" />
                                                    <span>Started: {formatDate(project.startDate)}</span>
                                                </div>
                                            )}

                                            {project.completedDate && (
                                                <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-700/50 px-3 py-1.5 rounded-lg text-gray-600 dark:text-gray-400">
                                                    <FontAwesomeIcon icon={faCheckCircle} className="w-3 h-3 text-green-500" />
                                                    <span>Completed: {formatDate(project.completedDate)}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {project.status === 'completed' && (
                                        <div className="flex flex-col gap-2 min-w-[120px]">
                                            {project.platforms.includes('website') && project.completedLinks?.website && (
                                                <Link
                                                    to={project.completedLinks.website}
                                                    className={`flex items-center gap-2 font-medium py-2 px-3 rounded-lg transition-colors duration-300 text-sm justify-center ${
                                                        websiteExclusive
                                                            ? 'bg-primary-500 hover:bg-primary-600 text-white shadow-md hover:shadow-lg'
                                                            : 'bg-primary-500 hover:bg-primary-600 text-white'
                                                    }`}
                                                >
                                                    <FontAwesomeIcon icon={websiteExclusive ? faStar : faBook} className="w-3 h-3" />
                                                    <span>Read</span>
                                                </Link>
                                            )}
                                            {project.platforms.includes('deviantart') && project.completedLinks?.deviantart && (
                                                <a
                                                    href={project.completedLinks.deviantart}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-3 rounded-lg transition-colors duration-300 text-sm justify-center"
                                                >
                                                    <FontAwesomeIcon icon={faExternalLinkAlt} className="w-3 h-3" />
                                                    <span>View on DA</span>
                                                </a>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            <div className="text-center mt-12">
                <Link
                    to="/"
                    className="bg-gradient-to-r from-primary-500 to-primary-600
                     hover:from-primary-600 hover:to-primary-700
                     text-white font-semibold py-3 px-8 rounded-xl
                     transition-all duration-300 shadow-md hover:shadow-xl
                     transform hover:-translate-y-1 font-sans
                     inline-flex items-center gap-2"
                >
                    <FontAwesomeIcon icon={faArrowLeft} className="w-4 h-4" />
                    Back to Stories
                </Link>
            </div>
        </div>
    );
};

export default SchedulePage;