import Badge from "../../../common/components/Badge.tsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheckCircle, faEnvelope} from "@fortawesome/free-solid-svg-icons";
import {cn} from "../../../utils/cn.ts";

interface InviteItemUsageProps {
    used: boolean;
    className?: string;
}

const InviteItemUsage = ({used, className}: InviteItemUsageProps) => {
    return (
        <Badge variant={used ? "green" : "gray"} className={cn("flex items-center gap-1", className)}>
            <FontAwesomeIcon
                icon={used ? faCheckCircle : faEnvelope}/>
            {used ? "Used" : "Available"}
        </Badge>
    )
};

export default InviteItemUsage;