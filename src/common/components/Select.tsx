import {cn} from "../../utils/cn.ts";

interface SelectProps {
    label?: string
    value?: string
    options: {
        label: string
        value: string
    }[]
    onChange?: (option: string) => void
    className?: string
}

const Select = ({label, value, options, className, onChange}: SelectProps) => {
    return (
        <div className={cn("flex flex-col items-stretch gap-2 sm:flex-row sm:items-center", className)}>
            {label && <label htmlFor="sort-select"
                    className="text-sm font-medium text-mono-700 dark:text-mono-300 whitespace-nowrap select-none">
                {label}
            </label>}
            <select
                id="sort-select"
                value={value}
                onChange={(e) => onChange?.(e.target.value)}
                className="w-full grow px-3 py-2 border border-mono-300 dark:border-mono-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-mono-700 dark:text-mono-50 text-sm"
            >
                {
                    options.map((option) => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))
                }
            </select>
        </div>
    );
};

export default Select;