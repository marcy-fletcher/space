import Card from "../../../layout/Card.tsx";
import PageHeader from "../../../layout/PageHeader.tsx";
import {useDocumentTitle} from "../../../layout/hooks/useDocumentTitle.ts";
import {useNavigate, useParams} from "react-router-dom";
import EditPostForm from "../../components/post/EditPostForm.tsx";
import {useEffect, useState} from "react";
import type {CreatePostDto} from "../../dtos/forms/createPostDto.ts";
import type {StringId} from "../../types/id.ts";
import {getPostForUpdate, updatePost} from "../../services/posts.service.ts";
import {toast} from "react-toastify";
import {queryClient} from "../../../utils/common.ts";

type EditPostType = Omit<CreatePostDto, 'related_posts'> & {
    related_posts: StringId[]
}

const EditPost = () => {

    const navigate = useNavigate();
    useDocumentTitle("Edit post");

    const {id} = useParams<{ id: string }>();

    const [postToUpdate, setPostToUpdate] = useState<EditPostType>();

    useEffect(() => {
        async function fetchPost() {
            if (!id)
                return;

            const postId = parseInt(id);
            const result = await getPostForUpdate(postId);

            setPostToUpdate({
                ...result, related_posts: result.related_posts.map(x => {
                    return {id: x.id.toString()}
                })
            })
        }

        fetchPost();
    }, []);

    if (!id) {
        return null;
    }

    if (!postToUpdate) {
        return null;
    }

    return (
        <div className="container mx-auto px-4 max-w-7xl">
            <PageHeader title={"Create Post"} subtitle="Create new story..."/>
            <Card>
                <EditPostForm
                    state={postToUpdate}
                    onSubmit={async (x) => {
                        try {
                            await updatePost(parseInt(id), {
                                ...x,
                                related_posts: x.related_posts.map(p => ({id: parseInt(p.id)}))
                            });

                            await queryClient.invalidateQueries({
                                queryKey: ['post', id]
                            });

                            toast.success('Post updated successfully!');
                            navigate(`/posts/${id}`);
                        }
                        catch {
                            toast.error('There was an error updating the post. Please try again later.');
                        }
                    }}/>
            </Card>
        </div>
    );
};

export default EditPost;