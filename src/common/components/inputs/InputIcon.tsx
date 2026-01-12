import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {cn} from "../../../utils/cn.ts";
import type {IconDefinition} from "@fortawesome/fontawesome-common-types";

interface InputIconProps {
    icon: IconDefinition;
    hasError?: boolean;
}

const InputIcon = ({icon, hasError}:InputIconProps) => {
    return (
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FontAwesomeIcon icon={icon} className={cn("w-4 h-4 text-mono-400", hasError ? "text-red-600 dark:text-red-400" : "")} />
        </div>
    );
};

export default InputIcon;