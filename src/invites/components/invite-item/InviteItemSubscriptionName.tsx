import {cn} from "../../../utils/cn.ts";

interface InviteItemSubscriptionNameProps {
    name: string;
    className?: string;
}

const InviteItemSubscriptionName = ({name, className}: InviteItemSubscriptionNameProps) => {
    return (
        <div className={cn("flex items-center", className)}>
            <span className="text-sm truncate">{name}</span>
        </div>
    );
};

export default InviteItemSubscriptionName;