import {cn} from "../utils/cn.ts";
import {faEnvelope} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Button from "../common/components/Button.tsx";
import {useNavigate} from "react-router-dom";
import {useDocumentTitle} from "../layout/hooks/useDocumentTitle.ts";

import emailConfirmation from "../../public/404.webp";

interface EmailConfirmationProps {
    title?: string;
    message?: string;
    imageSrc?: string;
    className?: string;
}

const EmailConfirmation = ({
                               title = "Email Confirmation",
                               message = "Please check your inbox and confirm your email address to complete the registration process. If you haven't received the email, check your spam folder or request a new one.",
                               imageSrc = emailConfirmation,
                               className,
                           }: EmailConfirmationProps) => {

    useDocumentTitle('Email Confirmation');

    const navigate = useNavigate();

    return (
        <div
            className={cn(
                "w-full min-h-[60vh] flex items-center justify-center px-4 sm:px-6 bg-mono-50 dark:bg-mono-900",
                className
            )}
        >
            <div className="max-w-3xl w-full">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8">
                    <div className="shrink-0 md:-mr-24 md:-mt-10 md:relative md:z-5">
                        <div className="w-78 h-78">
                            <img
                                src={imageSrc}
                                alt="Email confirmation"
                                className="w-full h-full object-contain select-none text-transparent"
                                draggable={false}
                            />
                        </div>
                    </div>

                    <div
                        className="flex-1 bg-white dark:bg-mono-800 rounded-xl md:rounded-2xl shadow-lg p-6 md:p-8 text-center md:text-left">
                        <h1 className="text-3xl md:text-4xl font-bold font-sans mb-4 flex items-center justify-center md:justify-start gap-3 text-mono-900 dark:text-mono-100">
                            <FontAwesomeIcon icon={faEnvelope}
                                             className="text-primary-500 animate-pulse"/>
                            {title}
                        </h1>

                        <p
                            className="text-base md:text-lg font-sans leading-relaxed mb-6 text-mono-600 dark:text-mono-400"
                        >
                            {message}
                        </p>

                        <div className="flex justify-center md:justify-start gap-4">
                            <Button shape="square" className="w-full md:w-auto px-5 py-3 z-20"
                                    onClick={() => navigate("/")}>
                                Go Home
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmailConfirmation;