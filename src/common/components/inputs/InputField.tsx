import { type InputHTMLAttributes } from 'react';
import { cn } from "../../../utils/cn.ts";
import type { IconDefinition } from "@fortawesome/fontawesome-common-types";
import InputError from "./InputError.tsx";
import InputIcon from "./InputIcon.tsx";
import InputLabel from "./InputLabel.tsx";
import type { FieldValues, UseFormRegister, Path, FieldError } from "react-hook-form";

type InputFieldProps<TFieldValues extends FieldValues = FieldValues> = {
    id: Path<TFieldValues>;
    label?: string;
    icon?: IconDefinition;
    register?: UseFormRegister<TFieldValues>;
    error?: FieldError;
    className?: string;
    required?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

const InputField = <TFieldValues extends FieldValues = FieldValues>({
                                                                        id,
                                                                        label,
                                                                        icon,
                                                                        error,
                                                                        className,
                                                                        register,
                                                                        required,
                                                                        ...inputProps
                                                                    }: InputFieldProps<TFieldValues>) => {
    const hasError = !!error;

    return (
        <div className={cn("relative", className)}>
            {label && (
                <InputLabel
                    hasError={hasError}
                    className="mb-2"
                    isRequired={required}
                >
                    {label}
                </InputLabel>
            )}

            <div className="relative">
                {icon && <InputIcon icon={icon} hasError={hasError} />}

                <input
                    id={id}
                    {...register?.(id)}
                    {...inputProps}
                    required={required}
                    className={cn(
                        `w-full px-4 py-3 rounded-lg font-sans focus:outline-none border 
                        border-mono-200 dark:border-mono-600
                        focus:ring-2 focus:ring-pink-400 focus:border-transparent 
                        bg-white dark:bg-mono-700 text-mono-900 dark:text-mono-100
                        placeholder-mono-400 dark:placeholder-mono-500
                        disabled:opacity-50 disabled:cursor-not-allowed`,
                        hasError ? `border border-red-500 bg-red-50 dark:bg-red-900/20
                        focus:ring-2 focus:ring-red-400 focus:border-red-500` : "",
                        icon ? "pl-10" : ""
                    )}
                />
            </div>

            {hasError && <InputError errorMessage={error?.message ?? ''} />}
        </div>
    );
};

export default InputField;