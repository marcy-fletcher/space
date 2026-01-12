import {formatDateTime} from "../../../utils/formatDate.ts";
import {cn} from "../../../utils/cn.ts";

interface InviteUsedAtProps {
    usedAt: string;
    className?: string;
}

const InviteItemUsedAt = ({usedAt, className} : InviteUsedAtProps) => {
    const usedAtDate = usedAt ? formatDateTime(usedAt) : null;
    return (
        <div className={cn("flex flex-col justify-center", className)}>
            {usedAtDate ? (
                <>
                    <div className="text-sm">{usedAtDate.date}</div>
                    <div className="text-xs text-gray-500">{usedAtDate.time}</div>
                </>
            ) : (
                <div className="text-gray-500">—</div>
            )}
        </div>
    );
};

export default InviteItemUsedAt;