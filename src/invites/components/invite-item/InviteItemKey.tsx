import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faKey} from "@fortawesome/free-solid-svg-icons";
import {cn} from "../../../utils/cn.ts";

interface InviteItemKeyProps {
    code: string;
    className?: string;
}

const InviteItemKey = ({code, className}: InviteItemKeyProps) => {
    return (
        <div className={cn("flex items-center", className)}>
            <div
                className="flex items-center justify-center rounded-lg min-w-10 w-10 h-10 bg-gray-200 dark:bg-gray-700 shrink-0">
                <FontAwesomeIcon icon={faKey}/>
            </div>
            <div className="flex flex-col min-w-0">
                <div className="text-base font-medium truncate">{code}</div>
                <div className="text-xs text-gray-500">Click copy to use</div>
            </div>
        </div>
    );
};

export default InviteItemKey;