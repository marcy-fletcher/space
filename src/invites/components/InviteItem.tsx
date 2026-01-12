import type {Invite} from "../types/invites.ts";
import InviteItemKey from "./invite-item/InviteItemKey.tsx";
import InviteItemUsage from "./invite-item/InviteItemUsage.tsx";
import InviteItemUsedBy from "./invite-item/InviteItemUsedBy.tsx";
import InviteItemSubscriptionName from "./invite-item/InviteItemSubscriptionName.tsx";
import InviteItemUsedAt from "./invite-item/InviteItemUsedAt.tsx";
import InviteItemButtons from "./invite-item/InviteItemButtons.tsx";

interface InviteItemProps {
    invite: Invite;
}

const InviteItem = ({invite}: InviteItemProps) => {
    return (
        <div
            className="rounded-lg border md:rounded-none border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/60 shadow-sm overflow-hidden">
            <div className="hidden md:flex md:flex-col md:p-4 md:py-5 gap-4">
                <div className="grid md:grid-cols-12 md:gap-4">

                    <InviteItemKey code={invite.code} className="col-span-4 gap-4 overflow-hidden"/>
                    <InviteItemUsage used={!!invite.usedAt} className="col-span-2"/>
                    <InviteItemUsedBy usedBy={invite.usedBy} className="col-span-2"/>
                    <InviteItemSubscriptionName name={invite.subscriptionName} className="col-span-2"/>
                    <InviteItemUsedAt usedAt={invite.usedAt} className="col-span-1"/>
                </div>
                {!invite.usedAt &&
                    <InviteItemButtons className="col-span-2" code={invite.code}/>
                }
            </div>

            <div className="md:hidden flex flex-col gap-4 p-5">
                <div className="flex items-start justify-between gap-4">
                    <InviteItemKey code={invite.code} className="gap-3 flex-1 min-w-0" />
                    <InviteItemUsage used={!!invite.usedAt} className="shrink-0" />
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                        <div className="text-gray-500 text-xs">Used by</div>
                        <InviteItemUsedBy usedBy={invite.usedBy} />
                    </div>
                    <div>
                        <div className="text-gray-500 text-xs">Used at</div>
                        <div className="font-medium">
                            <InviteItemUsedAt usedAt={invite.usedAt}/>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                        <div className="text-gray-500 text-xs">Subscription</div>
                        <InviteItemSubscriptionName name={invite.subscriptionName}/>
                    </div>
                </div>

                {!invite.usedAt && <InviteItemButtons code={invite.code}/>}
            </div>
        </div>
    );
};

export default InviteItem;
