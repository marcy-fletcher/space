import type {IconDefinition} from "@fortawesome/fontawesome-common-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {cn} from "../../../utils/cn.ts";

interface RoundIconProps {
    color?: 'primary' | 'green';
    icon: IconDefinition;
}

const getClasses = (color: 'primary' | 'green') => {
    if (color === 'primary') {
        return "bg-gradient-to-br from-primary-300 to-primary-500 dark:from-primary-600 dark:to-primary-800";
    } else {
        return "bg-gradient-to-br from-green-300 to-green-500 dark:from-green-600 dark:to-green-800";
    }
}

const RoundIcon = ({icon, color = 'primary'}: RoundIconProps) => {
    return (
        <div className={cn(`w-24 h-24 rounded-full flex items-center justify-center shadow-xl`, getClasses(color))}>
            <FontAwesomeIcon
                icon={icon}
                className="w-8 h-8 text-white dark:text-mono-100"
            />
        </div>
    );
};

export default RoundIcon;