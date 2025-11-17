import {Post} from "../../types/post.ts";

interface ReferencesSectionProps {
    references: Post['references'];
}
const ReferencesSection = ({references} : ReferencesSectionProps) => {
    if (!references)
        return null;

    const { people, franchise } = references;
    const hasPeople = people && people.length > 0;
    const hasFranchise = franchise && franchise.length > 0;

    if (!hasPeople && !hasFranchise) return null;

    const handleReferenceClick = (url?: string) => {
        if (url) {
            window.open(url, '_blank', 'noopener,noreferrer');
        }
    };

    return (
        <div className="mt-12">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 font-serif">
                    Story References
                </h2>
            </div>

            <div className={`bg-pink-50/80 dark:bg-gray-800/80 rounded-2xl border border-pink-200/50 dark:border-gray-700/50 backdrop-blur-sm overflow-hidden transition-all duration-300 max-h-[2000px] opacity-100'`}>
                <div className="p-6">
                    {hasPeople && (
                        <div className="mb-6 last:mb-0">
                            <h3 className="text-lg font-semibold text-pink-700 dark:text-pink-400 mb-4 font-sans
                                             border-b border-pink-200/50 dark:border-gray-700 pb-2">
                                Characters & People
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {people.map((person, index) => (
                                    <div
                                        key={index}
                                        onClick={() => handleReferenceClick(person.url)}
                                        className={`flex items-center gap-3 bg-white/70 dark:bg-gray-700/70 rounded-xl p-3 
                                                     border border-pink-300/30 dark:border-gray-600/50 shadow-sm 
                                                     transition-all duration-200 min-w-0
                                                     ${person.url ? 'cursor-pointer hover:shadow-md hover:border-pink-400/50 dark:hover:border-pink-500/50 hover:translate-y-[-2px]' : 'cursor-default'}`}
                                    >
                                        {person.picture && (
                                            <img
                                                src={person.picture}
                                                alt={person.name}
                                                className="w-12 h-12 rounded-full object-cover flex-shrink-0 border-2 border-pink-200/50 dark:border-gray-600"
                                            />
                                        )}
                                        <div className="min-w-0 flex-1">
                                            <h4 className="font-medium text-gray-800 dark:text-gray-100 text-sm truncate font-sans">
                                                {person.name}
                                            </h4>
                                            <p className="text-gray-600 dark:text-gray-400 text-xs truncate mt-1">
                                                {person.description}
                                            </p>
                                        </div>
                                        {person.url && (
                                            <svg
                                                className="w-4 h-4 text-pink-500 dark:text-pink-400 flex-shrink-0"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                                />
                                            </svg>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {hasFranchise && (
                        <div className="mt-6">
                            <h3 className="text-lg font-semibold text-pink-700 dark:text-pink-400 mb-4 font-sans
                                             border-b border-pink-200/50 dark:border-gray-700 pb-2">
                                Franchises & Universes
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {franchise.map((franchiseItem, index) => (
                                    <div
                                        key={index}
                                        onClick={() => handleReferenceClick(franchiseItem.url)}
                                        className={`flex items-center gap-3 bg-white/70 dark:bg-gray-700/70 rounded-xl p-3 
                                                     border border-pink-300/30 dark:border-gray-600/50 shadow-sm 
                                                     transition-all duration-200 min-w-0
                                                     ${franchiseItem.url ? 'cursor-pointer hover:shadow-md hover:border-pink-400/50 dark:hover:border-pink-500/50 hover:translate-y-[-2px]' : 'cursor-default'}`}
                                    >
                                        {franchiseItem.picture && (
                                            <img
                                                src={franchiseItem.picture}
                                                alt={franchiseItem.title}
                                                className="w-12 h-12 rounded-lg object-cover flex-shrink-0 border-2 border-pink-200/50 dark:border-gray-600"
                                            />
                                        )}
                                        <div className="min-w-0 flex-1">
                                            <h4 className="font-medium text-gray-800 dark:text-gray-100 text-sm truncate font-sans">
                                                {franchiseItem.title}
                                            </h4>
                                        </div>
                                        {franchiseItem.url && (
                                            <svg
                                                className="w-4 h-4 text-pink-500 dark:text-pink-400 flex-shrink-0"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                                />
                                            </svg>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ReferencesSection;