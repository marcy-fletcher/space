import type {RelatedPost} from "../../../types/post.ts";
import Card from "../../../../layout/Card.tsx";
import Header from "../../../../common/components/Header.tsx";
import {formatDate} from "../../../../utils/formatDate.ts";
import {Link} from "react-router-dom";
import {truncate} from "../../../../utils/truncate.ts";
import UserImage from "../../../../common/components/UserImage.tsx";

interface AvailableRelatedPostProps {
    relatedPost: RelatedPost
}

const AvailableRelatedPost = ({relatedPost}: AvailableRelatedPostProps) => {
    return (
        <Card className="flex flex-col gap-4">

            <Link to={`/posts/${relatedPost.slug}`}>
            <div className="flex flex-row gap-4 items-center">
                <UserImage className="min-w-10 min-h-10 w-10 h-10" source={relatedPost.pictureUrl}
                           alt="Related post preview"/>
                {relatedPost.title && <Header>{truncate(relatedPost.title, 30)}</Header>}
            </div>
            </Link>

            {relatedPost.summary &&
                <p className="text-sm text-mono-500">
                    {truncate(relatedPost.summary, 100)}
                </p>
            }

            <div className="grow" />
            <div className="flex flex-row justify-between">
                <span className="text-sm text-mono-500">{formatDate(relatedPost.createdAt)}</span>
                <Link to={`/posts/${relatedPost.slug}`} className="text-sm text-primary-500">Open</Link>
            </div>
        </Card>
    );
};

export default AvailableRelatedPost;