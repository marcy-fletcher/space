import {cn} from "../../../utils/cn.ts";
import InputLabel from "./InputLabel.tsx";
import TagBadge from "../../../blog/components/post-card/TagBadge.tsx";
import {type KeyboardEvent, useState} from "react";
import Tooltip from "../Tooltip.tsx";
import InputError from "./InputError.tsx";

interface InputTagValueProps {
    value: string;
    error?: string;
}

interface InputTagsProps {
    tags: InputTagValueProps[];
    label?: string;
    className?: string;
    onAddTag?: (tag: string) => void;
    onRemoveTag?: (index: number) => void;
    error?: string;
    required?: boolean;
}

const InputTags = ({label, tags, className, required, onAddTag, onRemoveTag, error}: InputTagsProps) => {

    const [inputValue, setInputValue] = useState('');

    const appendTag = () => {
        const newValue = inputValue.trim().toLowerCase();

        if (newValue && !tags.find(tag => tag.value === newValue)) {
            onAddTag?.(newValue);
            setInputValue('');
        }
    }

    const appendTags = (values: string[]) => {
        values.forEach(value => {
            if (value && !tags.find(tag => tag.value === value)) {
                onAddTag?.(value);
            }
        });
    };


    const removeTag = (index: number) => {
        onRemoveTag?.(index);
    }

    const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            appendTag();
        }

        if (e.key === "Backspace" && !inputValue && tags.length) {
            removeTag(tags.length - 1);
        }
    };

    const onPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();

        const pastedText = e.clipboardData.getData("text");

        const newTags = pastedText
            .split("#")
            .map(tag => tag.trim().toLowerCase())
            .filter(Boolean);

        appendTags(newTags);
        setInputValue('');
    };


    return (
        <div className={cn("relative", className)}>
            {label && <InputLabel className="mb-2" isRequired={required}>
                {label}
            </InputLabel>}

            <div className={cn(
                `flex flex-wrap gap-2 px-4 py-3 rounded-lg border
                     bg-white dark:bg-mono-700
                     border-mono-200 dark:border-mono-600
                     focus-within:ring-2 focus-within:ring-pink-400
                     focus-within:border-transparent`
            )}
            >
                {tags.map((tag, index) => (
                    <Tooltip enabled={!!tag.error} text={tag.error ?? ''} key={tag.value}>
                        <TagBadge
                            className={cn(
                                `flex flex-row gap-1 hover:bg-primary-200 dark:hover:bg-primary-700`,
                                tag.error &&
                                `bg-red-100 dark:bg-red-800 text-red-700 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-600 opacity-50`
                            )}
                            onClick={() => removeTag(index)}
                        >
                            #{tag.value}
                            <span>×</span>
                        </TagBadge>
                    </Tooltip>
                ))}

                <input className={`flex-1 min-w-30 bg-transparent outline-none
                    text-mono-900 dark:text-mono-100
                    placeholder-mono-400 dark:placeholder-mono-500`}
                       onChange={(e) => setInputValue(e.target.value)}
                       onKeyDown={onKeyDown}
                       value={inputValue}
                       onPaste={onPaste}
                />
            </div>

            {error && <InputError errorMessage={error}/>}
        </div>
    );
};

export default InputTags;