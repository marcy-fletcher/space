import Card from "../../../layout/Card.tsx";

const LoadingCard = () => {
    return (
        <Card className="w-full min-h-120 max-w-lg flex flex-col animate-pulse p-4">
            <div className="flex items-center space-x-4 my-4">
                <div className="w-16 h-16 rounded-full bg-mono-200 dark:bg-mono-700"></div>
                <div className="flex-1 h-16 bg-mono-200 dark:bg-mono-700 rounded-3xl"></div>
            </div>

            <div className="h-10 bg-mono-200 dark:bg-mono-700 rounded-3xl flex grow"></div>
            <div className="h-10 mt-4 bg-mono-200 dark:bg-mono-700 rounded-3xl"></div>
        </Card>
    );
};

export default LoadingCard;
