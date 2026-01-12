import { type InputHTMLAttributes } from 'react';
import { cn } from "../../../utils/cn.ts";
import type { IconDefinition } from "@fortawesome/fontawesome-common-types";
import InputError from "./InputError.tsx";
import InputIcon from "./InputIcon.tsx";
import type { FieldValues, UseFormRegister, Path, FieldError } from "react-hook-form";

type CompactInputFieldProps<TFieldValues extends FieldValues = FieldValues> = {
    id: Path<TFieldValues>;
    label?: string;
    icon?: IconDefinition;
    register?: UseFormRegister<TFieldValues>;
    error?: FieldError;
    className?: string;
    required?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

const CompactInputField = <TFieldValues extends FieldValues = FieldValues>({
                                                                               id,
                                                                               label,
                                                                               icon,
                                                                               error,
                                                                               className,
                                                                               register,
                                                                               required,
                                                                               ...inputProps
                                                                           }: CompactInputFieldProps<TFieldValues>) => {
    const hasError = !!error;

    return (
        <div className={cn("relative", className)}>
            {label && (
                <label
                    htmlFor={id}
                    className={cn("text-sm font-medium text-mono-700 dark:text-mono-300", hasError ? "text-red-500" : "")}
                >
                    {label} {required && <span className="text-red-500">*</span>}
                </label>
            )}

            <div className="relative mt-1">
                {icon && <InputIcon icon={icon} hasError={hasError} />}
                <input
                    id={id}
                    {...register?.(id)}
                    {...inputProps}
                    required={required}
                    className={cn(
                        `w-full px-3 py-2 rounded-md text-sm font-sans focus:outline-none border 
                        border-mono-300 dark:border-mono-600
                        focus:ring-2 focus:ring-pink-400 focus:border-transparent 
                        bg-white dark:bg-mono-700 text-mono-900 dark:text-mono-100
                        placeholder-mono-400 dark:placeholder-mono-500
                        disabled:opacity-50 disabled:cursor-not-allowed`,
                        hasError ? `border-red-500 bg-red-50 dark:bg-red-900/20 
                        focus:ring-2 focus:ring-red-400 focus:border-red-500` : "",
                        icon ? "pl-10" : ""
                    )}
                />
            </div>

            {hasError && <InputError errorMessage={error?.message ?? ''} />}
        </div>
    );
};

export default CompactInputField;
