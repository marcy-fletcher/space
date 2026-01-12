import {type SelectHTMLAttributes} from 'react';
import {cn} from "../../../utils/cn.ts";
import type {IconDefinition} from "@fortawesome/fontawesome-common-types";
import InputError from "./InputError.tsx";
import InputIcon from "./InputIcon.tsx";
import InputLabel from "./InputLabel.tsx";
import type {FieldValues, UseFormRegister, Path, FieldError} from "react-hook-form";

type SelectOption = {
    value: string;
    label: string;
};

type SelectFieldProps<TFieldValues extends FieldValues = FieldValues> = {
    id: Path<TFieldValues>;
    label?: string;
    icon?: IconDefinition;
    register?: UseFormRegister<TFieldValues>;
    error?: FieldError;
    className?: string;
    options: SelectOption[];
    placeholder?: string;
    required?: boolean;
} & SelectHTMLAttributes<HTMLSelectElement>;

const SelectField = <TFieldValues extends FieldValues = FieldValues>({
                                                                         id,
                                                                         label,
                                                                         icon,
                                                                         error,
                                                                         className,
                                                                         register,
                                                                         options,
                                                                         placeholder,
                                                                         required,
                                                                         ...selectProps
                                                                     }: SelectFieldProps<TFieldValues>) => {

    const hasError = !!error;

    return (
        <div className={cn("relative", className)}>
            {label && <InputLabel hasError={hasError} className="mb-2" isRequired={required}>
                {label}
            </InputLabel>}

            <div className="relative">
                {icon && <InputIcon icon={icon} hasError={hasError}/>}

                <select
                    id={id}
                    {...register?.(id)}
                    {...selectProps}
                    defaultValue={selectProps.value || ""}
                    className={cn(
                        `w-full px-4 py-3 rounded-lg font-sans focus:outline-none border 
                        border-mono-200 dark:border-mono-600
                        focus:ring-2 focus:ring-pink-400 focus:border-transparent 
                        bg-white dark:bg-mono-700 text-mono-900 dark:text-mono-100
                        appearance-none cursor-pointer
                        disabled:opacity-50 disabled:cursor-not-allowed`,
                        hasError
                            ? `border-red-500 bg-red-50 dark:bg-red-900/20
                            focus:ring-2 focus:ring-red-400 focus:border-red-500`
                            : "",
                        icon ? "pl-10" : ""
                    )}
                >
                    {placeholder && (
                        <option value="" disabled className="bg-white dark:bg-mono-700 text-mono-500">
                            {placeholder}
                        </option>
                    )}

                    {options.map((option) => (
                        <option
                            key={option.value}
                            value={option.value}
                            className="bg-white dark:bg-mono-700 text-mono-900 dark:text-mono-100"
                        >
                            {option.label}
                        </option>
                    ))}
                </select>

                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg
                        className="w-5 h-5 text-mono-400 dark:text-mono-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                        />
                    </svg>
                </div>
            </div>

            {hasError && <InputError errorMessage={error?.message ?? ''}/>}
        </div>
    );
};

export default SelectField;
