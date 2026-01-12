import Button from "../../../common/components/Button.tsx";
import Card from "../../../layout/Card.tsx";
import type {Post} from "../../types/post.ts";
import Divider from "../../../common/components/Divider.tsx";
import {useState} from "react";
import {hidePost, publishPost} from "../../services/posts.service.ts";
import {toast} from "react-toastify";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from "react-router-dom";

interface PostManagementProps {
    post: Post
}

const PostManagement = ({post}: PostManagementProps) => {

    const navigate = useNavigate();
    const [isPublic, setIsPublic] = useState(post.isPublished);

    const [isPublishing, setIsPublishing] = useState(false);
    const [isHiding, setIsHiding] = useState(false);

    async function handlePublish() {
        try {
            setIsPublishing(true);
            await publishPost(post.id);
            toast.success("Post has been published successfully!");
            setIsPublic(true);
        } catch {
            toast.error("There was an issue while publishing post. Please try again.");
        } finally {
            setIsPublishing(false);
        }
    }

    async function handleHide() {
        try {
            setIsHiding(true);
            await hidePost(post.id);
            toast.success("Post has been hidden successfully!");
            setIsPublic(false);
        } catch {
            toast.error("There was an issue while hiding post. Please try again.");
        } finally {
            setIsHiding(false);
        }
    }


    return (
        <Card className="flex flex-col sm:flex-row gap-2 p-2 justify-between">
            <div className="flex gap-2 flex-col sm:flex-row">
            {!isPublic &&
                <Button disabled={isPublishing} onClick={handlePublish} size="small" shape="square" variant="submit" className="min-w-30 flex items-center justify-center">
                    {!isPublishing && <>Publish</>}
                    {isPublishing && <FontAwesomeIcon icon={faSpinner} spin />}
                </Button>}

            {isPublic &&
                <Button disabled={isHiding} onClick={handleHide} size="small" shape="square" variant="outline" className="min-w-30 flex items-center justify-center">
                    {!isHiding && <>Hide</>}
                    {isHiding && <FontAwesomeIcon icon={faSpinner} spin />}
                </Button>}

            <Button onClick={() => navigate(`/posts/edit/${post.id}`)} size="small" shape="square" variant="secondary" className="min-w-30 flex items-center justify-center">
                Edit
            </Button>
            </div>

            <Divider className="sm:hidden my-2" />

            <Button size="small" shape="square" variant="danger" className="min-w-30">
                Delete
            </Button>
        </Card>
    );
};

export default PostManagement;