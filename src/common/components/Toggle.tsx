import {cn} from "../../utils/cn.ts";

interface ToggleProps {
    label: string;
    checked?: boolean;
    onChange?: (checked: boolean) => void;
}

const Toggle = ({label, checked = false, onChange}: ToggleProps) => {
    return (
        <div className="flex items-center gap-2">
            <label
                   className="text-sm font-medium text-mono-700 dark:text-mono-300 whitespace-nowrap select-none">
                {label}
            </label>
            <label className="relative inline-block w-12 h-6 cursor-pointer">
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={(e) => onChange && onChange(e.target.checked)}
                    className="sr-only"
                />
                <div className={cn("block w-12 h-6 rounded-full transition-colors duration-200",
                    checked ? "bg-primary-500" : "bg-mono-300 dark:bg-mono-600")}></div>
                <div
                className={cn(`absolute left-1 top-1 bg-mono-50 w-4 h-4 rounded-full transition-transform duration-200`,
                    checked ? "transform translate-x-6" : "")}></div>
            </label>
        </div>
    );
};

export default Toggle;