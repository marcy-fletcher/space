interface PropertyProps {
    title: string;
    value: string;
}

const CardProperty = ({title, value}: PropertyProps) => {
    return (
        <div className="flex items-center justify-between text-xs">
            <span className="text-mono-500 dark:text-mono-400 uppercase tracking-wide">
                {title}
            </span>
            <span className="text-mono-600 dark:text-mono-300">
                {value}
            </span>
        </div>
    );
};

export default CardProperty;