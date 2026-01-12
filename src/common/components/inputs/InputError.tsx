interface InputErrorProps {
    errorMessage: string
}

const InputError = ({errorMessage}: InputErrorProps) => {
    return (
        <p className={"mt-1.5 text-sm text-red-600 dark:text-red-400 font-sans leading-snug"}>
            {errorMessage}
        </p>
    );
};

export default InputError;