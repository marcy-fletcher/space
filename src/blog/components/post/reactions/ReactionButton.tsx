import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFire, faStar, faThumbsDown, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { cn } from "../../../../utils/cn.ts";
import { useReactionMutation } from "../../../hooks/useReactionMutation.ts";
import type { ReactionType } from "../../../types/reaction.ts";
import { useAuth } from "../../../../auth/hooks/useAuth.ts";

interface ReactionButtonProps {
    postId: number;
    type: ReactionType;
    count?: number;
    disabled?: boolean;
    userReacted?: boolean;
}

function getIcon(type: ReactionType) {
    if (type === 'like') return faThumbsUp;
    if (type === 'dislike') return faThumbsDown;
    if (type === 'hot') return faFire;
    return faStar;
}

function getLabel(type: ReactionType) {
    if (type === "like") return "Like";
    if (type === "dislike") return "Dislike";
    if (type === "hot") return "Hot";
    return "Sequel Request";
}

function getButtonClass(type: ReactionType, userReacted: boolean) {
    if (!userReacted) return "";
    if (type === "like") {
        return "from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 dark:from-blue-400 dark:to-blue-500 dark:hover:from-blue-500 dark:hover:to-blue-600";
    }
    if (type === "dislike") {
        return "from-red-400 to-red-500 hover:from-red-500 hover:to-red-600 dark:from-red-400 dark:to-red-500 dark:hover:from-red-500 dark:hover:to-red-600";
    }
    if (type === "hot") {
        return "from-pink-400 to-pink-500 hover:from-pink-500 hover:to-pink-600 dark:from-pink-400 dark:to-pink-500 dark:hover:from-pink-500 dark:hover:to-pink-600";
    }
    return "from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 dark:from-amber-400 dark:to-amber-500 dark:hover:from-amber-500 dark:hover:to-amber-600";
}

const ReactionButton = ({
                            postId,
                            type,
                            disabled = false,
                            count = 0,
                            userReacted = false
                        }: ReactionButtonProps) => {
    const { mutate, isPending, reset } = useReactionMutation({ postId, type, count, userReacted });

    const handleClick = () => {
        if (isPending) {
            reset();
            return;
        }
        mutate();
    };

    const { isAuthenticated } = useAuth();
    const isActive = isAuthenticated && !disabled;

    const tooltipMessage = "You need to register or log in to react.";

    return (
        <button
            disabled={!isActive}
            onClick={handleClick}
            title={isAuthenticated ? "" : tooltipMessage}
            className={cn(
                `group/btn relative flex items-center gap-2 px-3 py-2
                        rounded-xl font-medium bg-linear-to-r
                        text-mono-700 dark:text-mono-300 shadow-md
                        from-mono-100 to-mono-200 hover:from-mono-200 hover:to-mono-300
                        dark:from-mono-700 dark:to-mono-800 dark:hover:from-mono-600
                        dark:hover:to-mono-700`,
                getButtonClass(type, userReacted && isActive),
                userReacted && isActive ? 'text-mono-50 dark:text-mono-50' : '',
                !isActive && 'opacity-50 cursor-not-allowed bg-mono-300 dark:bg-mono-600 text-mono-500 dark:text-mono-400'
            )}
        >
            <FontAwesomeIcon icon={getIcon(type)} />
            <span className="text-sm font-medium">
                {getLabel(type)}
            </span>
            <span className={cn(`px-1.5 py-0.5 text-xs rounded-full min-w-6 font-semibold bg-mono-300 dark:bg-mono-600 text-mono-700 dark:text-mono-300`, userReacted && isActive
                ? `bg-mono-100 text-mono-800 group-hover/btn:bg-mono-50 dark:bg-mono-100dark:text-mono-800 dark:group-hover/btn:bg-mono-50`
                : ""
            )}>
                {count}
            </span>
        </button>
    );
};

export default ReactionButton;
