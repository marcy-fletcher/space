import Card from "../../layout/Card.tsx";
import PageHeader from "../../layout/PageHeader.tsx";
import Button from "../../common/components/Button.tsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faKey, faPlus, faPlusCircle} from "@fortawesome/free-solid-svg-icons";
import Header from "../../common/components/Header.tsx";
import InputField from "../../common/components/inputs/InputField.tsx";
import Subtitle from "../../common/components/Subtitle.tsx";
import {useMutation, useQuery} from "@tanstack/react-query";
import type {Invite} from "../types/invites.ts";
import {applyInvite, createInvite, getInvites} from "../services/invites.service.ts";
import {useAuth} from "../../auth/hooks/useAuth.ts";
import InviteItem from "../components/InviteItem.tsx";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {toast} from "react-toastify";
import {cn} from "../../utils/cn.ts";
import {type Subscription, type SubscriptionKey, SubscriptionKeys} from "../../auth/types/subscription.ts";
import InputSelect from "../../common/components/inputs/InputSelect.tsx";
import {useDocumentTitle} from "../../layout/hooks/useDocumentTitle.ts";
import {usePageLog} from "../../common/hooks/usePageLog.ts";
import {ErrorCodes, EventCodes, logError, logInfo} from "../../common/services/logging.service.ts";
import {queryClient} from "../../utils/common.ts";

interface InviteInput {
    key: string
}

interface CreateInviteInput {
    key: SubscriptionKey
}

const applySchema = z.object({
    key: z.uuidv4({message: "Invalid key format"}).min(1, {message: "Key is required"})
});

const createSchema = z.object({
    key: z.enum(SubscriptionKeys)
});

const getAvailableTiers = (subscription: Subscription): { label: string, value: SubscriptionKey }[] => {
    if (subscription.key === 'acolyte') {
        throw new Error("Rank is not sufficient");
    } else if (subscription.key === 'high-priest') {
        return [{
            value: "high-priest",
            label: "The High Priest",
        }]
    } else if (
        subscription.key === 'cult-leader' ||
        subscription.key === 'goddess' ||
        subscription.key === 'deity') {
        return [{
            value: "high-priest",
            label: "The High Priest",
        }, {
            value: "cult-leader",
            label: "The Cult Leader",
        }]
    }
    else {
        return [];
    }
}

const Invites = () => {

    const {
        register: registerApply,
        setError,
        handleSubmit: handleApplySubmit,
        reset,
        formState: {errors: applyErrors, isValid}
    } =
        useForm<InviteInput>({resolver: zodResolver(applySchema), mode: "onChange"});

    const {register: registerCreate, handleSubmit: handleCreateSubmit} =
        useForm<CreateInviteInput>({resolver: zodResolver(createSchema), mode: "onChange"});

    useDocumentTitle("Invites");
    usePageLog("Invites");

    const {user, subscription} = useAuth();

    const {data} = useQuery<Invite[], Error>({
        queryKey: ["invites", user?.id],
        queryFn: () => getInvites(),
        staleTime: 1000 * 60 * 5,
        retry: 2
    });

    const {mutate: createMutate, isPending: isCreatePending} = useMutation({
        mutationFn: createInvite,
        onSuccess: async () => {
            toast.success("Invite key was created!");
            logInfo(EventCodes.inviteCreated);
            await queryClient.invalidateQueries({queryKey: ["invites", user?.id]});
        },
        onError: error => {
            logError(ErrorCodes.inviteCreateError, {error})
            if (typeof error === 'string') {
                toast.error(error);
            } else if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error('An unknown error occurred');
            }
        }
    })

    const {mutate: applyMutate, isPending: isApplyPending} = useMutation({
        mutationFn: applyInvite,
        onSuccess: async () => {
            toast.success("Invite key was used!");
            logInfo(EventCodes.inviteUsed);
            await queryClient.invalidateQueries({queryKey: ["self-identity", user?.id]});
            reset();
        },
        onError: error => {
            logError(ErrorCodes.inviteKeyError, {error});
            if (typeof error === 'string') {
                toast.error(error);
                setError('key', {message: error});
            } else if (error instanceof Error) {
                toast.error(error.message);
                setError('key', {message: error.message});
            } else {
                toast.error('An unknown error occurred');
                setError('key', {message: 'An unknown error occurred'});
            }
        }
    })

    return (
        <div className="container mx-auto px-4 max-w-4xl flex flex-col gap-4">
            <PageHeader title="Subscription Management" subtitle="Create or apply invite code"/>

            <div className={cn("grid gap-4",
                subscription?.rank && subscription.rank > 1 ?
                    "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" :
                    "grid-cols-1"
            )}>
                <Card className="lg:col-span-2 flex flex-col gap-4">
                    <Header>
                        <FontAwesomeIcon icon={faKey} className="mr-2"/>
                        Use Invite Key
                    </Header>
                    <Subtitle>
                        Enter an invite key to apply new subscription to your account
                    </Subtitle>
                    <div className="px-4">
                        <ul className="list-disc text-sm text-mono-500">
                            <li>Invite keys are case-sensitive</li>
                            <li>Each key can only be used once</li>
                        </ul>
                    </div>
                    <div className="grow"/>
                    {applyErrors.key && <p className="text-red-400">{applyErrors.key.message}</p>}
                    <form className="flex flex-row gap-4"
                          onSubmit={handleApplySubmit(async (data) => applyMutate(data.key))}
                          noValidate>
                        <InputField id="key" register={registerApply} className="grow"/>
                        <Button disabled={!isValid || isApplyPending} className="truncate max-h-12" variant="submit">
                            Use
                        </Button>
                    </form>
                </Card>

                {subscription?.rank && subscription?.rank > 1 &&
                    <form className="flex grow" noValidate onSubmit={
                        handleCreateSubmit(async data => createMutate(data.key))}
                    >
                        <Card className="flex grow flex-col gap-4">
                            <Header>
                                <FontAwesomeIcon icon={faPlusCircle} className="mr-2"/>
                                Create Invite Key
                            </Header>
                            <Subtitle>
                                Create an invite key with tier you want to share with user
                            </Subtitle>
                            <InputSelect
                                id="key"
                                register={registerCreate}
                                options={getAvailableTiers(subscription)}
                            />

                            <div className="grow"/>

                            <Button disabled={isCreatePending} className="h-12" variant="submit">
                                <FontAwesomeIcon className="mr-1" icon={faPlus}/>
                                Create invite
                            </Button>
                        </Card>
                    </form>
                }
            </div>

            <div
                className="p-0 overflow-hidden  md:rounded-2xl md:dark:bg-mono-800 md:shadow-lg md:border md:border-mono-200 md:dark:border-mono-700">
                <div
                    className="hidden md:grid px-4 py-4 dark:border-b-mono-500 grid-cols-12 gap-4 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                    <div className="col-span-4">Key</div>
                    <div className="col-span-2">Status</div>
                    <div className="col-span-2">Used by</div>
                    <div className="col-span-2">Subscription</div>
                    <div className="col-span-2">Used at</div>
                </div>
                <div className="flex flex-col gap-4 md:gap-0 divide-x divide-gray-100 dark:divide-gray-800">
                    {data && data.map(invite => {
                        return <InviteItem key={invite.code} invite={invite}/>
                    })}
                </div>
            </div>
        </div>
    );
};

export default Invites;