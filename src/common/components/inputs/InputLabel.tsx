import {cn} from "../../../utils/cn.ts";
import {type LabelHTMLAttributes, type ReactNode} from "react";

type InputLabelProps = {
    hasError?: boolean;
    className?: string;
    children: ReactNode;
    isRequired?: boolean;
} & LabelHTMLAttributes<HTMLLabelElement>;

const InputLabel = ({
                        children,
                        hasError,
                        className,
                        isRequired,
                        ...labelProps
                    }: InputLabelProps) => {
    return (
        <label
            className={cn(
                "block text-sm font-medium font-sans",
                hasError
                    ? "text-red-600 dark:text-red-400"
                    : "text-mono-700 dark:text-mono-300",
                className
            )}
            {...labelProps}
        >
            {children} {isRequired && <span className="text-red-500 ml-1">*</span>}
        </label>
    );
};

export default InputLabel;