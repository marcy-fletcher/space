import {cn} from "../../utils/cn.ts";

interface DividerProps {
    className?: string;
}

const Divider = ({className}: DividerProps) => {
    return (
        <div className={cn("w-full mt-4 border-b border-mono-100 dark:border-mono-700", className)} />
    );
};

export default Divider;