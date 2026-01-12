import Card from "../../../../layout/Card.tsx";
import Header from "../../../../common/components/Header.tsx";
import Button from "../../../../common/components/Button.tsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faReply, faTrash} from "@fortawesome/free-solid-svg-icons";
import {cn} from "../../../../utils/cn.ts";
import {useAuth} from "../../../../auth/hooks/useAuth.ts";

interface CommentProps {
    id?: string;
    authorId: string;
    authorName: string;
    createdAt: string;
    replyId?: number;
    replyName?: string;
    content: string;
    highlighted?: boolean;
    onReplyClick?: () => void;
    onRemoveClick?: () => void;
    onResponseClick?: () => void;
}

const Comment = ({
                     id,
                     authorId,
                     authorName,
                     createdAt,
                     replyId,
                     replyName,
                     content,
                     highlighted,
                     onReplyClick,
                     onRemoveClick,
                     onResponseClick
                 }: CommentProps) => {

    const {isAuthenticated, user} = useAuth();

    return (
        <div id={id} className="flex flex-col gap-2">
            <Card
                className={cn(
                    "px-4 py-2 dark:bg-mono-700/40 flex flex-col gap-2 transition-all duration-500",
                    {"border-primary-500 dark:border-primary-500": highlighted}
                )}
            >
                <div className="flex flex-row gap-4 items-center">
                    <Header className="text-base flex flex-row gap-2 items-center">
                        {authorName}
                        <p className="text-xs text-mono-500">
                            {createdAt}
                        </p>
                    </Header>
                </div>
                <div className="text-subbase/6 flex flex-row gap-2">
                    <p>
                        {replyName && replyId && <b onClick={onResponseClick}
                                                    className="text-primary-500 mr-1 cursor-pointer select-none">@{replyName}</b>}
                        {replyId && !replyName && <b className="text-mono-500 mr-1 select-none">@Deleted</b>}
                        {content}
                    </p>
                </div>

                {isAuthenticated && <div className="flex flex-row gap-2">
                    <Button
                        className="text-ssm px-3 py-2 flex flex-row gap-2 items-center"
                        onClick={onReplyClick}
                        variant="link">
                        <FontAwesomeIcon icon={faReply}/>
                        Reply
                    </Button>

                    {user?.id === authorId && <Button
                        className="text-ssm px-3 py-2 flex flex-row gap-2 items-center"
                        onClick={onRemoveClick}
                        variant="link">
                        <FontAwesomeIcon icon={faTrash}/>
                        Remove
                    </Button>}
                </div>}
                {
                    <div />
                }
            </Card>
        </div>
    );
};

export default Comment;