import React from 'react';
import type {IconDefinition} from "@fortawesome/fontawesome-common-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {cn} from "../../utils/cn.ts";

interface TextAreaProps {
    name: string;
    label: string;
    value?: string;
    placeholder: string;
    required?: boolean;
    icon?: IconDefinition;
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
    className?: string;
    error?: string;
    rows?: number;
}

const CardTextArea = ({
                          name,
                          label,
                          value,
                          placeholder,
                          onChange,
                          icon,
                          className,
                          onBlur,
                          required = false,
                          error,
                          rows = 4
                      }: TextAreaProps) => {
    return (
        <div className={className}>
            <label
                className={cn(
                    "block text-sm font-medium mb-2 font-sans",
                    error
                        ? "text-red-600 dark:text-red-400"
                        : "text-mono-700 dark:text-mono-300"
                )}
            >
                {label}
            </label>

            <div className="relative">
                {icon && (
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FontAwesomeIcon icon={icon} className="w-4 h-4 text-mono-400"/>
                    </div>
                )}

                <textarea
                    name={name}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    placeholder={placeholder}
                    required={required}
                    rows={rows}
                    aria-invalid={!!error}
                    aria-describedby={error ? `${name}-error` : undefined}
                    className={cn(
                        "w-full px-4 py-3 rounded-lg font-sans focus:outline-none",
                        "bg-white dark:bg-mono-700 text-mono-900 dark:text-mono-100 placeholder-mono-400 dark:placeholder-mono-500 border border-mono-200 dark:border-mono-600 focus:ring-2 focus:ring-pink-400 focus:border-transparent",
                        error ? "border border-red-500 bg-red-50 dark:bg-red-900/20 focus:ring-2 focus:ring-red-400 focus:border-red-500" : ""
                    )}
                />
            </div>

            {error && (
                <p
                    id={`${name}-error`}
                    className="mt-1.5 text-sm text-red-600 dark:text-red-400 font-sans leading-snug"
                >
                    {error}
                </p>
            )}
        </div>
    );
};

export default CardTextArea;
