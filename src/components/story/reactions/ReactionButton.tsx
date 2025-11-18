import React, {useState} from "react";
import { useAuth } from "../../../contexts/AuthContext.tsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faFire,
    faThumbsUp,
    faThumbsDown,
    faStar
} from "@fortawesome/free-solid-svg-icons";
import AuthPopup from "./AuthPopup.tsx";
import {ReactionType} from "../../../types/reactions.ts";

const reactionConfig = {
    hot: {
        icon: faFire,
        activeGradient: "from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600",
        inactiveGradient: "from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 dark:from-gray-700 dark:to-gray-800 dark:hover:from-gray-600 dark:hover:to-gray-700",
        iconColor: {
            active: "text-rose-100",
            inactive: "text-gray-600 dark:text-gray-400",
            disabled: "text-gray-500 dark:text-gray-400"
        },
        badgeColor: {
            active: "bg-rose-100 text-rose-800 group-hover/btn:bg-rose-50",
            inactive: "bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 group-hover/btn:bg-gray-200 dark:group-hover/btn:bg-gray-500"
        },
        labels: {
            active: "Hot!",
            inactive: "Hot",
            title: {
                active: "Remove hot mark",
                inactive: "Mark as hot",
                guest: "Sign in to mark as hot"
            }
        }
    },
    like: {
        icon: faThumbsUp,
        activeGradient: "from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600",
        inactiveGradient: "from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 dark:from-gray-700 dark:to-gray-800 dark:hover:from-gray-600 dark:hover:to-gray-700",
        iconColor: {
            active: "text-blue-100",
            inactive: "text-gray-600 dark:text-gray-400",
            disabled: "text-gray-500 dark:text-gray-400"
        },
        badgeColor: {
            active: "bg-blue-100 text-blue-800 group-hover/btn:bg-blue-50",
            inactive: "bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 group-hover/btn:bg-gray-200 dark:group-hover/btn:bg-gray-500"
        },
        labels: {
            active: "Liked",
            inactive: "Like",
            title: {
                active: "Remove like",
                inactive: "Like this story",
                guest: "Sign in to like"
            }
        }
    },
    dislike: {
        icon: faThumbsDown,
        activeGradient: "from-red-400 to-red-500 hover:from-red-500 hover:to-red-600",
        inactiveGradient: "from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 dark:from-gray-700 dark:to-gray-800 dark:hover:from-gray-600 dark:hover:to-gray-700",
        iconColor: {
            active: "text-red-100",
            inactive: "text-gray-600 dark:text-gray-400",
            disabled: "text-gray-500 dark:text-gray-400"
        },
        badgeColor: {
            active: "bg-red-100 text-red-800 group-hover/btn:bg-red-50",
            inactive: "bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 group-hover/btn:bg-gray-200 dark:group-hover/btn:bg-gray-500"
        },
        labels: {
            active: "Disliked",
            inactive: "Dislike",
            title: {
                active: "Remove dislike",
                inactive: "Dislike this story",
                guest: "Sign in to dislike"
            }
        }
    },
    sequel_request: {
        icon: faStar,
        activeGradient: "from-amber-400 to-yellow-500 hover:from-amber-500 hover:to-yellow-600",
        inactiveGradient: "from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 dark:from-gray-700 dark:to-gray-800 dark:hover:from-gray-600 dark:hover:to-gray-700",
        iconColor: {
            active: "text-yellow-100",
            inactive: "text-gray-600 dark:text-gray-400",
            disabled: "text-gray-500 dark:text-gray-400"
        },
        badgeColor: {
            active: "bg-yellow-100 text-amber-800 group-hover/btn:bg-yellow-50",
            inactive: "bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 group-hover/btn:bg-gray-200 dark:group-hover/btn:bg-gray-500"
        },
        labels: {
            active: "Sequel Requested",
            inactive: "Request Sequel",
            title: {
                active: "Remove sequel request",
                inactive: "Request sequel",
                guest: "Sign in to request sequel"
            }
        }
    }
};


export interface ReactionButtonProps {
    onClick: () => Promise<void> | void;
    reactionType: ReactionType;
    reactionCount: number;
    userReacted?: boolean;
    loading?: boolean;
}

export const ReactionButton: React.FC<ReactionButtonProps> = ({
                                                                         onClick,
                                                                         reactionCount = 0,
                                                                         userReacted = false,
                                                                         reactionType,
                                                                         loading = false
                                                                     }) => {
    const { user } = useAuth();
    const [showAuthPopup, setShowAuthPopup] = useState(false);

    const config = reactionConfig[reactionType];

    const handleClick = async () => {
        if (!user) {
            setShowAuthPopup(true);
            return;
        }

        if (onClick) {
            await onClick();
        }
    };

    const getTitle = () => {
        if (!user) return config.labels.title.guest;
        return userReacted ? config.labels.title.active : config.labels.title.inactive;
    };

    const getIconColor = () => {
        if (userReacted) return config.iconColor.active;
        return user ? config.iconColor.inactive : config.iconColor.disabled;
    };

    const getButtonClass = () => {
        const baseClass = "group/btn relative flex items-center gap-2 px-3 py-2 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 active:scale-95";
        const loadingClass = loading ? 'opacity-50 cursor-not-allowed' : '';

        if (!user) {
            return `${baseClass} ${config.inactiveGradient} text-gray-700 dark:text-gray-300 shadow-md hover:shadow-lg ${loadingClass}`;
        }

        if (userReacted) {
            return `${baseClass} bg-gradient-to-r ${config.activeGradient} text-white shadow-lg hover:shadow-xl ${loadingClass}`;
        }

        return `${baseClass} bg-gradient-to-r ${config.inactiveGradient} text-gray-700 dark:text-gray-300 shadow-md hover:shadow-lg ${loadingClass}`;
    };

    return (
        <>
            <button
                onClick={handleClick}
                disabled={loading}
                className={getButtonClass()}
                title={getTitle()}
            >
                <FontAwesomeIcon
                    icon={config.icon}
                    className={`w-4 h-4 transition-all duration-300 ${getIconColor()} group-hover/btn:scale-110`}
                />
                <span className="text-sm font-medium">
                    {userReacted ? config.labels.active : config.labels.inactive}
                </span>
                {reactionCount > 0 && (
                    <span className={`px-1.5 py-0.5 text-xs rounded-full min-w-6 font-semibold transition-all duration-300 ${
                        userReacted ? config.badgeColor.active : config.badgeColor.inactive
                    }`}>
                        {reactionCount}
                    </span>
                )}
            </button>
            <AuthPopup
                show={showAuthPopup}
                onClose={() => setShowAuthPopup(false)}
            />
        </>
    );
};