import {formatDate} from "../../../utils/formatDate.ts";
import {cn} from "../../../utils/cn.ts"

interface PostCardHeaderProps {
    title: string;
    pictureUrl?: string;
    createdAt?: string;
    className?: string;
}

const Header = ({title, pictureUrl, createdAt, className}: PostCardHeaderProps) => {
    return (
        <div className={cn("flex items-start gap-4", className)}>
            {pictureUrl && <img
                src={pictureUrl}
                alt={`Preview for ${title}`}
                className="w-16 h-16 rounded-full object-cover text-transparent shrink-0 shadow-md border-2 border-primary-200 dark:border-primary-600"
            />}

            <div className="min-w-0">
                <h2 className="text-3xl text-wrap wrap-break-word break-normal font-bold text-mono-800 dark:text-mono-100 font-serif group-hover:text-primary-700 dark:group-hover:text-primary-400">
                    {title}
                </h2>
                {createdAt && <time className="text-sm text-primary-500 dark:text-primary-400 font-medium font-sans">
                    {formatDate(createdAt)}
                </time>}
            </div>
        </div>
    );
};

export default Header;