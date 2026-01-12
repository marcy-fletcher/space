import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faBars,
    faBirthdayCake,
    faBrain,
    faDragon,
    faHeart,
    faUserFriends,
    faVenusMars
} from "@fortawesome/free-solid-svg-icons";
import type {TransformationType} from "../../types/transformation.ts";
import {capitalizeWords} from "../../../utils/capitalizeWords.ts";
import type {TransformationSummary} from "../../types/postSummary.ts";

const getIcon = (type: TransformationType) => {
    if (type === "gender") {
        return faVenusMars;
    } else if (type === "orientation") {
        return faHeart;
    } else if (type === "age") {
        return faBirthdayCake;
    } else if (type === "personality") {
        return faBrain;
    } else if (type === "race") {
        return faDragon;
    } else if (type === "body") {
        return faUserFriends;
    } else {
        return faBars;
    }
};

const getCompactText = (transformation: TransformationSummary) => {
    const fromText = capitalizeWords(transformation.from);
    const toText = capitalizeWords(transformation.to);
    return `${fromText}→${toText}`;
};

interface TransformationBadgeProps {
    transformation: TransformationSummary
}

const TransformationBadge = ({transformation}: TransformationBadgeProps) => {
    return (
        <span className={`inline-flex items-center gap-1 px-2 py-1 bg-primary-50
                          dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 
                          rounded-lg text-xs border border-primary-200 dark:border-primary-700`}>
            <FontAwesomeIcon
                icon={getIcon(transformation.type)}
                className="text-xs"
            />
            {getCompactText(transformation)}
        </span>
    );
};

export default TransformationBadge;