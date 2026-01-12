import {type ButtonHTMLAttributes, type ReactNode} from 'react';
import {cn} from '../../utils/cn.ts';

export type ButtonShape = 'square' | 'rounded';
export type ButtonVariant =
    | 'primary'
    | 'secondary'
    | 'outline'
    | 'danger'
    | 'link'
    | 'gradient'
    | 'cancel'
    | 'submit';
export type ButtonSize = 'small' | 'medium' | 'large';
export type ButtonAnimation = 'animated' | 'static';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    children?: ReactNode;
    className?: string;
    shape?: ButtonShape;
    size?: ButtonSize;
    variant?: ButtonVariant;
    animation?: ButtonAnimation;
}

const Button = ({
                    children,
                    className,
                    disabled,
                    shape = 'rounded',
                    size = 'medium',
                    variant = 'gradient',
                    animation = 'static',
                    ...buttonProps
                }: ButtonProps) => {
    const shapeClasses: Record<ButtonShape, string> = {
        square: 'rounded-xl',
        rounded: 'rounded-3xl',
    };


    const sizeClasses: Record<ButtonSize, string> = {
        small: 'py-2 px-4 text-sm',
        medium: 'py-2 px-6 text-base',
        large: 'py-4 px-8 text-lg',
    };

    const variantClasses: Record<ButtonVariant, string> = {
        primary:
            'bg-primary-600 hover:bg-primary-700 text-white focus-visible:ring-primary-500 focus-visible:outline-none focus-visible:ring-2',
        secondary:
            'bg-mono-200 hover:bg-mono-300 text-mono-900 focus-visible:ring-mono-400 focus-visible:outline-none focus-visible:ring-2',
        outline:
            'border border-mono-300 bg-transparent hover:bg-mono-200 dark:hover:bg-mono-700 text-mono-800 dark:text-mono-100 focus-visible:ring-mono-400 focus-visible:outline-none focus-visible:ring-2',
        danger:
            'bg-red-600 hover:bg-red-700 text-white focus-visible:ring-red-500 focus-visible:outline-none focus-visible:ring-2',
        gradient:
            'bg-gradient-to-r from-primary-600 to-shade-700 hover:from-primary-700 hover:to-shade-800 text-white focus-visible:ring-primary-500 focus-visible:outline-none focus-visible:ring-2',
        link:
            'bg-transparent text-mono-700 dark:text-mono-100 hover:bg-mono-100 dark:hover:bg-mono-700 focus-visible:ring-mono-400 focus-visible:outline-none focus-visible:ring-2',
        cancel:
            'bg-mono-400 hover:bg-mono-500 text-white focus-visible:ring-mono-300 focus-visible:outline-none focus-visible:ring-2',
        submit:
            'bg-green-600 hover:bg-green-700 text-white focus-visible:ring-green-500 focus-visible:outline-none focus-visible:ring-2',
    };


    const animationClasses: Record<ButtonAnimation, string> = {
        static: '',
        animated: 'hover:scale-105 active:scale-95',
    };

    const disabledClasses = disabled
        ? 'opacity-50 cursor-not-allowed pointer-events-none'
        : 'cursor-pointer';

    return (
        <button
            disabled={disabled}
            className={cn(
                'select-none font-medium focus:outline-none transition-all duration-300 ease-in-out',
                disabledClasses,
                shapeClasses[shape],
                sizeClasses[size],
                variantClasses[variant],
                animationClasses[animation],
                className
            )} {...buttonProps}
        >
            {children}
        </button>
    );
};

export default Button;
