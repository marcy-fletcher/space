import Card from "../../layout/Card.tsx";
import PageHeader from "../../layout/PageHeader.tsx";
import Button from "../../common/components/Button.tsx";
import {useDocumentTitle} from "../../layout/hooks/useDocumentTitle.ts";
import {z} from "zod";
import {useForm, useWatch} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import InputField from "../../common/components/inputs/InputField.tsx";
import InputCheckbox from "../../common/components/inputs/InputCheckbox.tsx";
import InputArea from "../../common/components/inputs/InputArea.tsx";
import {submitIdea} from "../services/ideas.services.ts";
import {toast} from "react-toastify";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";
import {useMutation} from "@tanstack/react-query";
import {ErrorCodes, logError} from "../../common/services/logging.service.ts";
import {usePageLog} from "../../common/hooks/usePageLog.ts";

interface IdeaSubmitInput {
    username: string;
    credits: boolean;
    idea: string;
}

const schema = z.object({
    username: z.string(),
    credits: z.boolean(),
    idea: z.string()
        .min(1, {message: "Idea text is required"})
}).superRefine(({credits, username}, ctx) => {
    if (credits && !username) {
        ctx.addIssue({
            code: "custom",
            message: "A username is required when credits are provided",
            path: ["username"]
        });
    }
});

const IdeaSubmit = () => {
    useDocumentTitle("Submit idea");
    usePageLog("Submit idea");

    const {
        register,
        control,
        reset,
        formState: {isValid, errors},
        handleSubmit
    } = useForm<IdeaSubmitInput>({
        resolver: zodResolver(schema),
        defaultValues: {username: '', credits: false, idea: ''},
        mode: "onChange"
    });

    const credits = useWatch({control, name: "credits"});

    const {mutateAsync, isPending} = useMutation({
        mutationFn: async (data:IdeaSubmitInput) => {
            await submitIdea(data.idea, data.credits ? data.username : undefined)
        },
        onSuccess: () => {
            toast.success("Idea successfully submitted!");
            reset();
        },
        onError: (error) => {
            logError(ErrorCodes.ideaSubmitError, error);
            toast.error("An error occurred while submitting your idea. Please try again later.");
        }
    });

    const {ref, ...rest} = register('idea');

    return (
        <div className="container mx-auto px-4 max-w-xl">
            <PageHeader title="Share Your Idea" subtitle="We’re excited to hear your creative ideas!"/>

            <Card className="flex flex-col gap-4">
                <form className="flex flex-col gap-4"
                      onSubmit={handleSubmit(async (data) => await mutateAsync(data))}
                      noValidate>
                    <div className={credits ? "block" : "hidden"}>
                        <InputField
                            id="username"
                            register={register}
                            placeholder="How should we credit you?"
                            error={errors.username}
                            label="Username (for credit)"
                            disabled={isPending}
                        />
                    </div>

                    <InputCheckbox
                        id="credits"
                        register={register}
                        label="Feature me as author if selected"
                        error={errors.credits}
                        disabled={isPending}
                    />

                    <InputArea id="idea"
                               {...rest}
                               ref={ref}
                               error={errors.idea}
                               disabled={isPending}
                    />

                    <p className="text-sm text-gray-500">
                        I welcome all ideas, though I can’t commit to writing them. Your idea may or may not appeal to
                        me.
                    </p>

                    <Button
                        variant="submit"
                        type="submit"
                        className="w-full"
                        disabled={!isValid || isPending}
                    >
                        {isPending ? (
                            <FontAwesomeIcon icon={faSpinner} spin/>
                        ) : (
                            "Submit Your Idea"
                        )}
                    </Button>
                </form>
            </Card>
        </div>
    );
};

export default IdeaSubmit;
