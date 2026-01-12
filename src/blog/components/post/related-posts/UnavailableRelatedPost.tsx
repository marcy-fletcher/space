import type {RelatedPost} from "../../../types/post.ts";
import Card from "../../../../layout/Card.tsx";
import Header from "../../../../common/components/Header.tsx";
import Subtitle from "../../../../common/components/Subtitle.tsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowUp, faCrown, faLock, faSpinner, faUserPlus} from "@fortawesome/free-solid-svg-icons";
import Badge from "../../../../common/components/Badge.tsx";
import Button from "../../../../common/components/Button.tsx";
import {formatDate} from "../../../../utils/formatDate.ts";
import {
    getSubscriptionByRoleKey
} from "../../../../auth/types/subscription.ts";
import {cn} from "../../../../utils/cn.ts";
import {useNavigate} from "react-router-dom";
import {useState} from "react";

interface UnavailableRelatedPostProps {
    relatedPost: RelatedPost
}

type Variant = 'primary' | 'green';

const getColor = (variant: Variant) => {
    if (variant === 'green') {
        return 'hover:border-green-600 hover:dark:border-green-600 bg-gradient-to-br from-green-200 to-green-100 dark:from-green-900 dark:to-mono-800';
    } else {
        return 'hover:border-primary-600 hover:dark:border-primary-600 bg-gradient-to-br from-primary-100/30 to-primary-200/30 dark:from-primary-900/30 dark:to-mono-900/50';
    }
}

const UnavailableRelatedPost = ({relatedPost}: UnavailableRelatedPostProps) => {

    const [isClicked, setIsClicked] = useState(false);
    const navigate = useNavigate();
    const maxRankRole = relatedPost.requiredRoles
        ?.map(x => ({role: x, rank: getSubscriptionByRoleKey(x)?.rank ?? -1}))
        .sort((a, b) => b.rank - a.rank)[0]?.role ?? 'guest';

    const exclusive = maxRankRole === "acolyte";

    return (
        <Card className={cn("flex flex-col gap-4", getColor(exclusive ? 'green' : 'primary'))}>
            <div className="flex flex-row gap-4 items-center">
                <div
                    className={cn("flex min-w-10 min-h-10 w-10 h-10 rounded-full items-center justify-center",
                        exclusive ? "bg-green-600" : "bg-primary-600")}>
                    <FontAwesomeIcon icon={faLock}/>
                </div>
                <div>
                    <Header>
                        {exclusive ?
                            "Website Exclusive Story" :
                            "Restricted Story"}
                    </Header>
                    <Subtitle>Content locked</Subtitle>
                </div>
            </div>

            <Badge variant={exclusive ? "green" : "gold"} className="flex flex-row gap-2 justify-center text-ssm">
                <FontAwesomeIcon icon={faCrown}/>
                {!exclusive ?
                    `Tier "${getSubscriptionByRoleKey(maxRankRole)?.name}"+` :
                    'Registration Required'
                }
            </Badge>
            <Button shape="square" size="small" variant={exclusive ? "submit" : "primary"}
                    onClick={() => {
                        setIsClicked(true);
                        return exclusive ?
                            navigate("/register") :
                            navigate("/subscriptions");
                    }}
            >
                {!isClicked ?
                    <FontAwesomeIcon icon={exclusive ? faUserPlus : faArrowUp} className="mr-2"/> :
                    <FontAwesomeIcon icon={faSpinner} spin/>}
                {exclusive ? "Sign Up" : "Upgrade to Unlock"}
            </Button>

            <div className="grow"/>

            <div className="flex flex-row justify-between">
                <span className="text-sm text-mono-500">{formatDate(relatedPost.createdAt)}</span>
            </div>
        </Card>
    );
};

export default UnavailableRelatedPost;