import {faArrowLeft, faKey, faLock, faSpinner} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {AuthApiError} from "@supabase/supabase-js";
import {useMutation} from "@tanstack/react-query";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {z} from "zod";
import {useAuth} from "../auth/hooks/useAuth.ts";
import Button from "../common/components/Button.tsx";
import {usePageLog} from "../common/hooks/usePageLog.ts";
import {ErrorCodes, logError} from "../common/services/logging.service.ts";
import InputField from "../common/components/inputs/InputField.tsx";
import Card from "../layout/Card.tsx";
import {useDocumentTitle} from "../layout/hooks/useDocumentTitle.ts";
import PageHeader from "../layout/PageHeader.tsx";

interface RestorePasswordUpdateInput {
    password: string;
    confirmPassword: string;
}

const schema = z.object({
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
            path: ["confirmPassword"],
        });
    }
});

const RestorePasswordUpdate = () => {
    useDocumentTitle("Set New Password");
    usePageLog("Restore Password Update");

    const navigate = useNavigate();
    const {updatePassword} = useAuth();

    const {
        register,
        formState: {isValid, errors},
        setError,
        handleSubmit,
    } = useForm<RestorePasswordUpdateInput>({
        resolver: zodResolver(schema),
        mode: "onChange",
    });

    const {mutateAsync, isPending} = useMutation({
        mutationFn: async (data: RestorePasswordUpdateInput) => updatePassword(data.password),
        onError: (error) => {
            logError(ErrorCodes.authenticationError, error);

            if (error instanceof AuthApiError) {
                setError("password", {type: "custom", message: error.message});
                return;
            }

            toast.error("An unexpected error occurred. Please try again later.");
        },
        onSuccess: () => {
            toast.success("Password updated. Please sign in with your new password.");
            navigate("/login", {replace: true});
        },
    });

    return (
        <div className="w-full min-h-screen flex flex-col items-center justify-center my-8">
            <PageHeader title="Set New Password" subtitle="Choose a new password for your account"/>

            <form className="w-full max-w-md" onSubmit={handleSubmit(async (data) => await mutateAsync(data))} noValidate>
                <Card className="w-full space-y-6">
                    <InputField
                        disabled={isPending}
                        icon={faLock}
                        label="New Password"
                        id="password"
                        type="password"
                        register={register}
                        error={errors.password}
                    />
                    <InputField
                        disabled={isPending}
                        icon={faKey}
                        label="Confirm Password"
                        id="confirmPassword"
                        type="password"
                        register={register}
                        error={errors.confirmPassword}
                    />

                    <Button disabled={!isValid || isPending} className="w-full" type="submit">
                        {isPending ? <FontAwesomeIcon icon={faSpinner} spin/> : "Update Password"}
                    </Button>
                </Card>
            </form>

            <Button
                variant="link"
                className="w-full max-w-md flex justify-center items-center mt-4 gap-2"
                onClick={() => {
                    window.scrollTo(0, 0);
                    navigate("/restore-password");
                }}
            >
                <FontAwesomeIcon icon={faArrowLeft}/>
                Request a new reset link
            </Button>
        </div>
    );
};

export default RestorePasswordUpdate;
