import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import {cn} from "../../utils/cn.ts";

interface UserImageProps {
    source?: string;
    alt: string;
    className?: string;
}

const UserImage = ({source, alt, className}: UserImageProps) => {
    return (
        <>
            {source ? (
                <img
                    src={source}
                    alt={alt}
                    className={cn("min-w-8 w-8 h-8 rounded-full object-cover text-transparent", className)}
                />
            ) : (
                <div className={cn("min-w-8 w-8 h-8 bg-mono-400 dark:bg-mono-600 rounded-full flex items-center justify-center text-white", className)}>
                    <FontAwesomeIcon icon={faUser} />
                </div>
            )}
        </>
    );
};

export default UserImage;