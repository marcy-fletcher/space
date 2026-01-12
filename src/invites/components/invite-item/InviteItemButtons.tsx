import Button from "../../../common/components/Button.tsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCopy, faSpinner, faTrash} from "@fortawesome/free-solid-svg-icons";
import {useState} from "react";
import {deleteInvite} from "../../services/invites.service.ts";
import {useMutation} from "@tanstack/react-query";
import type {Invite} from "../../types/invites.ts";
import {queryClient} from "../../../main.tsx";
import {toast} from "react-toastify";
import {useAuth} from "../../../auth/hooks/useAuth.ts";
import {cn} from "../../../utils/cn.ts";

interface InviteItemButtonsProps {
    code: string;
    className?: string;
}

const InviteItemButtons = ({code, className}: InviteItemButtonsProps) => {

    const {user} = useAuth();
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(code);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy code: ", err);
        }
    };

    const queryKey = ["invites", user?.id];

    const {mutate: deleteMutate, isPending: isDeletePending} = useMutation({
        mutationFn: deleteInvite,
        onMutate: async (code) => {
            await queryClient.cancelQueries({queryKey});
            const previousInvites = queryClient.getQueryData<Invite[]>(queryKey);

            queryClient.setQueryData(queryKey, (oldData: Invite[] | undefined) => {
                return oldData?.filter(comment => comment.code !== code) || [];
            });

            return {previousInvites};
        },
        onError: (_err, _key, context) => {
            if (context?.previousInvites) {
                queryClient.setQueryData(queryKey, context.previousInvites);
            }

            toast.error("Error deleting invite, try again later");
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: queryKey});
        }
    })

    return (
        <div className={cn("flex items-center gap-2", className)}>
            <Button
                variant="submit"
                size="small"
                onClick={handleCopy}
                aria-label="Copy invite code"
            >
                <FontAwesomeIcon className="mr-2" icon={faCopy}/>
                {copied ? "Code copied!" : "Copy code"}
            </Button>

            <Button
                variant="secondary"
                size="small"
                disabled={isDeletePending}
                onClick={() => deleteMutate(code)}
                aria-label="Delete invite code"
            >
                {!isDeletePending ?
                    <FontAwesomeIcon icon={faTrash}/> :
                    <FontAwesomeIcon icon={faSpinner} spin/>
                }
            </Button>
        </div>
    );
};

export default InviteItemButtons;