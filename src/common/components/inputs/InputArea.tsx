import type {FieldError, FieldValues, Path, UseFormRegister} from "react-hook-form";
import type {InputHTMLAttributes, Ref} from "react";
import {cn} from "../../../utils/cn.ts";
import InputLabel from "./InputLabel.tsx";
import InputError from "./InputError.tsx";

type InputAreaProps<TFieldValues extends FieldValues = FieldValues> = {
    id: Path<TFieldValues>;
    label?: string;
    register?: UseFormRegister<TFieldValues>;
    error?: FieldError;
    className?: string;
    ref: Ref<HTMLTextAreaElement>
} & InputHTMLAttributes<HTMLTextAreaElement>;

const InputArea = <TFieldValues extends FieldValues>({
                                                         id,
                                                         ref,
                                                         label,
                                                         register,
                                                         error,
                                                         className,
                                                         required,
                                                         ...inputProps
                                                     }: InputAreaProps<TFieldValues>) => {
    const hasError = !!error;

    return (
        <div className={cn("flex flex-col", className)}>
            {label && <InputLabel isRequired={required} hasError={hasError} className="mb-2">
                {label}
            </InputLabel>}

            <div className="flex grow">
                <textarea ref={ref} id={id} {...register?.(id)} {...inputProps}
                          className={cn(
                              `w-full flex grow px-4 py-3 rounded-lg font-sans focus:outline-none 
                      bg-white dark:bg-mono-700 text-mono-900 dark:text-mono-100 
                      placeholder-mono-400 dark:placeholder-mono-500 border border-mono-200 
                      dark:border-mono-600 focus:ring-2 focus:ring-pink-400 focus:border-transparent
                      disabled:opacity-50 disabled:cursor-not-allowed`,
                              error ? `border border-red-500 bg-red-50 dark:bg-red-900/20 
                      focus:ring-2 focus:ring-red-400 focus:border-red-500` : ""
                          )}
                />
            </div>

            {hasError && <InputError errorMessage={error?.message ?? ''}/>}
        </div>
    );
};

export default InputArea;