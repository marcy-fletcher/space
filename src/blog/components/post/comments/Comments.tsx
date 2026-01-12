import Card from "../../../../layout/Card.tsx";
import InputArea from "../../../../common/components/inputs/InputArea.tsx";
import Button from "../../../../common/components/Button.tsx";
import Comment from "./Comment.tsx";
import Badge from "../../../../common/components/Badge.tsx";
import {cn} from "../../../../utils/cn.ts";
import {useQuery, useMutation} from "@tanstack/react-query";
import {getComments, insertComment, removeComment} from "../../../services/comments.service.ts";
import type {Comment as CommentEntity} from "../../../types/comment.ts";
import CommentLoader from "../loaders/CommentLoader.tsx";
import {formatTimeAgo} from "../../../../utils/formatDate.ts";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import type {AddCommentDto} from "../../../dtos/forms/addComment.dto.ts";
import {z} from "zod";
import {queryClient} from "../../../../main.tsx";
import {useAuth} from "../../../../auth/hooks/useAuth.ts";
import {toast} from "react-toastify";
import {useEffect, useRef, useState} from "react";
import {Link} from "react-router-dom";

interface CommentsProps {
    postId: number;
    className?: string;
}

const addCommentSchema = z.object({
    postId: z.number(),
    content: z.string().min(1, {message: "Comment text is required"}),
    replyId: z.number().optional(),
});

const Comments = ({postId, className}: CommentsProps) => {
    const {isAuthenticated, user, username} = useAuth();
    const [replyId, setReplyId] = useState<number | undefined>();
    const [highlightedCommentId, setHighlightedCommentId] = useState<number | null>(null);
    const commentInputRef = useRef<HTMLTextAreaElement | null>(null);

    const queryKey = ["comments", postId];

    const {data, isLoading} = useQuery<CommentEntity[], Error>({
        queryKey: queryKey,
        queryFn: () => getComments(postId),
        staleTime: 1000 * 60 * 5,
        retry: 2,
        refetchInterval: 1000 * 60 * 5
    });

    const {
        handleSubmit,
        formState: {errors, isValid},
        register,
        reset,
        setValue
    } = useForm<AddCommentDto>({
        resolver: zodResolver(addCommentSchema),
        defaultValues: {
            postId: postId,
        },
        mode: "onSubmit",
    });

    useEffect(() => {
        reset({ postId });
    }, [postId, reset]);

    const addMutation = useMutation({
        mutationFn: async (data: AddCommentDto) => {
            try {
                await insertComment(data.postId, data.content, data.replyId);
            } catch (error) {
                console.error(error);
            }
        },
        onMutate: async (newComment: AddCommentDto) => {
            await queryClient.cancelQueries({queryKey});

            const previousComments = queryClient.getQueryData<CommentEntity[]>(queryKey);

            const optimisticComment: CommentEntity = {
                id: Date.now(),
                postId: postId,
                authorId: user?.id ?? '',
                content: newComment.content,
                authorName: username ?? 'Who are you?',
                createdAt: new Date().toISOString(),
            };

            queryClient.setQueryData(queryKey, (old: CommentEntity[] | undefined) => {
                return old ? [optimisticComment, ...old] : [optimisticComment];
            });

            return {previousComments, optimisticCommentId: optimisticComment.id};
        },
        onError: (_error, _newComment, context) => {
            if (context?.previousComments !== undefined) {
                queryClient.setQueryData(queryKey, context.previousComments);
            }

            toast.error("Error adding comment, try again later");
        },
        onSettled: () => queryClient.invalidateQueries({queryKey}),
    });

    const removeMutation = useMutation({
        mutationFn: async (commentId: number) => {
            await removeComment(commentId);
        },
        onMutate: async (commentId) => {
            await queryClient.cancelQueries({queryKey});

            const previousComments = queryClient.getQueryData<CommentEntity[]>(queryKey);

            queryClient.setQueryData(queryKey, (oldData: CommentEntity[] | undefined) => {
                return oldData?.filter(comment => comment.id !== commentId) || [];
            });

            return {previousComments};
        },
        onError: (_error, _commentId, context) => {
            if (context?.previousComments) {
                queryClient.setQueryData(queryKey, context.previousComments);
            }

            toast.error("Error deleting comment, try again later");
        },
        onSettled: () => queryClient.invalidateQueries({queryKey}),
    });

    const {ref, ...rest} = register('content');

    const highlightComment = (commentId: number | undefined) => {
        if (commentId !== undefined) {
            setHighlightedCommentId(commentId);
            const commentElement = document.getElementById(`comment-${commentId}`);
            commentElement?.scrollIntoView({behavior: "smooth", block: "center"});

            setTimeout(() => {
                setHighlightedCommentId(null);
            }, 3000);
        }
    };

    const scrollToInput = () => {
        if (commentInputRef.current) {
            commentInputRef.current.scrollIntoView({behavior: "smooth", block: "center"});
            commentInputRef.current.focus();
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            handleSubmit((data) => {
                addMutation.mutate(data);
                setReplyId(undefined);
                reset();
            })();
        }
    };

    if (isLoading) {
        return <CommentLoader/>;
    }

    const replyAuthor = data?.find(x => x.id === replyId)?.authorName;

    return (
        <div className={cn("flex flex-col gap-4", className)}>
            {isAuthenticated ? <form
                onSubmit={handleSubmit(async (data) => {
                    addMutation.mutate(data);
                    reset();
                })}
            >
                <Card className="flex flex-col gap-5 p-3">
                    <InputArea
                        id="content"
                        error={errors.content}
                        {...rest}
                        ref={(e) => {
                            ref(e);
                            commentInputRef.current = e;
                        }}
                        placeholder="Share your thoughts..."
                        onKeyDown={handleKeyDown}
                    />
                    <div className="flex flex-row gap-2 justify-end">
                        {replyAuthor &&
                            <Badge className="max-w-xs truncate break-all cursor-pointer select-none"
                                   variant="gray"
                                   onClick={() => {
                                       setReplyId(undefined);
                                       setValue('replyId', undefined);
                                   }}
                            >
                                {replyAuthor}
                                <span>×</span>
                            </Badge>}
                        <Button
                            disabled={!isValid || addMutation.isPending}
                            className="grow sm:grow-0"
                            variant="submit"
                            size="medium"
                        >
                            {addMutation.isPending ? "Posting..." : "Post"}
                        </Button>
                    </div>
                </Card>
            </form> : (
                <Card className="p-6 text-center">
                    <p className="text-gray-600 dark:text-gray-400">
                        Please <Link to="/login" className="text-primary-600 dark:text-primary-400 underline">log in</Link> or <Link
                        to="/register" className="text-primary-600 dark:text-primary-400 underline">sign up</Link> to add
                        comments.
                    </p>
                </Card>
            )}

            <div className="flex flex-col gap-2">
                {data && data.map((comment) => {

                    const addressedComment = data?.find(x => x.id === comment.replyId);

                    const replyName =
                        !comment.replyId ? undefined :
                            addressedComment?.authorName ?? undefined;

                    const replyId =
                        !comment.replyId ? undefined :
                            addressedComment?.id ?? -1;

                    return (
                        <Comment
                            id={`comment-${comment.id}`}
                            key={comment.id}
                            authorId={comment.authorId}
                            authorName={comment.authorName}
                            replyId={replyId}
                            replyName={replyName}
                            createdAt={formatTimeAgo(comment.createdAt)}
                            content={comment.content}
                            onReplyClick={() => {
                                setReplyId(comment.id);
                                setValue('replyId', comment.id);
                                scrollToInput();
                            }}
                            onResponseClick={() => highlightComment(replyId)}
                            onRemoveClick={() => removeMutation.mutate(comment.id)}
                            highlighted={highlightedCommentId === comment.id}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default Comments;
