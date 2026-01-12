import React, { type ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";
import Card from "../../layout/Card.tsx";
import { cn } from "../../utils/cn.ts";

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
    size?: "sm" | "md" | "lg";
};

const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
};

const Modal: React.FC<ModalProps> = ({
                                         isOpen,
                                         onClose,
                                         children,
                                         size = "md",
                                     }) => {
    useEffect(() => {
        if (!isOpen) return;

        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };

        document.addEventListener("keydown", handleEsc);
        document.body.style.overflow = "hidden";

        return () => {
            document.removeEventListener("keydown", handleEsc);
            document.body.style.overflow = "";
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
                className="absolute inset-0 bg-mono-900/50 backdrop-blur-sm"
                onClick={onClose}
            />

            <Card
                className={cn(
                    "relative z-10 w-full mx-4 dark:bg-mono-900",
                    sizeClasses[size]
                )}
                aria-modal="true"
            >
                <button
                    onClick={onClose}
                    aria-label="Close modal"
                    className="absolute top-4 right-4 text-mono-500 hover:text-mono-800"
                >
                    ✕
                </button>

                {children}
            </Card>
        </div>,
        document.body
    );
};

export default Modal;