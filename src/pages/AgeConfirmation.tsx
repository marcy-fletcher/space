import Card from "../layout/Card.tsx";
import Header from "../common/components/Header.tsx";
import Button from "../common/components/Button.tsx";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import Divider from "../common/components/Divider.tsx";
import {DEBUG_LOGGING_ALLOWED_KEY, EventCodes, logInfo} from "../common/services/logging.service.ts";
import {AGE_VERIFIED_KEY} from "../utils/common.ts";

const AgeConfirmation = () => {
    const [confirmationClicked, setConfirmationClicked] = useState(false);
    const [debugLoggingAllowed, setDebugLoggingAllowed] = useState(false);

    const handleAgeConfirmation = async () => {
        setConfirmationClicked(true);
        localStorage.setItem(AGE_VERIFIED_KEY, 'true');
        localStorage.setItem(DEBUG_LOGGING_ALLOWED_KEY, debugLoggingAllowed ? 'true' : 'false');

        window.location.reload();

        logInfo(EventCodes.ageConfirm);
    };

    return (
        <div className="bg-mono-200 dark:bg-mono-900 min-h-screen flex items-center justify-center min-w-0">
            <Card className="flex flex-col gap-4 max-w-md items-center">
                <Header className="uppercase select-none">
                    Age Verification Required
                </Header>
                <p className="text-mono-600 dark:text-mono-400 text-justify select-none">
                    This website contains content intended for adults only. You must be 18 years or older to access this site.
                </p>

                <p className="text-sm text-mono-500 select-none">
                    By entering this site, you confirm that you are of legal age.
                </p>

                <Divider className="m-0" />

                <div className="flex items-start gap-2.5">
                    <input
                        id="debugLogging"
                        type="checkbox"
                        className="mt-1 h-5 w-5 rounded border-mono-500 bg-mono-700"
                        checked={debugLoggingAllowed}
                        onChange={() => setDebugLoggingAllowed(prev => !prev)}
                    />
                    <label
                        htmlFor="debugLogging"
                        className="text-sm text-mono-400 leading-6 cursor-pointer"
                    >
                        I consent to the collection of anonymized user activity logs for development purposes only. (Optional)
                    </label>

                </div>

                <Divider className="m-0" />

                <Button
                    disabled={confirmationClicked}
                    variant="submit"
                    className="w-full h-15"
                    onClick={handleAgeConfirmation}
                >
                    {confirmationClicked ? (
                        <FontAwesomeIcon icon={faSpinner} spin />
                    ) : (
                        "I am 18 years or older"
                    )}
                </Button>

                <Button
                    onClick={() => (window.location.href = "https://google.com")}
                    variant="secondary"
                    className="w-full"
                >
                    Exit Site
                </Button>
            </Card>
        </div>
    );
};

export default AgeConfirmation;
