import React, { type InputHTMLAttributes } from "react";
import { cn } from "../../../utils/cn.ts";
import InputError from "./InputError.tsx";
import InputLabel from "./InputLabel.tsx";
import type { FieldValues, UseFormRegister, Path, FieldError } from "react-hook-form";

type InputCheckboxProps<TFieldValues extends FieldValues = FieldValues> = {
    id: Path<TFieldValues>;
    label?: React.ReactNode;
    register: UseFormRegister<TFieldValues>;
    error?: FieldError;
    className?: string;
} & InputHTMLAttributes<HTMLInputElement>;

const InputCheckbox = <TFieldValues extends FieldValues = FieldValues>({
                                                                           id,
                                                                           label,
                                                                           error,
                                                                           className,
                                                                           register,
                                                                           ...inputProps
                                                                       }: InputCheckboxProps<TFieldValues>) => {
    const hasError = !!error;

    return (
        <div className={className}>
            <div className="flex items-center space-x-2">
                <input
                    id={id}
                    {...register(id)}
                    {...inputProps}
                    type="checkbox"
                    className={cn(
                        "w-4 h-4 border rounded-md cursor-pointer",
                        "bg-white dark:bg-mono-700 text-mono-900 dark:text-mono-100 disabled:opacity-50 disabled:cursor-not-allowed",
                        hasError
                            ? [
                                "border-red-500",
                                "focus:ring-2 focus:ring-red-400",
                                "focus:border-red-500",
                            ]
                            : [
                                "border-mono-200 dark:border-mono-600",
                                "focus:ring-2 focus:ring-pink-400",
                                "focus:border-transparent",
                            ]
                    )}
                />

                {label && <InputLabel htmlFor={id} className="cursor-pointer select-none">
                    {label}
                </InputLabel>}
            </div>

            {hasError && <InputError errorMessage={error?.message ?? ""} />}
        </div>
    );
};

export default InputCheckbox;
