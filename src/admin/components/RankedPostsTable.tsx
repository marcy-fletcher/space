import Card from "../../layout/Card.tsx";
import type {RankedPostRow} from "../types/dashboard.ts";
import {cn} from "../../utils/cn.ts";
import {formatDate} from "../../utils/formatDate.ts";

interface RankedPostsTableProps {
    posts: RankedPostRow[];
    selectedPostId: string | null;
    onSelectPostId: (postId: string) => void;
    className?: string;
}

const numberFormatter = new Intl.NumberFormat("en-US");

function formatPublicationState(value: RankedPostRow["publicationState"]): string {
    return value.charAt(0).toUpperCase() + value.slice(1);
}

const RankedPostsTable = ({
    posts,
    selectedPostId,
    onSelectPostId,
    className
}: RankedPostsTableProps) => {
    return (
        <Card className={cn("flex flex-col gap-4", className)}>
            <div className="flex flex-col gap-1">
                <h3 className="text-lg font-semibold text-mono-900 dark:text-mono-50">
                    Ranked posts
                </h3>
                <p className="text-sm text-mono-500 dark:text-mono-400">
                    Sorted by lifetime views, then lifetime comments, then created date.
                </p>
            </div>

            {posts.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-mono-200 bg-mono-50/70 p-6 text-sm text-mono-500 dark:border-mono-700 dark:bg-mono-800/50 dark:text-mono-400">
                    No posts are available for this filter selection.
                </div>
            ) : (
                <div className="overflow-x-auto rounded-lg border border-mono-200 dark:border-mono-700">
                    <table className="min-w-full divide-y divide-mono-200 dark:divide-mono-700">
                        <thead className="bg-mono-50 dark:bg-mono-800">
                            <tr className="text-left text-xs font-semibold uppercase tracking-wider text-mono-600 dark:text-mono-400">
                                <th className="px-4 py-3">Title</th>
                                <th className="px-4 py-3">Publication state</th>
                                <th className="px-4 py-3">Created date</th>
                                <th className="px-4 py-3">Lifetime views</th>
                                <th className="px-4 py-3">Lifetime comments</th>
                                <th className="px-4 py-3">Lifetime total reactions</th>
                                <th className="px-4 py-3">Period comments created</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-mono-200 dark:divide-mono-700">
                            {posts.map((post) => {
                                const isSelected = post.postId === selectedPostId;

                                return (
                                    <tr
                                        key={post.postId}
                                        className={cn(
                                            "cursor-pointer transition-colors hover:bg-primary-50 dark:hover:bg-primary-900/20",
                                            isSelected && "bg-primary-50/80 dark:bg-primary-900/30"
                                        )}
                                        onClick={() => onSelectPostId(post.postId)}
                                    >
                                        <td className="px-4 py-3 text-sm font-medium text-mono-900 dark:text-mono-100">
                                            {post.title}
                                        </td>
                                        <td className="px-4 py-3 text-sm text-mono-600 dark:text-mono-300">
                                            {formatPublicationState(post.publicationState)}
                                        </td>
                                        <td className="px-4 py-3 text-sm text-mono-600 dark:text-mono-300">
                                            {formatDate(post.createdAt)}
                                        </td>
                                        <td className="px-4 py-3 text-sm text-mono-600 dark:text-mono-300">
                                            {numberFormatter.format(post.lifetimeViews)}
                                        </td>
                                        <td className="px-4 py-3 text-sm text-mono-600 dark:text-mono-300">
                                            {numberFormatter.format(post.lifetimeComments)}
                                        </td>
                                        <td className="px-4 py-3 text-sm text-mono-600 dark:text-mono-300">
                                            {numberFormatter.format(post.lifetimeReactions)}
                                        </td>
                                        <td className="px-4 py-3 text-sm text-mono-600 dark:text-mono-300">
                                            {numberFormatter.format(post.periodCommentsCreated)}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </Card>
    );
};

export default RankedPostsTable;
