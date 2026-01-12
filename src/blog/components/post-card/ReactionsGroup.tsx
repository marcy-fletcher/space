import type {ReactionsSummary} from "../../types/postSummary.ts";
import Reaction from "./Reaction.tsx";
import {ReactionTypes} from "../../types/reaction.ts";
import {cn} from "../../../utils/cn.ts";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faComment, faEye} from "@fortawesome/free-solid-svg-icons";
import {shortStringifyNumber} from "../../../utils/shortStringifyNumber.ts";

interface ReactionsGroupProps {
    reactions: ReactionsSummary;
    viewsCount?: number;
    commentsCount?: number;
    className?: string;
}

const ReactionsGroup = ({viewsCount, commentsCount, reactions, className}: ReactionsGroupProps) => {
    return (
        <div className={cn("mt-4 pt-4 border-t border-mono-200 dark:border-mono-700", className)}>
            <div className="flex items-center justify-between max-w-md mx-auto">
                {(viewsCount !== undefined && !isNaN(viewsCount)) && <div className="text-sm font-medium text-mono-500 min-w-5 flex gap-2 items-center">
                    <FontAwesomeIcon icon={faEye}/>
                    {shortStringifyNumber(viewsCount)}
                </div>}
                <Reaction type={ReactionTypes.like} count={reactions.like}/>
                <Reaction type={ReactionTypes.hot} count={reactions.hot}/>
                <Reaction type={ReactionTypes.sequel_request} count={reactions.sequel_request}/>
                {(commentsCount !== undefined && !isNaN(commentsCount)) && <div className="text-sm font-medium text-mono-500 min-w-5 flex gap-2 items-center">
                    <FontAwesomeIcon icon={faComment}/>
                    {shortStringifyNumber(commentsCount)}
                </div>}
            </div>
        </div>
    );
};

export default ReactionsGroup;