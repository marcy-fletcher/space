import {useNavigate, useParams} from "react-router-dom";
import {lazy, Suspense, useEffect} from "react";
import {getPost, incrementPostViews} from "../services/posts.service.ts";
import Card from "../../layout/Card.tsx";
import Header from "../../common/components/Header.tsx";
import Subtitle from "../../common/components/Subtitle.tsx";
import Divider from "../../common/components/Divider.tsx";
import {useMutation, useQuery} from "@tanstack/react-query";
import type {Post as PostEntity} from "../types/post.ts";
import {formatDate} from "../../utils/formatDate.ts";
import TagBadge from "../components/post-card/TagBadge.tsx";
import PostLoader from "../components/post/loaders/PostLoader.tsx";
import {parsePostId} from "../types/id.ts";
import {useDocumentTitle} from "../../layout/hooks/useDocumentTitle.ts";
import {RequirePolicy} from "../../auth/components/RequirePolicy.tsx";
import {auth, policy, role} from "../../auth/policies/policyBuilders.ts";
import PostManagement from "../components/post/PostManagement.tsx";
import References from "../components/post/References.tsx";
import ReactionsLoader from "../components/post/loaders/ReactionsLoader.tsx";
import CommentLoader from "../components/post/loaders/CommentLoader.tsx";
import {cn} from "../../utils/cn.ts";
import AvailableRelatedPost from "../components/post/related-posts/AvailableRelatedPost.tsx";
import UnavailableRelatedPost from "../components/post/related-posts/UnavailableRelatedPost.tsx";
import UserAgreement from "../components/post/UserAgreement.tsx";
import {usePageLog} from "../../common/hooks/usePageLog.ts";
import {ErrorCodes, logError} from "../../common/services/logging.service.ts";

const Comments = lazy(() => import("../components/post/comments/Comments.tsx"));
const ReactionSection = lazy(() => import("../components/post/reactions/ReactionSection.tsx"));
const Markdown = lazy(() => import("../components/markdown/Markdown.tsx"));

const Post = () => {

    const navigate = useNavigate();
    const {id} = useParams<{ id: string }>();

    const {
        data: post = undefined,
        isError,
        isLoading: postLoading
    } = useQuery<PostEntity, Error>({
        queryKey: ['post', id],
        queryFn: () => getPost(parsePostId(id)!),
        staleTime: 1000 * 60 * 5,
        enabled: !!id,
        retry: 2
    });

    useDocumentTitle(post?.title);
    usePageLog('Post', {name: post?.title}, !!post);

    const {mutate: incrementViews} = useMutation({
        mutationFn: incrementPostViews
    })

    useEffect(() => {
        window.scrollTo(0, 0);

        async function onPostLoaded() {
            if (post && post.relatedPosts) {
                incrementViews(post.id);
            }
        }

        onPostLoaded();
    }, [post]);

    useEffect(() => {
        async function onErrorChange() {
            if (isError) {
                logError(ErrorCodes.postNotFound, {id: id});
                navigate("/404");
            }
        }

        onErrorChange();
    }, [isError]);

    if (postLoading) {
        return <PostLoader/>
    }

    if (post === undefined) {
        return null;
    }

    if (!post.userAgreement && post.warnings && post.warnings.length > 0 && !post.userAgreement) {
        return <UserAgreement
            warnings={post.warnings}
            postId={post.id}
            queryId={id}
        />
    }

    return (
        <div className="container mx-auto px-4 max-w-4xl flex flex-col gap-4">
            <Card className="p-8 md:p-12 mt-4">
                <Header className="text-4xl md:text-5xl font-bold font-serif">
                    {post.title}
                </Header>

                <div className="flex flex-wrap items-center gap-4 mt-3 mb-4">
                    <Subtitle className="text-base text-primary-600 dark:text-primary-400 font-medium">
                        {formatDate(post.createdAt)}
                    </Subtitle>
                </div>

                {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                        {post.tags.map((tag) => (
                            <TagBadge key={tag.value}>
                                #{tag.value}
                            </TagBadge>
                        ))}
                    </div>
                )}

                <Suspense fallback={
                    <ReactionsLoader/>
                }>
                    <ReactionSection id={post.id}/>
                </Suspense>

                <Divider/>

                <Suspense fallback={
                    <div className="my-4 text-mono-700 dark:text-mono-300 leading-relaxed text-justify text-lg">
                        <div className="h-6 bg-mono-200 dark:bg-mono-700 rounded-3xl mb-3"></div>
                        <div className="h-6 bg-mono-200 dark:bg-mono-700 rounded-3xl mb-3"></div>
                        <div className="h-6 bg-mono-200 dark:bg-mono-700 rounded-3xl mb-3"></div>
                        <div className="h-6 bg-mono-200 dark:bg-mono-700 rounded-3xl mb-3"></div>
                    </div>
                }>

                    <Markdown content={post.content} className="mt-8"/>
                </Suspense>
            </Card>

            <RequirePolicy policy={policy(auth(), role('admin'))}>
                <PostManagement post={post}/>
            </RequirePolicy>

            {post.references && post.references.length > 0 &&
                <References references={post.references} className="mt-4"/>}

            {post.relatedPosts && post.relatedPosts.length > 0 && <div className={cn("flex flex-col gap-4")}>
                <Header>Related posts</Header>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {post.relatedPosts && post.relatedPosts.length > 0 &&
                        post.relatedPosts.map((r) =>
                            r.title ?
                                <AvailableRelatedPost key={r.id} relatedPost={r}/> :
                                <UnavailableRelatedPost key={r.id} relatedPost={r}/>
                        )}
                </div>
            </div>}

            <Header className="mt-4">Comments</Header>
            <Suspense fallback={
                <CommentLoader/>
            }>
                <Comments postId={post.id}/>
            </Suspense>
        </div>
    );
};

export default Post;
