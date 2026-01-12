import { cn } from "../utils/cn.ts";
import { faBolt, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../common/components/Button.tsx";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../auth/hooks/useAuth.ts";
import {useDocumentTitle} from "../layout/hooks/useDocumentTitle.ts";
import {ErrorCodes} from "../common/services/logging.service.ts";
import {useLogError} from "../common/hooks/useLogError.ts";

interface UnauthorizedProps {
    title?: string;
    message?: string;
    imageSrc?: string;
    className?: string;
}

const Unauthorized = ({
                          title = "Unauthorized",
                          message = "You don't have permission to access this page. Please log in with the correct account or contact your administrator.",
                          imageSrc = "/public/403.webp",
                          className,
                      }: UnauthorizedProps) => {

    useDocumentTitle('Unauthorized');
    useLogError(ErrorCodes.unauthorized);

    const {isAuthenticated} = useAuth();
    const navigate = useNavigate();

    return (
        <div
            className={cn(
                "w-full min-h-[60vh] flex items-center justify-center px-4 sm:px-6",
                className
            )}
        >
            <div className="max-w-3xl w-full">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8">
                    <div className="shrink-0 md:-mr-34 md:-mt-18 md:relative md:z-5">
                        <div className="w-78 h-78">
                            <img
                                src={imageSrc}
                                alt="Unauthorized access"
                                className="w-full h-full object-contain select-none text-transparent"
                                draggable={false}
                            />
                        </div>
                    </div>

                    <div className="flex-1 bg-white dark:bg-mono-800 rounded-xl md:rounded-2xl shadow-lg p-6 md:p-8 text-center md:text-left">
                        <h1 className="text-3xl md:text-4xl font-bold font-sans mb-4 flex items-center justify-center md:justify-start gap-3 text-mono-900 dark:text-mono-100">
                            <FontAwesomeIcon icon={faBolt} className="text-primary-500 animate-pulse" />
                            {title}
                        </h1>

                        <p
                            className="text-base md:text-lg font-sans leading-relaxed mb-6 text-mono-600 dark:text-mono-400"
                        >
                            {message}
                        </p>

                        <div className="flex flex-col md:flex-row justify-center md:justify-start gap-4">
                            {!isAuthenticated && <Button shape="square" className="w-full md:w-auto px-5 py-3 z-20" onClick={() => navigate("/login")}>
                                Sign In
                            </Button>}
                            <Button shape="square" variant="outline" className="w-full md:w-auto px-5 py-3 z-20" onClick={() => navigate(-1)}>
                                Go Back <FontAwesomeIcon icon={faArrowRight}/>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Unauthorized;
