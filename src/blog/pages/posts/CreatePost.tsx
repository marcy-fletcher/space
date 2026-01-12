import Card from "../../../layout/Card.tsx";
import PageHeader from "../../../layout/PageHeader.tsx";
import {useDocumentTitle} from "../../../layout/hooks/useDocumentTitle.ts";
import EditPostForm from "../../components/post/EditPostForm.tsx";
import {createPost} from "../../services/posts.service.ts";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

const CreatePost = () => {

    useDocumentTitle("Create post");
    const navigate = useNavigate();

    return (
        <div className="container mx-auto px-4 max-w-7xl">
            <PageHeader title={"Create Post"} subtitle="Create new story..."/>
            <Card>
                <EditPostForm onSubmit={
                    async (data) => {
                        try {
                            const id = await createPost({
                                ...data,
                                related_posts: data.related_posts.map(p => ({id: parseInt(p.id)}))
                            });

                            toast.success("Post successfully created");
                            navigate(`/posts/${id}`);
                        }
                        catch {
                            toast.error("Error creating post");
                        }
                    }
                }/>
            </Card>
        </div>
    );
};

export default CreatePost;