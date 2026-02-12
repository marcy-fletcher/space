import Card from "../../../layout/Card.tsx";
import Header from "../../../common/components/Header.tsx";
import Subtitle from "../../../common/components/Subtitle.tsx";
import type {Warning, WarningLevel} from "../../types/warning.ts";
import Badge from "../../../common/components/Badge.tsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faExclamationTriangle, faSpinner} from "@fortawesome/free-solid-svg-icons";
import {capitalizeWords} from "../../../utils/capitalizeWords.ts";
import Button from "../../../common/components/Button.tsx";
import {useMutation} from "@tanstack/react-query";
import {grantAgreement} from "../../services/posts.service.ts";
import type {Post} from "../../types/post.ts";
import {queryClient} from "../../../utils/common.ts";

interface UserAgreementProps {
    queryId?: string;
    postId: number;
    warnings: Omit<Warning, 'id' | 'postId'>[]
}

const getLevelValue = (x: WarningLevel) => {
    switch (x) {
        case 'extreme':
            return 0;
        case 'graphic':
            return 1;
        case 'moderate':
            return 2;
        case 'mild':
            return 3;
        default:
            return -1;
    }
};

const UserAgreement = ({postId, queryId, warnings}: UserAgreementProps) => {
    const sortedWarnings = warnings.sort(
        (a, b) => getLevelValue(a.level) - getLevelValue(b.level));

    const queryKey = ['post', queryId];
    const {mutate, isPending} = useMutation({
        mutationFn: grantAgreement,
        onSuccess: async () => {
            queryClient.setQueryData<Post>(queryKey, (x) => {
                if (!x)
                    return undefined;

                return {
                    ...x,
                    userAgreement: true
                }
            })
        }
    })

    return (
        <div className="container mx-auto px-4 max-w-lg flex flex-col gap-4">
            <Card className="text-base flex flex-col gap-4">
                <Header className="text-2xl">Content Warnings And Terms</Header>
                <Subtitle className="text-base">This story contains content that requires your acknowledgment before
                    reading.</Subtitle>

                <Header>This story contains:</Header>

                <div className="flex flex-col gap-2">
                    {sortedWarnings.map((warning, index) => {

                        if (warning.level === 'extreme' || warning.level === 'graphic') {
                            return (
                                <Badge variant='red' className="text-base" key={index}>
                                    <FontAwesomeIcon icon={faExclamationTriangle}/>
                                    {warning.text} ({capitalizeWords(warning.level)})
                                </Badge>
                            )
                        } else if (warning.level === 'moderate') {
                            return (
                                <Badge variant='gold' className="text-base" key={index}>
                                    <FontAwesomeIcon icon={faExclamationTriangle}/>
                                    {warning.text} ({capitalizeWords(warning.level)})
                                </Badge>
                            )
                        }

                        return (
                            <Badge variant='gray' className="text-base" key={index}>
                                <FontAwesomeIcon icon={faExclamationTriangle}/>
                                {warning.text} ({capitalizeWords(warning.level)})
                            </Badge>
                        );
                    })}
                </div>

                <Card className="p-4 text-justify shadow-none text-sm/6 text-mono-600 dark:text-mono-400">
                    <p>By proceeding, you acknowledge that this is a work of fiction.</p>
                    <br/>
                    <p>
                        The views expressed within are part of the story and do not represent the beliefs or opinions of
                        the author. You agree to engage with this content responsibly and solely for the purpose of
                        entertainment.
                    </p>
                </Card>

                <div className="grid grid-cols-2 gap-4">
                    <Button size="small" shape="square" variant="outline">I do not agree, Go Back</Button>
                    <Button disabled={isPending} size="small" shape="square" variant="submit"
                            onClick={() => mutate(postId)}>
                        {!isPending ?
                            "I Understand & Agree to Terms" :
                            <FontAwesomeIcon icon={faSpinner} spin/>
                        }
                    </Button>
                </div>
            </Card>
        </div>
    );
};

export default UserAgreement;