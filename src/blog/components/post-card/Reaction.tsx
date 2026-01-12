import type {ReactionType} from "../../types/reaction.ts";
import {faThumbsUp, faThumbsDown, faFire, faStar} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

interface ReactionProps {
    type: ReactionType;
    count: number;
}

const getIcon = (type: ReactionType) => {
    if (type === 'like') {
        return faThumbsUp;
    } else if (type === "dislike") {
        return faThumbsDown;
    } else if (type === "hot") {
        return faFire;
    } else {
        return faStar;
    }
}

const getColor = (type: ReactionType) => {
    if (type === 'like') {
        return "text-green-500";
    } else if (type === 'dislike') {
        return "text-red-500";
    } else if (type === 'hot') {
        return "text-orange-500";
    } else {
        return "text-purple-500";
    }
}

const Reaction = ({type, count}: ReactionProps) => {
    return (
        <div className="flex items-center gap-2 group">
            <div className="relative">
                <FontAwesomeIcon
                    icon={getIcon(type)}
                    className={getColor(type)}
                    size="sm"
                />
            </div>
            <span className="text-sm font-medium text-mono-700 dark:text-mono-300 min-w-5">
                {count}
            </span>
        </div>
    );
};

export default Reaction;