import SearchInput from "../components/posts/SearchInput.tsx";
import {defaultLimit, defaultPage, useSearchStore} from "../model/searchStore.ts";
import LoadingPostCard from "../components/post-card/LoadingPostCard.tsx";
import NoDataFound from "../components/posts/NoDataFound.tsx";
import PaginationInfo from "../components/posts/PaginationInfo.tsx";
import Pagination from "../components/posts/Pagination.tsx";
import {usePosts} from "../hooks/usePosts.ts";
import PageHeader from "../../layout/PageHeader.tsx";
import {useDocumentTitle} from "../../layout/hooks/useDocumentTitle.ts";
import {lazy, Suspense} from "react";
import {usePageLog} from "../../common/hooks/usePageLog.ts";

const Filters = lazy(() => import("../components/posts/Filters.tsx"));
const AvailablePostCard = lazy(() => import("../components/post-card/AvailablePostCard.tsx"));
const UnavailablePostCard = lazy(() => import("../components/post-card/UnavailablePostCard.tsx"));

const Posts = () => {
    const {data: response, total, isLoading, params} = usePosts();
    const {initialized} = useSearchStore();

    useDocumentTitle("Home");
    usePageLog('Home', params, initialized && response && !isLoading)

    return (
        <div className="container mx-auto px-4 max-w-7xl">

            <PageHeader title="Marcy's Library"
                        subtitle="A collection of my manuscripts and scribbles..."
            />

            <SearchInput/>

            <Suspense>
                <Filters/>
            </Suspense>

            <PaginationInfo
                currentPage={params.page ? parseInt(params.page) : defaultPage}
                pageSize={params.limit ? parseInt(params.limit) : defaultLimit}
                total={response ? total : 0}
                searchTerm={params.term}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 justify-items-center">

                {!isLoading && response && response.posts && response.posts.length === 0 && !isLoading &&
                    <NoDataFound className="col-span-full"/>
                }

                {isLoading && (
                    <>
                        <LoadingPostCard/>
                        <LoadingPostCard/>
                        <LoadingPostCard/>
                    </>
                )}

                {!isLoading && response && response.posts && response.posts.length > 0 &&
                    response.posts.map(post => (post.title ?
                            <Suspense key={post.id} fallback={<LoadingPostCard/>}><AvailablePostCard
                                post={post}/></Suspense> :
                            <Suspense key={post.id} fallback={<LoadingPostCard/>}><UnavailablePostCard
                                post={post}/></Suspense>
                    ))
                }
            </div>

            <Pagination
                className="mt-6 p-2 flex"
                totalPages={Math.ceil(total / (params.limit ? parseInt(params.limit) : defaultLimit))}
            />
        </div>
    );
};

export default Posts;
