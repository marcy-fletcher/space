import ReactionButton from "./ReactionButton.tsx";
import {useQuery} from "@tanstack/react-query";
import type {ReactionsStats} from "../../../types/reaction.ts";
import {getReactionStats} from "../../../services/reactions.service.ts";

interface ReactionSectionProps {
    id: number;
}

const ReactionSection = ({id}: ReactionSectionProps) => {
    const {
        data: reactions = undefined,
        isLoading: loading
    } = useQuery<ReactionsStats, Error>({
        queryKey: ['post_reactions', id],
        queryFn: () => {
            return getReactionStats(id)
        },
        staleTime: 1000 * 60 * 5,
    });

    if (loading || !reactions) {
        return <div className="flex flex-wrap gap-2 justify-center my-6">
            <ReactionButton disabled postId={0} type='like' count={0}
                            userReacted={false}/>
            <ReactionButton disabled postId={0} type='dislike' count={0}
                            userReacted={false}/>
            <ReactionButton disabled postId={0} type='hot' count={0}
                            userReacted={false}/>
            <ReactionButton disabled postId={0} type='sequel_request' count={0}
                            userReacted={false}/>
        </div>
    }

    return (
        <div className="flex flex-wrap gap-2 justify-center my-6">
            <ReactionButton postId={id} type='like' count={reactions.like.count}
                            userReacted={reactions.like.userHasReacted}/>
            <ReactionButton postId={id} type='dislike' count={reactions.dislike.count}
                            userReacted={reactions.dislike.userHasReacted}/>
            <ReactionButton postId={id} type='hot' count={reactions.hot.count}
                            userReacted={reactions.hot.userHasReacted}/>
            <ReactionButton postId={id} type='sequel_request' count={reactions.sequel_request.count}
                            userReacted={reactions.sequel_request.userHasReacted}/>
        </div>
    );
};

export default ReactionSection;