import {useState} from 'react'
import {cn} from "../../utils/cn.ts";
import UserImage from "../../common/components/UserImage.tsx";
import FoldoutIcon from "../../common/components/FoldoutIcon.tsx";
import UserMenu from "./UserMenu.tsx";
import {useAuth} from "../../auth/hooks/useAuth.ts";

interface UserButtonProps {
    className?: string,
}

export function UserButton({className}: UserButtonProps) {
    const [isOpen, setIsOpen] = useState(false)
    const {username, picture} = useAuth();

    return (
        <>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={cn("flex items-center gap-2 bg-white/95 dark:bg-mono-800/95 hover:bg-white dark:hover:bg-mono-800 backdrop-blur-md rounded-full pr-4 pl-3 py-2 text-mono-700 dark:text-mono-300 border border-mono-200 dark:border-mono-600 shadow-sm", className)}
            >
                <UserImage source={picture ?? undefined} alt={username ?? 'Profile picture'}/>
                <span className="text-sm font-medium text-nowrap truncate">{username}</span>
                <FoldoutIcon isOpen={isOpen}/>
            </button>
            {
                isOpen && <UserMenu/>
            }
        </>
    )
}
