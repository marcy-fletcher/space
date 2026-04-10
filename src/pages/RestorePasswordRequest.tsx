import Card from "../layout/Card.tsx";
import {faArrowLeft, faEnvelope, faSpinner} from "@fortawesome/free-solid-svg-icons";
import Button from "../common/components/Button.tsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useNavigate} from "react-router-dom";
import {useDocumentTitle} from "../layout/hooks/useDocumentTitle.ts";
import InputField from "../common/components/inputs/InputField.tsx";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {useMutation} from "@tanstack/react-query";
import {AuthApiError} from "@supabase/supabase-js";
import PageHeader from "../layout/PageHeader.tsx";
import {ErrorCodes, logError} from "../common/services/logging.service.ts";
import {toast} from "react-toastify";
import {usePageLog} from "../common/hooks/usePageLog.ts";
import {useAuth} from "../auth/hooks/useAuth.ts";
import EmailConfirmation from "./EmailConfirmation.tsx";

interface RestorePasswordRequestInput {
    email: string
}

const schema = z.object({
    email: z.email({message: "Invalid email address"})
        .min(1, {message: "Email is required"}),
});

const RestorePasswordRequest = () => {
    useDocumentTitle("Restore Password");
    usePageLog("Restore Password Request");

    const navigate = useNavigate();
    const {requestPasswordReset} = useAuth();
    const {register, formState: {isValid, errors}, setError, handleSubmit, getValues} = useForm<RestorePasswordRequestInput>({
        resolver: zodResolver(schema),
        mode: "onChange",
    });

    const {mutateAsync, isPending, isSuccess} = useMutation({
        mutationFn: async (data: RestorePasswordRequestInput) => requestPasswordReset(data.email),
        onError: (error) => {
            logError(ErrorCodes.authenticationError, error);

            if (error instanceof AuthApiError) {
                setError("email", {type: "custom", message: error.message});
                return;
            }

            toast.error("An unexpected error occurred. Please try again later.");
        },
    });

    if (isSuccess) {
        return (
            <EmailConfirmation
                title="Reset Link Sent"
                message={`We sent a password reset link to ${getValues("email")}. Open the email to continue, then come back here to set a new password.`}
            />
        );
    }

    return (
        <div className="w-full min-h-screen flex flex-col items-center justify-center">
            <PageHeader title="Restore Password" subtitle="Enter your email and we will send you a reset link"/>

            <form className="w-full max-w-md" onSubmit={handleSubmit(async (data) => await mutateAsync(data))} noValidate>
                <Card className="w-full space-y-6">
                    <InputField
                        disabled={isPending}
                        icon={faEnvelope}
                        id="email"
                        label="Email"
                        type="email"
                        register={register}
                        error={errors.email}
                    />

                    <Button disabled={!isValid || isPending} className="w-full" type="submit">
                        {isPending ? <FontAwesomeIcon icon={faSpinner} spin/> : "Send Reset Link"}
                    </Button>
                </Card>
            </form>

            <Button
                variant="link"
                className="w-full max-w-md flex justify-center items-center mt-4 gap-2"
                onClick={() => {
                    window.scrollTo(0, 0);
                    navigate("/login");
                }}
            >
                <FontAwesomeIcon icon={faArrowLeft}/>
                Back to sign in
            </Button>
        </div>
    );
};

export default RestorePasswordRequest;
