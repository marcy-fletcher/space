import Card from "../layout/Card.tsx";
import {faArrowLeft, faEnvelope, faLock, faSpinner} from '@fortawesome/free-solid-svg-icons';
import Button from "../common/components/Button.tsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useAuth} from "../auth/hooks/useAuth.ts";
import {useNavigate} from "react-router-dom";
import {useDocumentTitle} from "../layout/hooks/useDocumentTitle.ts";
import InputField from "../common/components/inputs/InputField.tsx";
import {useForm} from "react-hook-form";
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';
import {useMutation} from "@tanstack/react-query";
import {AuthApiError} from "@supabase/supabase-js";
import PageHeader from "../layout/PageHeader.tsx";
import {ErrorCodes, EventCodes, logError, logInfo} from "../common/services/logging.service.ts";
import {toast} from "react-toastify";
import {usePageLog} from "../common/hooks/usePageLog.ts";

interface LoginInput {
    email: string
    password: string
}

const schema = z.object({
    email: z.email({message: "Invalid email address"})
        .min(1, {message: "Email is required"}),

    password: z.string()
        .min(6, {message: "Password must be at least 6 characters long"})
        .max(20, {message: "Password must be no longer than 20 characters"})
        .min(1, {message: "Password is required"}),
});

const Login = () => {

    useDocumentTitle('Login');
    usePageLog('Login');

    const {register, formState: {isValid, errors}, setError, handleSubmit} = useForm<LoginInput>({resolver: zodResolver(schema), mode: "onChange"});
    const {signIn} = useAuth();

    const navigate = useNavigate();

    const {mutateAsync, isPending} = useMutation({
        mutationFn: async (data:LoginInput) => signIn(data.email, data.password),
        onError: (error) => {
            logError(ErrorCodes.authenticationError, error);

            if (error instanceof AuthApiError)
                setError("email", {type: "custom", message: error.message});

            toast.error("An unexpected error occurred. Please try again later.");
        },
        onSuccess: () => {
            logInfo(EventCodes.signIn)

            window.scrollTo(0, 0);
            navigate('/');
        }
    });

    return (
        <div className="w-full min-h-screen flex flex-col items-center justify-center">
            <PageHeader title="Welcome Back" subtitle="Sign in to continue your journey"/>

            <form className="w-full max-w-md" onSubmit={handleSubmit(async (data) => await mutateAsync(data))} noValidate>
                <Card className="w-full space-y-6">

                    <InputField disabled={isPending} icon={faEnvelope} id="email" label="Email" type="email" register={register} error={errors.email}/>
                    <InputField disabled={isPending} icon={faLock} id="password" label="Password" type="password" register={register} error={errors.password}/>

                    <Button disabled={!isValid || isPending} className="w-full" type="submit">
                        {isPending ? (
                            <FontAwesomeIcon icon={faSpinner} spin/>
                        ) : (
                            "Sign In"
                        )}
                    </Button>
                </Card>
            </form>

            <Button variant="link" className="w-full max-w-md flex justify-center items-center mt-4 gap-2"
                onClick={() => {
                    window.scrollTo(0, 0);
                    navigate('/');
                }}
            >
                <FontAwesomeIcon icon={faArrowLeft}/>
                Back to main page
            </Button>
        </div>
    );
};

export default Login;