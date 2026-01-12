import Card from "../../../layout/Card.tsx"
import RoundIcon from "./RoundIcon.tsx";
import {faArrowUp, faPlusCircle, faCalendar, faCrown, faLock} from "@fortawesome/free-solid-svg-icons";
import {cn} from "../../../utils/cn.ts";
import Header from "../../../common/components/Header.tsx";
import Subtitle from "../../../common/components/Subtitle.tsx";
import Badge from "../../../common/components/Badge.tsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {formatDate} from "../../../utils/formatDate.ts";
import ReactionsGroup from "./ReactionsGroup.tsx";
import type {PostSummary} from "../../types/postSummary.ts";
import {useAuth} from "../../../auth/hooks/useAuth.ts";
import type {SubscriptionTier} from "../../../auth/types/subscription.ts";
import LinkButton from "../../../common/components/LinkButton.tsx";

type Variant = 'primary' | 'green';
type ContentType = "exclusive" | "locked";

const getRequirementText = (contentType: ContentType, post: PostSummary): string => {
    if (contentType === 'exclusive') {
        return "Registration Required";
    }

    if (post.subscriptions && post.subscriptions.length > 0) {
        const requiredTier: SubscriptionTier =
            post.subscriptions.reduce((lowest, current) =>
                current.rank < lowest.rank ? current : lowest
            );
        return `Required Subscription Tier: "${requiredTier.name}"`;
    }

    return 'Special Requirement';
}

const getColor = (variant: Variant) => {
    if (variant === 'green') {
        return 'hover:border-green-600 hover:dark:border-green-600 bg-gradient-to-br from-green-200 to-green-100 dark:from-green-900 dark:to-mono-800';
    } else {
        return 'hover:border-primary-600 hover:dark:border-primary-600 bg-gradient-to-br from-primary-100/30 to-primary-200/30 dark:from-primary-900/30 dark:to-mono-900/50';
    }
}

interface UnavailablePostCardProps {
    post: PostSummary
}

const UnavailablePostCard = ({post}: UnavailablePostCardProps) => {
    const {isAuthenticated} = useAuth();

    const contentType =
        post.subscriptions &&
        post.subscriptions.some(subscription => subscription.key === 'acolyte') ?
            'exclusive' :
            'locked';

    const variant: Variant = contentType === 'exclusive' ? 'green' : 'primary';
    const requirement = getRequirementText(contentType, post);

    return (
        <Card className={cn("w-full max-w-lg flex flex-col select-none", getColor(variant))}>
            <div className="flex flex-col items-center justify-center grow space-y-6 mb-8">
                <RoundIcon icon={faLock} color={variant === "primary" ? "primary" : "green"}/>

                <div className="text-center space-y-2">
                    <Header className="text-3xl font-serif">
                        Restricted Content
                    </Header>
                    <Subtitle className="text-base">
                        This content is not publicly available
                    </Subtitle>
                </div>

                <Badge variant={variant === "primary" ? "gold" : "green"}>
                    <FontAwesomeIcon icon={faCrown}/>
                    <span>
                        {requirement}
                    </span>
                </Badge>

                {isAuthenticated && contentType !== 'exclusive' &&
                    <LinkButton
                        navigateTo="subscriptions"
                        variant="primary"
                        shape="square"
                        size="small"
                        className="flex items-center justify-center space-x-2"
                    >
                        <FontAwesomeIcon icon={faArrowUp}/>
                        <span>Upgrade Your Account</span>
                    </LinkButton>
                }

                {!isAuthenticated && contentType === 'exclusive' &&
                    <LinkButton
                        navigateTo="login"
                        variant="submit"
                        shape="square"
                        size="small"
                        className="flex items-center justify-center space-x-2"
                    >
                        <FontAwesomeIcon icon={faPlusCircle}/>
                        <span>Sign Up for Free</span>
                    </LinkButton>
                }

                <Badge variant="gray" className="font-light">
                    <FontAwesomeIcon icon={faCalendar}/>
                    <span className="font-bold">
                        Published: {formatDate(post.createdAt)}
                    </span>
                </Badge>
            </div>

            <ReactionsGroup reactions={post.reactions}/>
        </Card>
    );
};

export default UnavailablePostCard;
