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
import {Post} from "../types/post.ts";

type TransformationTrait = NonNullable<Post['transformations']>[number];

const getTransformationIcon = (type: string) => {
    const typeLower = type.toLowerCase();
    if (typeLower === 'gender') {
        return faVenusMars;
    } else if (typeLower.includes('sexual') || typeLower.includes('orientation')) {
        return faHeart;
    } else if (typeLower.includes('age')) {
        return faBirthdayCake;
    } else if (typeLower.includes('personality') || typeLower.includes('mental')) {
        return faBrain;
    } else if (typeLower.includes('race') || typeLower.includes('species')) {
        return faDragon;
    } else if (typeLower.includes('appearance') || typeLower.includes('body')) {
        return faUserFriends;
    } else {
        return faBars;
    }
};

const capitalizeWords = (text: string): string => {
    return text.split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
};

const getCompactTransformationText = (transformation: TransformationTrait) => {
    const fromText = capitalizeWords(transformation.from);
    const toText = capitalizeWords(transformation.to);
    return `${fromText}→${toText}`;
};

interface TransformationBadgeProps {
    transformation: TransformationTrait
}

const TransformationBadge = (props: TransformationBadgeProps) => {
    return (
        <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary-50 dark:bg-primary-900/30
                                                     text-primary-700 dark:text-primary-300 rounded-lg text-xs border border-primary-200 dark:border-primary-700"
        >
            <FontAwesomeIcon
                icon={getTransformationIcon(props.transformation.type)}
                className="text-xs"
            />
            {getCompactTransformationText(props.transformation)}
        </span>
    );
};

export default TransformationBadge;