import {cn} from "../../../utils/cn.ts";

interface InviteUsedByProps {
    usedBy: string;
    className?: string;
}

const InviteItemUsedBy = ({usedBy, className}: InviteUsedByProps) => {
    return (
        <div className={cn("flex items-center", className)}>
            {usedBy ? (
                <span className="text-sm truncate">{usedBy}</span>
            ) : (
                <div className="text-gray-500">—</div>
            )}
        </div>
    );
};

export default InviteItemUsedBy;