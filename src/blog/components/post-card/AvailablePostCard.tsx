import type {PostSummary} from "../../types/postSummary.ts";
import Card from "../../../layout/Card.tsx"
import Header from "./Header.tsx";
import ExplicitnessBadge from "./ExplicitnessBadge.tsx";
import TagBadge from "./TagBadge.tsx";
import TransformationBadge from "./TransformationBadge.tsx";
import Group from "./Group.tsx";
import Warning from "./Warning.tsx";
import {sortByWarningLevel} from "../../types/warning.ts";
import {faArrowRight, faSpinner} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import ReactionsGroup from "./ReactionsGroup.tsx";
import {useSearchStore} from "../../model/searchStore.ts";
import {useState} from "react";
import LinkButton from "../../../common/components/LinkButton.tsx";

interface AvailablePostCardProps {
    post: PostSummary
}

const AvailablePostCard = ({post}: AvailablePostCardProps) => {
    const [openButtonClicked, setOpenButtonClicked] = useState(false);
    const {params, setParams} = useSearchStore();

    return (
        <Card className="relative w-full max-w-lg flex flex-col hover:border-primary-500">

            {post.metadata && post.metadata.explicitness !== 'safe' &&
                <ExplicitnessBadge
                    className="absolute -top-3 left-1/2 transform -translate-x-1/2"
                    explicitness={post.metadata!.explicitness} />}

            <div className="flex justify-between items-start mb-8">
                <Header
                    title={post.title!}
                    pictureUrl={post.pictureUrl!}
                    createdAt={post.createdAt} />
            </div>


            {post.tags && post.tags.length > 0 &&
                <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag) => (
                        <TagBadge
                            key={tag.value}
                            onClick={() => setParams({...params, term: `#${tag.value}`})}
                            className="cursor-pointer"
                        >
                            #{tag.value}
                        </TagBadge>
                    ))}
                </div>}

            <p className="text-mono-600 dark:text-mono-300 leading-relaxed mb-6 font-sans">
                {post.summary}
            </p>

            {post.warnings && post.warnings.length > 0 &&
                <Group name="Content Warnings">
                    <div className="flex flex-wrap gap-2">
                        {sortByWarningLevel(post.warnings)
                            .map(warning => (
                                <Warning key={warning.text} warning={warning}/>
                            ))}
                    </div>
                </Group>}

            {post.transformations && post.transformations.length > 0 &&
                <Group name="Transformations">
                    <div className="space-y-2">
                        <div className="flex flex-wrap gap-2">
                            {post.transformations?.map((transformation, index) => (
                                <TransformationBadge
                                    key={index}
                                    transformation={transformation}
                                />
                            ))}
                        </div>
                    </div>
                </Group>}

            <div className="grow" />
            <LinkButton
                className="w-full flex items-center justify-center space-x-2 py-3"
                shape="square"
                navigateTo={`/posts/${post.metadata?.slug}`}
                onClick={() => {
                    setOpenButtonClicked(true);
                }}
                variant="primary">
                {!openButtonClicked &&
                    <>
                        <span>Read Full Story</span>
                        <FontAwesomeIcon icon={faArrowRight}/>
                    </>
                }

                {openButtonClicked &&
                    <>
                        <span>Loading...</span>
                        <FontAwesomeIcon icon={faSpinner} spin/>
                    </>
                }
            </LinkButton>

            <ReactionsGroup commentsCount={post.commentCount} viewsCount={post.views} reactions={post.reactions}/>
        </Card>
    );
};

export default AvailablePostCard;