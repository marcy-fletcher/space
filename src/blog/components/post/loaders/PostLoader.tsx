import Card from "../../../../layout/Card.tsx";
import ReactionsLoader from "./ReactionsLoader.tsx";
import MarkdownLoader from "./MarkdownLoader.tsx";

const PostLoader = () => {
    return (
        <div className="container mx-auto px-4 max-w-4xl min-h-screen">
            <Card className="p-8 md:p-12 mt-4 animate-pulse">
                <div className="h-12 w-3/4 bg-mono-200 dark:bg-mono-700 rounded-3xl mb-4"></div>
                <div className="h-6 w-1/4 bg-mono-200 dark:bg-mono-700 rounded-3xl mb-4"></div>

                <div className="flex flex-wrap gap-2 mt-2">
                    <div className="h-8 w-24 bg-mono-200 dark:bg-mono-700 rounded-full"></div>
                    <div className="h-8 w-24 bg-mono-200 dark:bg-mono-700 rounded-full"></div>
                </div>

                <ReactionsLoader/>

                <div className="h-px bg-mono-300 dark:bg-mono-600 my-6"></div>

                <MarkdownLoader/>
            </Card>
        </div>
    );
};

export default PostLoader;
