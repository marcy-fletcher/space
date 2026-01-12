import Card from "../Card.tsx";
import UserImage from "../../common/components/UserImage.tsx";
import CardProperty from "../../common/components/CardProperty.tsx";
import Divider from "../../common/components/Divider.tsx";
import Button from "../../common/components/Button.tsx";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUserPlus, faRightFromBracket, faPlus} from "@fortawesome/free-solid-svg-icons";
import {useAuth} from "../../auth/hooks/useAuth.ts";
import {useAuthStore} from "../../auth/hooks/useAuthStore.ts";
import {formatDate} from "../../utils/formatDate.ts";
import LinkButton from "../../common/components/LinkButton.tsx";
import {RequirePolicy} from "../../auth/components/RequirePolicy.tsx";
import {auth, policy, role} from "../../auth/policies/policyBuilders.ts";

const UserMenu = () => {
    const {username, picture, user, signOut} = useAuth();
    const {subscription} = useAuthStore();

    return (
        <Card className="absolute right-4 top-18 -mt-2 w-80 p-4">

            <div className="flex items-center gap-3 mb-4">
                <UserImage source={picture ?? undefined} alt="User Image" className="w-10 h-10"/>
                <div className="flex-1 min-w-0">
                    <p className="text-mono-900 dark:text-mono-100 font-medium text-sm truncate">
                        {username}
                    </p>
                    <p className="text-mono-500 dark:text-mono-400 text-xs truncate">
                        {user?.email}
                    </p>
                </div>
            </div>

            <div className="space-y-3">
                <CardProperty title="Account Tier" value={subscription?.name ?? "Who are you?"}/>
                {subscription?.endDate && <CardProperty title="Renews" value={formatDate(subscription.endDate)}/>}
            </div>

            <Divider/>

            <div className="-ml-2 mt-4 p-0 space-y-1">

                <RequirePolicy policy={policy(auth(), role('admin'))}>
                    <LinkButton navigateTo={'/posts/create'} variant="link" size="small" shape="square"
                                className="w-full justify-start">
                    <span className="flex items-center gap-2">
                        <FontAwesomeIcon icon={faPlus} className="w-4"/>
                        Create post
                    </span>
                    </LinkButton>
                </RequirePolicy>

                <LinkButton navigateTo={'/invites'} variant="link" size="small" shape="square"
                        className="w-full justify-start">
                    <span className="flex items-center gap-2">
                        <FontAwesomeIcon icon={faUserPlus} className="w-4"/>
                        Invites
                    </span>
                </LinkButton>

                <Button variant="link" size="small" shape="square" className="w-full justify-start" onClick={signOut}>
                    <span className="flex items-center gap-2">
                        <FontAwesomeIcon icon={faRightFromBracket} className="w-4"/>
                        Sign Out
                    </span>
                </Button>
            </div>
        </Card>
    );
};

export default UserMenu;
