import Card from "../layout/Card.tsx";
import {
    faArrowLeft,
    faUser,
    faLock,
    faEnvelope,
    faKey, faSpinner,
} from '@fortawesome/free-solid-svg-icons';
import Button from "../common/components/Button.tsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useNavigate} from "react-router-dom";
import {useDocumentTitle} from "../layout/hooks/useDocumentTitle.ts";
import {z} from 'zod';
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import InputField from "../common/components/inputs/InputField.tsx";
import {useAuth} from "../auth/hooks/useAuth.ts";
import {AuthApiError} from "@supabase/supabase-js";
import {useMutation} from "@tanstack/react-query";
import CredentialsCheckError from "../auth/errors.ts";
import {toast} from "react-toastify";
import {useState} from "react";
import EmailConfirmation from "./EmailConfirmation.tsx";
import PageHeader from "../layout/PageHeader.tsx";
import {ErrorCodes, EventCodes, logError, logInfo} from "../common/services/logging.service.ts";
import {usePageLog} from "../common/hooks/usePageLog.ts";

interface RegisterInput {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const schema = z.object({
    username: z.string()
        .min(3, {message: "Username must be at least 3 characters long"})
        .max(20, {message: "Username must be no longer than 20 characters"})
        .min(1, {message: "Username is required"}),

    email: z
        .email({message: "Invalid email address"})
        .min(1, {message: "Email is required"}),

    password: z.string()
        .min(6, {message: "Password must be at least 6 characters long"})
        .max(20, {message: "Password must be no longer than 20 characters"})
        .min(1, {message: "Password is required"}),

    confirmPassword: z.string()
        .min(6, {message: "Password must be at least 6 characters long"})
        .max(20, {message: "Password must be no longer than 20 characters"})
        .min(1, {message: "Confirm Password is required"}),
}).superRefine(({confirmPassword, password}, ctx) => {
    if (confirmPassword !== password) {
        ctx.addIssue({
            code: "custom",
            message: "The passwords did not match",
            path: ['confirmPassword']
        });
    }
});


const Register = () => {
    const navigate = useNavigate();
    const {signUp} = useAuth();

    const [showConfirmationMessage, setShowConfirmationMessage] = useState(false);

    const {
        getValues,
        register,
        formState: {isValid, errors},
        setError,
        handleSubmit
    } = useForm<RegisterInput>({resolver: zodResolver(schema), mode: "onChange"});

    useDocumentTitle('Register');
    usePageLog('Register');

    const {mutateAsync, isPending} = useMutation({
        mutationFn: async (data: RegisterInput) => await signUp(data.username, data.email, data.password),
        onError: error => {
            logError(ErrorCodes.registrationError, error);

            if (error instanceof AuthApiError) {
                setError("email", {type: "custom", message: error.message});
            } else if (error instanceof CredentialsCheckError) {
                if (error.emailUnavailable) {
                    setError("email", {type: "custom", message: "This email is already in use."});
                }

                if (error.usernameUnavailable) {
                    setError("username", {type: "custom", message: "This username is already taken."});
                }
            } else {
                toast.error("An unexpected error occurred. Please try again later.");
            }
        },
        onSuccess: () => {
            logInfo(EventCodes.signUp);
            setShowConfirmationMessage(true);
        }
    });

    if (showConfirmationMessage) {
        return <EmailConfirmation
            message={
            `Please check your inbox (${getValues('email')}) 
            and confirm your email address to complete the registration process. 
            If you haven't received the email, check your spam folder or 
            request a new one.`}
        />
    }

    return (
        <div className="w-full min-h-screen flex flex-col items-center justify-center my-8">
            <PageHeader title="Create Account" subtitle="Sign up to start your journey"/>

            <form className="w-full max-w-md"
                  onSubmit={handleSubmit(async (data) => await mutateAsync(data))}
                  noValidate>
                <Card className="w-full space-y-6">

                    <InputField disabled={isPending} icon={faUser} label="Username" id="username" register={register}
                                error={errors.username}/>
                    <InputField disabled={isPending} icon={faEnvelope} label="Email" id="email" type="email"
                                register={register} error={errors.email}/>
                    <InputField disabled={isPending} icon={faLock} label="Password" id="password" type="password"
                                register={register}
                                error={errors.password}/>
                    <InputField disabled={isPending} icon={faKey} label="Confirm password" id="confirmPassword"
                                type="password" register={register}
                                error={errors.confirmPassword}/>

                    <Button disabled={!isValid || isPending} className="w-full" type="submit">
                        {isPending ? (
                            <FontAwesomeIcon icon={faSpinner} spin/>
                        ) : (
                            "Sign Up"
                        )}
                    </Button>
                </Card>
            </form>

            <Button
                variant="link"
                className="w-full max-w-md flex justify-center items-center mt-4 gap-2"
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

export default Register;
