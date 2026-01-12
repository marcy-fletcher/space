import type {Explicitness} from "../../types/metadata.ts";
import {cn} from "../../../utils/cn.ts";

type ExplicitAgeRating = Exclude<Explicitness, 'everyone'>;

interface ExplicitnessBadgeProps {
    explicitness: ExplicitAgeRating
    className?: string;
}

function getColor(explicitness: ExplicitAgeRating): string {
    if (explicitness === 'mature') {
        return 'bg-yellow-500 dark:bg-yellow-600'
    } else {
        return 'bg-red-500 dark:bg-red-600';
    }
}

const ExplicitnessBadge = ({explicitness, className} : ExplicitnessBadgeProps) => {
    return (
        <span className={cn(
            `px-3 py-1 text-white rounded-full text-xs font-bold font-sans uppercase tracking-wide shadow-md shrink-0`,
            getColor(explicitness), className)}>
            {explicitness.toUpperCase()}
        </span>
    );
};

export default ExplicitnessBadge;