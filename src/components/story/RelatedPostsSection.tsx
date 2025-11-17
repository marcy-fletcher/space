import React from 'react';
import AvailableRelatedStory from './AvailableRelatedStory';
import LockedRelatedStory from './LockedRelatedStory';
import {Post} from "../../types/post.ts";

interface RelatedPostsSectionProps {
    relatedPosts?: Post['relatedPosts'];
}

const RelatedPostsSection: React.FC<RelatedPostsSectionProps> = ({ relatedPosts }) => {
    if (!relatedPosts || relatedPosts.length === 0) {
        return null;
    }

    return (
        <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 font-serif">
                Related Stories
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
                {relatedPosts.map((relatedPost) => (
                    <div key={relatedPost.id} className="h-full">
                        {!relatedPost.title || !relatedPost.preview ? (
                            <LockedRelatedStory
                                createdAt={relatedPost.createdAt}
                                accountTier={relatedPost.subscription?.requiredTierTitle}
                            />
                        ) : (
                            <AvailableRelatedStory
                                id={relatedPost.id}
                                title={relatedPost.title}
                                preview={relatedPost.preview}
                                createdAt={relatedPost.createdAt}
                            />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RelatedPostsSection;