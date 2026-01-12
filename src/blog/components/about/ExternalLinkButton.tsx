import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {cn} from "../../../utils/cn.ts";
import type {IconDefinition} from "@fortawesome/fontawesome-common-types";
import {faExternalLinkAlt, faClipboardCheck, faCopy} from "@fortawesome/free-solid-svg-icons";
import {useState} from "react";

type Variant = "indigo" | "green" | "gray";
type Action = "open" | "copy" | "none";

interface ContactButtonProps {
    title: string;
    subtitle?: string;
    variant: Variant;
    icon?: IconDefinition;
    image?: string;
    actionType?: Action;
    content?: string;
    className?: string;
    isClickable?: boolean;
}

function getVariant(variant:Variant) {
    if (variant === "indigo") {
        return "bg-indigo-400";
    } else if (variant === "green") {
        return "bg-green-400";
    } else if (variant === "gray") {
        return "bg-gray-400";
    }
}

const ExternalLinkButton = ({
                           title,
                           subtitle,
                           variant,
                           icon,
                           image,
                           className,
                           actionType = "none",
                           content = "",
                           isClickable = true
                       }: ContactButtonProps) => {
    const [isCopied, setIsCopied] = useState(false);

    function handleClick() {
        if (!isClickable) return;

        if (actionType === "copy") {
            navigator.clipboard.writeText(content);
            setIsCopied(true);

            setTimeout(() => {
                setIsCopied(false);
            }, 2000);
        }
    }

    return (
        <a
            href={actionType === 'open' ? content : undefined}
            className={cn(
                "bg-white dark:bg-mono-800 shadow-lg border border-mono-200 dark:border-mono-700 p-6 rounded-2xl",
                `flex items-center justify-between p-3 dark:bg-mono-700/60 dark:border-mono-500`,
                actionType !== "none" && isClickable ? "hover:border-primary-500 cursor-pointer" : "",
                className
            )}
            onClick={isClickable && actionType !== "none" ? handleClick : undefined}
        >
            <div className="w-full flex items-center justify-between gap-3 relative">
                {(image || icon) && <div
                    className={cn(
                        "min-w-10 h-10 rounded-full flex items-center justify-center",
                        getVariant(variant),
                    )}
                >
                    {image ? (
                        <img src={image} alt="icon" className="border min-w-10 w-10 max-w-10 border-mono-500 min-h-10 h-10 max-h-10 object-cover rounded-full"/>
                    ) : icon && (
                        <FontAwesomeIcon icon={icon} className="text-white"/>
                    )}
                </div>}

                <div className="text-left grow flex flex-col max-w-full overflow-hidden">
                    <p className="text-sm text-gray-900 dark:text-white truncate">
                        {title}
                    </p>
                    {subtitle && <p className="text-gray-500 dark:text-gray-400 text-ssm truncate">
                        {subtitle}
                    </p>}
                </div>

                {actionType === "open" && <FontAwesomeIcon icon={faExternalLinkAlt} className="text-gray-400 text-lg" />}
                {actionType === "copy" && (!isCopied ? (
                    <FontAwesomeIcon icon={faCopy} className="text-gray-400 text-lg" />
                ) : (
                    <FontAwesomeIcon icon={faClipboardCheck} className="text-gray-400 text-lg" />
                ))}
            </div>
        </a>
    );
};

export default ExternalLinkButton;
