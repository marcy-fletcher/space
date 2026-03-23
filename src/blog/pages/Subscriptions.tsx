import PageHeader from "../../layout/PageHeader.tsx";
import Card from "../../layout/Card.tsx";
import Header from "../../common/components/Header.tsx";
import Divider from "../../common/components/Divider.tsx";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faLightbulb, faCheckCircle, faCommentDots} from '@fortawesome/free-solid-svg-icons';
import Button from "../../common/components/Button.tsx";
import Badge from "../../common/components/Badge.tsx";
import {useNavigate} from "react-router-dom";
import {useDocumentTitle} from "../../layout/hooks/useDocumentTitle.ts";
import {useAuth} from "../../auth/hooks/useAuth.ts";
import {usePageLog} from "../../common/hooks/usePageLog.ts";
import {getSubscriptionByRoleKey, type SubscriptionKey} from "../../auth/types/subscription.ts";
import SubscriptionRequestModal from "../components/subscriptions/SubscriptionRequestModal.tsx";
import {useState} from "react";
import {hasSubscriptionRequest, requestSubscriptionTier} from "../../auth/services/subscriptions.service.ts";
import {toast} from "react-toastify";
import {useQuery} from "@tanstack/react-query";

const Subscriptions = () => {

    const {user, isAuthenticated, role} = useAuth();
    const [modalTier, setModalTier] = useState<SubscriptionKey | null>(null);

    const query = useQuery<boolean, Error>({
        queryKey: ["hasSubscriptionRequests", user?.id],
        queryFn: () => hasSubscriptionRequest(user?.id),
        staleTime: 1000 * 60 * 5,
        retry: 2,
        enabled: isAuthenticated
    });

    const subscription = getSubscriptionByRoleKey(role);

    useDocumentTitle("Subscriptions");
    usePageLog("Subscriptions");

    const navigate = useNavigate();

    function hasRank(rank: number) {

        if (!isAuthenticated){
            return false;
        }

        return subscription && subscription.rank >= rank;
    }

    function checkDisabled(rank: number) {

        if (!isAuthenticated){
            return true;
        }

        if (query.data) {
            return true;
        }

        return hasRank(rank);
    }

    function getLabel(rank: number): string {
        if (!isAuthenticated) {
            return "Log in to request a subscription";
        }

        if (query.data) {
            return "You already have an active subscription request";
        }

        if (subscription && subscription.rank >= rank) {
            return "You already have this subscription tier or higher";
        }

        return "Request Subscription";
    }


    return (
        <div className="container mx-auto px-4 max-w-5xl">
            <PageHeader title="Subscriptions" subtitle="Choose the experience that's right for you"/>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                <div className="flex justify-center">
                    <Card
                        className="relative flex flex-col max-w-xs items-center bg-linear-to-br border-green-500 from-white to-green-500/50 dark:from-green-700/30 dark:to-gray-900/80 p-8 rounded-xl shadow-xl hover:shadow-2xl">
                        <Header className="font-serif text-3xl text-center dark:text-white mb-2">
                            The Acolyte
                        </Header>

                        <Badge variant="green">
                            Free During Beta
                        </Badge>

                        <Divider className="my-4"/>

                        <ul className="list-none space-y-4 text-mono-700 dark:text-white grow">
                            <li className="flex items-center">
                                <FontAwesomeIcon icon={faCheckCircle} className="mr-3 text-green-400"/>
                                Access to exclusive stories
                            </li>
                            <li className="flex items-center">
                                <FontAwesomeIcon icon={faCommentDots} className="mr-3 text-green-400"/>
                                Reactions and commenting
                            </li>
                            <li className="flex items-center">
                                <FontAwesomeIcon icon={faLightbulb} className="mr-3 text-green-400"/>
                                Submit ideas
                            </li>
                        </ul>

                        <p className="mt-6 text-mono-500 dark:text-mono-300 text-center text-sm">
                            The standard tier – ideal for most users. Create an account and dive in!
                        </p>

                        <Button
                            className="w-full mt-8"
                            disabled={isAuthenticated}
                            variant={!isAuthenticated ? "submit" : "outline"}
                            onClick={() => navigate('/register')}
                        >
                            <p className="truncate">{isAuthenticated ? "You already have account" : "Sign Up for Free"}</p>
                        </Button>
                    </Card>
                </div>

                <div className="flex justify-center">
                    <Card
                        className="relative flex flex-col max-w-xs items-center bg-linear-to-br dark:from-primary-900/30 dark:to-mono-900/50 p-8 rounded-xl shadow-xl hover:shadow-2xl">
                        <Header className="font-serif text-3xl text-center dark:text-white mb-2">
                            The High Priest
                        </Header>

                        <Badge variant="green">
                            Free During Beta
                        </Badge>

                        <Divider className="my-4"/>

                        <ul className="list-none space-y-4 text-mono-700 dark:text-white">
                            <li className="flex items-center">
                                <FontAwesomeIcon icon={faCommentDots} className="mr-3"/>
                                All 'The Acolyte' subscription benefits
                            </li>
                            <li className="flex items-center">
                                <FontAwesomeIcon icon={faCheckCircle} className="mr-3"/>
                                Access to 'The High Priest' tier stories
                            </li>
                        </ul>

                        <p className="mt-6 text-mono-500 dark:text-mono-300 grow text-justify text-sm/6">
                            This content may include offensive or controversial themes, such as <u><b>satire, political
                            mockery, slurs, and phobias</b></u>, which could be particularly upsetting to a modern
                            Western audience.
                        </p>

                        <Button
                            className="w-full mt-8"
                            disabled={checkDisabled(2)}
                            variant={(!checkDisabled(2) && !hasRank(2)) ?  "submit" : "outline"}
                            onClick={() => setModalTier('high-priest')}
                        >
                            {getLabel(2)}
                        </Button>
                    </Card>
                </div>

                <div className="flex justify-center">
                    <Card
                        className="relative flex flex-col max-w-xs items-center bg-linear-to-br dark:from-primary-900/30 dark:to-mono-900/50 p-8 rounded-xl shadow-xl hover:shadow-2xl">
                        <Header className="font-serif text-3xl text-center dark:text-white mb-2">
                            The Cult Leader
                        </Header>

                        <Badge variant="green">
                            Free During Beta
                        </Badge>

                        <Divider className="my-4"/>

                        <ul className="list-none space-y-4 text-mono-700 dark:text-white grow">
                            <li className="flex items-center">
                                <FontAwesomeIcon icon={faCommentDots} className="mr-3"/>
                                All 'The High Priest' subscription benefits
                            </li>
                            <li className="flex items-center">
                                <FontAwesomeIcon icon={faCheckCircle} className="mr-3"/>
                                Access to 'The Cult Leader' tier stories
                            </li>
                        </ul>

                        <p className="mt-6 text-mono-500 dark:text-mono-300 text-justify text-sm/6">
                            This tier may contain extremely brutal and graphic depictions of mental and physical <u><b>abuse
                            and violence</b></u> of various kinds, and is significantly more unhinged than the previous
                            tier.
                        </p>

                        <Button
                            className="w-full mt-8"
                            disabled={checkDisabled(3)}
                            variant={(!checkDisabled(3) && !hasRank(3)) ?  "submit" : "outline"}
                            onClick={() => setModalTier('cult-leader')}
                        >
                            {getLabel(3)}
                        </Button>
                    </Card>
                </div>
            </div>

            <SubscriptionRequestModal
                isOpen={modalTier !== null}
                onClose={() => setModalTier(null)}
                tier={modalTier!}
                onSubmitRequest={async (tier) => {
                    const result = await requestSubscriptionTier(tier);
                    await query.refetch();

                    if (!result) {
                        toast.error("An unexpected error occurred. Please try again later.");
                    } else {
                        toast.success("Requested successfully submitted.");
                    }
                }}
            />
        </div>
    );
};

export default Subscriptions;